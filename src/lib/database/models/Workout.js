/* 
  WORKOUT MODEL - MongoDB CRUD Operations
  Zeigt professionelle Database-Abstraktion und Validation
  Ersetzt die Array-basierte Datenbank aus den Pages
*/

import { ObjectId } from 'mongodb';
import { getCollection, handleDatabaseError } from '../mongodb.js';

/* 
  WORKOUT SCHEMA VALIDATION
  Client-side Validation vor Database-Operationen
*/
function validateWorkoutData(workoutData) {
  const errors = {};

  // Name Validation
  if (!workoutData.name || workoutData.name.trim().length < 2) {
    errors.name = 'Name muss mindestens 2 Zeichen haben';
  }

  // Description Validation
  if (!workoutData.description || workoutData.description.trim().length < 10) {
    errors.description = 'Beschreibung muss mindestens 10 Zeichen haben';
  }

  // Duration Validation
  if (!workoutData.duration || workoutData.duration < 10 || workoutData.duration > 180) {
    errors.duration = 'Dauer muss zwischen 10 und 180 Minuten sein';
  }

  // Difficulty Validation
  const validDifficulties = ['Leicht', 'Mittel', 'Schwer'];
  if (!workoutData.difficulty || !validDifficulties.includes(workoutData.difficulty)) {
    errors.difficulty = 'Ungültige Schwierigkeit';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/* 
  WORKOUT CRUD OPERATIONS
  Standardisierte Database-Operationen für Workouts
*/
export class WorkoutModel {

  /* 
    CREATE - Neues Workout erstellen
    Ersetzt die addWorkout() Funktion aus den Arrays
  */
  static async create(workoutData) {
    try {
      console.log('📝 Creating new workout:', workoutData.name);

      // Validation
      const validation = validateWorkoutData(workoutData);
      if (!validation.isValid) {
        return {
          success: false,
          error: 'Validation failed',
          errors: validation.errors
        };
      }

      // Prepare workout document
      const workout = {
        name: workoutData.name.trim(),
        description: workoutData.description.trim(),
        duration: parseInt(workoutData.duration),
        difficulty: workoutData.difficulty,
        target_muscle: workoutData.target_muscle?.trim() || '',
        exercises: workoutData.exercises || [],
        created_by: workoutData.created_by || null,
        created_at: new Date(),
        updated_at: new Date()
      };

      // Check for duplicate names
      const existingWorkout = await this.findByName(workout.name);
      if (existingWorkout) {
        return {
          success: false,
          error: 'Duplicate name',
          message: 'Ein Workout mit diesem Namen existiert bereits'
        };
      }

      // Insert into MongoDB
      const collection = await getCollection('workouts');
      const result = await collection.insertOne(workout);

      if (result.acknowledged) {
        console.log('✅ Workout created with ID:', result.insertedId);
        
        // Return created workout with ID
        const createdWorkout = await this.findById(result.insertedId);
        return {
          success: true,
          workout: createdWorkout,
          message: 'Workout erfolgreich erstellt'
        };
      }

      return {
        success: false,
        error: 'Insert failed',
        message: 'Workout konnte nicht erstellt werden'
      };

    } catch (error) {
      console.error('❌ Error creating workout:', error);
      const dbError = handleDatabaseError(error, 'workout creation');
      return {
        success: false,
        error: dbError.error,
        message: dbError.message
      };
    }
  }

  /* 
    READ - Alle Workouts abrufen
    Ersetzt die getAllWorkouts() Funktion
  */
  static async findAll(options = {}) {
    try {
      console.log('📊 Fetching all workouts...');

      const collection = await getCollection('workouts');
      
      // Build query
      let query = {};
      
      // Optional filtering
      if (options.difficulty) {
        query.difficulty = options.difficulty;
      }
      if (options.target_muscle) {
        query.target_muscle = { $regex: options.target_muscle, $options: 'i' };
      }

      // Execute query with sorting
      const workouts = await collection
        .find(query)
        .sort({ created_at: -1 }) // Newest first
        .limit(options.limit || 0)
        .toArray();

      console.log(`✅ Found ${workouts.length} workouts`);
      
      return {
        success: true,
        workouts: workouts.map(this.formatWorkout)
      };

    } catch (error) {
      console.error('❌ Error fetching workouts:', error);
      const dbError = handleDatabaseError(error, 'workout fetching');
      return {
        success: false,
        error: dbError.error,
        message: dbError.message,
        workouts: []
      };
    }
  }

  /* 
    READ - Einzelnes Workout nach ID
    Ersetzt das Array.find() Pattern
  */
  static async findById(id) {
    try {
      console.log('🔍 Finding workout by ID:', id);

      // Validate ObjectId
      if (!ObjectId.isValid(id)) {
        return null;
      }

      const collection = await getCollection('workouts');
      const workout = await collection.findOne({ _id: new ObjectId(id) });

      if (workout) {
        console.log('✅ Workout found:', workout.name);
        return this.formatWorkout(workout);
      }

      console.log('❌ Workout not found');
      return null;

    } catch (error) {
      console.error('❌ Error finding workout:', error);
      return null;
    }
  }

  /* 
    READ - Workout nach Name suchen
    Für Duplicate-Check
  */
  static async findByName(name) {
    try {
      const collection = await getCollection('workouts');
      const workout = await collection.findOne({ 
        name: { $regex: `^${name}$`, $options: 'i' } // Case-insensitive exact match
      });

      return workout ? this.formatWorkout(workout) : null;

    } catch (error) {
      console.error('❌ Error finding workout by name:', error);
      return null;
    }
  }

  /* 
    UPDATE - Workout bearbeiten
    Für spätere Edit-Funktionalität
  */
  static async update(id, updateData) {
    try {
      console.log('📝 Updating workout:', id);

      if (!ObjectId.isValid(id)) {
        return {
          success: false,
          error: 'Invalid ID',
          message: 'Ungültige Workout-ID'
        };
      }

      // Validation
      const validation = validateWorkoutData(updateData);
      if (!validation.isValid) {
        return {
          success: false,
          error: 'Validation failed',
          errors: validation.errors
        };
      }

      // Prepare update document
      const updateDoc = {
        $set: {
          ...updateData,
          updated_at: new Date()
        }
      };

      const collection = await getCollection('workouts');
      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        updateDoc
      );

      if (result.matchedCount === 0) {
        return {
          success: false,
          error: 'Not found',
          message: 'Workout nicht gefunden'
        };
      }

      if (result.modifiedCount > 0) {
        console.log('✅ Workout updated successfully');
        const updatedWorkout = await this.findById(id);
        return {
          success: true,
          workout: updatedWorkout,
          message: 'Workout erfolgreich aktualisiert'
        };
      }

      return {
        success: false,
        error: 'No changes',
        message: 'Keine Änderungen vorgenommen'
      };

    } catch (error) {
      console.error('❌ Error updating workout:', error);
      const dbError = handleDatabaseError(error, 'workout update');
      return {
        success: false,
        error: dbError.error,
        message: dbError.message
      };
    }
  }

  /* 
    DELETE - Workout löschen
    Für Admin-Funktionalität
  */
  static async delete(id) {
    try {
      console.log('🗑️ Deleting workout:', id);

      if (!ObjectId.isValid(id)) {
        return {
          success: false,
          error: 'Invalid ID',
          message: 'Ungültige Workout-ID'
        };
      }

      const collection = await getCollection('workouts');
      const result = await collection.deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount > 0) {
        console.log('✅ Workout deleted successfully');
        return {
          success: true,
          message: 'Workout erfolgreich gelöscht'
        };
      }

      return {
        success: false,
        error: 'Not found',
        message: 'Workout nicht gefunden'
      };

    } catch (error) {
      console.error('❌ Error deleting workout:', error);
      const dbError = handleDatabaseError(error, 'workout deletion');
      return {
        success: false,
        error: dbError.error,
        message: dbError.message
      };
    }
  }

  /* 
    STATISTICS - Workout-Statistiken
    Ersetzt die calculateWorkoutStats() Funktion
  */
  static async getStatistics() {
    try {
      console.log('📊 Calculating workout statistics...');

      const collection = await getCollection('workouts');

      // Aggregation Pipeline für Statistiken
      const stats = await collection.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
            avgDuration: { $avg: '$duration' },
            difficulties: {
              $push: '$difficulty'
            },
            muscleGroups: {
              $push: '$target_muscle'
            }
          }
        }
      ]).toArray();

      if (stats.length === 0) {
        return {
          total: 0,
          avgDuration: 0,
          difficulties: {},
          muscleGroups: {}
        };
      }

      const stat = stats[0];

      // Difficulty distribution
      const difficultyCount = stat.difficulties.reduce((acc, diff) => {
        acc[diff] = (acc[diff] || 0) + 1;
        return acc;
      }, {});

      // Muscle group distribution
      const muscleGroupCount = stat.muscleGroups.reduce((acc, muscle) => {
        if (muscle) {
          acc[muscle] = (acc[muscle] || 0) + 1;
        }
        return acc;
      }, {});

      return {
        total: stat.total,
        avgDuration: Math.round(stat.avgDuration || 0),
        difficulties: difficultyCount,
        muscleGroups: muscleGroupCount
      };

    } catch (error) {
      console.error('❌ Error calculating statistics:', error);
      return {
        total: 0,
        avgDuration: 0,
        difficulties: {},
        muscleGroups: {}
      };
    }
  }

  /* 
    UTILITY - Format workout for frontend
    Standardisiert die Datenstruktur für das Frontend
  */
  static formatWorkout(workout) {
    if (!workout) return null;

    return {
      id: workout._id.toString(),
      name: workout.name,
      description: workout.description,
      duration: workout.duration,
      difficulty: workout.difficulty,
      target_muscle: workout.target_muscle,
      exercises: workout.exercises || [],
      created_by: workout.created_by,
      created_at: workout.created_at,
      updated_at: workout.updated_at
    };
  }

}

/* 
  EXPORT DEFAULT für einfachen Import
*/
export default WorkoutModel;