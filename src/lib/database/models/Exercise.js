/* 
  EXERCISE MODEL - MongoDB CRUD Operations
  Zeigt professionelle Database-Abstraktion für Exercise-Entitäten
  Ersetzt die Array-basierte Exercise-Datenbank
*/

import { ObjectId } from 'mongodb';
import { getCollection, handleDatabaseError } from '../mongodb.js';

/* 
  EXERCISE SCHEMA VALIDATION
  Client-side Validation vor Database-Operationen
*/
function validateExerciseData(exerciseData) {
  const errors = {};

  // Name Validation
  if (!exerciseData.name || exerciseData.name.trim().length < 2) {
    errors.name = 'Name muss mindestens 2 Zeichen haben';
  }

  // Description Validation
  if (!exerciseData.description || exerciseData.description.trim().length < 10) {
    errors.description = 'Beschreibung muss mindestens 10 Zeichen haben';
  }

  // Instructions Validation
  if (!exerciseData.instructions || exerciseData.instructions.trim().length < 20) {
    errors.instructions = 'Ausführungsanleitung muss mindestens 20 Zeichen haben';
  }

  // Muscle Group Validation
  const validMuscleGroups = [
    'Brust', 'Rücken', 'Schultern', 'Bizeps', 'Trizeps', 
    'Beine', 'Quadrizeps', 'Hamstrings', 'Waden', 'Gesäß',
    'Bauch', 'Rumpf', 'Ganzkörper'
  ];
  if (!exerciseData.muscle_group || !validMuscleGroups.includes(exerciseData.muscle_group)) {
    errors.muscle_group = 'Ungültige Muskelgruppe';
  }

  // Equipment Validation
  const validEquipment = [
    'Körpergewicht', 'Langhantel', 'Kurzhanteln', 'Kabelzug', 
    'Maschinen', 'Kettlebell', 'Resistance Bands', 'TRX',
    'Klimmzugstange', 'Dipstation', 'Medizinball', 'Keine'
  ];
  if (!exerciseData.equipment || !validEquipment.includes(exerciseData.equipment)) {
    errors.equipment = 'Ungültiges Equipment';
  }

  // Difficulty Validation
  const validDifficulties = ['Leicht', 'Mittel', 'Schwer'];
  if (!exerciseData.difficulty || !validDifficulties.includes(exerciseData.difficulty)) {
    errors.difficulty = 'Ungültige Schwierigkeit';
  }

  // Primary Muscles Validation
  if (!exerciseData.primary_muscles || !Array.isArray(exerciseData.primary_muscles) || exerciseData.primary_muscles.length === 0) {
    errors.primary_muscles = 'Mindestens ein primärer Muskel erforderlich';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/* 
  EXERCISE CRUD OPERATIONS
  Standardisierte Database-Operationen für Exercises
*/
export class ExerciseModel {

  /* 
    CREATE - Neue Exercise erstellen
    Ersetzt die addExercise() Funktion aus den Arrays
  */
  static async create(exerciseData) {
    try {
      console.log('📝 Creating new exercise:', exerciseData.name);

      // Validation
      const validation = validateExerciseData(exerciseData);
      if (!validation.isValid) {
        return {
          success: false,
          error: 'Validation failed',
          errors: validation.errors
        };
      }

      // Prepare exercise document
      const exercise = {
        name: exerciseData.name.trim(),
        description: exerciseData.description.trim(),
        instructions: exerciseData.instructions.trim(),
        muscle_group: exerciseData.muscle_group,
        equipment: exerciseData.equipment,
        difficulty: exerciseData.difficulty,
        category_id: exerciseData.category_id ? new ObjectId(exerciseData.category_id) : null,
        image_url: exerciseData.image_url?.trim() || null,
        
        // Advanced fields
        primary_muscles: exerciseData.primary_muscles || [],
        secondary_muscles: exerciseData.secondary_muscles || [],
        benefits: exerciseData.benefits || [],
        tips: exerciseData.tips || [],
        variations: exerciseData.variations || [],
        
        // Training recommendations
        sets_recommendation: {
          beginner: exerciseData.sets_beginner || null,
          intermediate: exerciseData.sets_intermediate || null,
          advanced: exerciseData.sets_advanced || null
        },
        rest_time: exerciseData.rest_time?.trim() || null,
        
        // Meta data
        created_by: exerciseData.created_by || null,
        created_at: new Date(),
        updated_at: new Date()
      };

      // Check for duplicate names
      const existingExercise = await this.findByName(exercise.name);
      if (existingExercise) {
        return {
          success: false,
          error: 'Duplicate name',
          message: 'Eine Exercise mit diesem Namen existiert bereits'
        };
      }

      // Insert into MongoDB
      const collection = await getCollection('exercises');
      const result = await collection.insertOne(exercise);

      if (result.acknowledged) {
        console.log('✅ Exercise created with ID:', result.insertedId);
        
        // Return created exercise with ID
        const createdExercise = await this.findById(result.insertedId);
        return {
          success: true,
          exercise: createdExercise,
          message: 'Exercise erfolgreich erstellt'
        };
      }

      return {
        success: false,
        error: 'Insert failed',
        message: 'Exercise konnte nicht erstellt werden'
      };

    } catch (error) {
      console.error('❌ Error creating exercise:', error);
      const dbError = handleDatabaseError(error, 'exercise creation');
      return {
        success: false,
        error: dbError.error,
        message: dbError.message
      };
    }
  }

  /* 
    READ - Alle Exercises abrufen mit Filtering
    Ersetzt die Exercises Array + Filter Logic
  */
  static async findAll(options = {}) {
    try {
      console.log('📊 Fetching exercises with filters:', options);

      const collection = await getCollection('exercises');
      
      // Build query from options
      let query = {};
      
      // Muscle group filter
      if (options.muscle_group) {
        query.muscle_group = options.muscle_group;
      }
      
      // Difficulty filter
      if (options.difficulty) {
        query.difficulty = options.difficulty;
      }
      
      // Category filter
      if (options.category) {
        query.category_id = new ObjectId(options.category);
      }
      
      // Search term (name, description, muscle_group)
      if (options.search) {
        const searchRegex = { $regex: options.search, $options: 'i' };
        query.$or = [
          { name: searchRegex },
          { description: searchRegex },
          { muscle_group: searchRegex },
          { 'primary_muscles': { $elemMatch: searchRegex } }
        ];
      }

      // Execute query with sorting
      let cursor = collection.find(query);
      
      // Sorting
      if (options.sort === 'name') {
        cursor = cursor.sort({ name: 1 });
      } else if (options.sort === 'difficulty') {
        cursor = cursor.sort({ difficulty: 1, name: 1 });
      } else {
        cursor = cursor.sort({ created_at: -1 }); // Default: newest first
      }
      
      // Pagination
      if (options.limit) {
        cursor = cursor.limit(parseInt(options.limit));
      }
      if (options.skip) {
        cursor = cursor.skip(parseInt(options.skip));
      }

      const exercises = await cursor.toArray();

      console.log(`✅ Found ${exercises.length} exercises`);
      
      return {
        success: true,
        exercises: exercises.map(this.formatExercise),
        total: await collection.countDocuments(query)
      };

    } catch (error) {
      console.error('❌ Error fetching exercises:', error);
      const dbError = handleDatabaseError(error, 'exercise fetching');
      return {
        success: false,
        error: dbError.error,
        message: dbError.message,
        exercises: [],
        total: 0
      };
    }
  }

  /* 
    READ - Einzelne Exercise nach ID
    Ersetzt das Array.find() Pattern
  */
  static async findById(id) {
    try {
      console.log('🔍 Finding exercise by ID:', id);

      // Validate ObjectId
      if (!ObjectId.isValid(id)) {
        return null;
      }

      const collection = await getCollection('exercises');
      const exercise = await collection.findOne({ _id: new ObjectId(id) });

      if (exercise) {
        console.log('✅ Exercise found:', exercise.name);
        return this.formatExercise(exercise);
      }

      console.log('❌ Exercise not found');
      return null;

    } catch (error) {
      console.error('❌ Error finding exercise:', error);
      return null;
    }
  }

  /* 
    READ - Exercise nach Name suchen
    Für Duplicate-Check
  */
  static async findByName(name) {
    try {
      const collection = await getCollection('exercises');
      const exercise = await collection.findOne({ 
        name: { $regex: `^${name}$`, $options: 'i' } // Case-insensitive exact match
      });

      return exercise ? this.formatExercise(exercise) : null;

    } catch (error) {
      console.error('❌ Error finding exercise by name:', error);
      return null;
    }
  }

  /* 
    READ - Exercises nach Muskelgruppe
    Für Related Exercises Feature
  */
  static async findByMuscleGroup(muscleGroup, excludeId = null, limit = 5) {
    try {
      const collection = await getCollection('exercises');
      
      let query = { muscle_group: muscleGroup };
      
      // Exclude specific exercise (für "ähnliche Exercises")
      if (excludeId && ObjectId.isValid(excludeId)) {
        query._id = { $ne: new ObjectId(excludeId) };
      }

      const exercises = await collection
        .find(query)
        .limit(limit)
        .sort({ name: 1 })
        .toArray();

      return exercises.map(this.formatExercise);

    } catch (error) {
      console.error('❌ Error finding exercises by muscle group:', error);
      return [];
    }
  }

  /* 
    UPDATE - Exercise bearbeiten
    Für spätere Edit-Funktionalität
  */
  static async update(id, updateData) {
    try {
      console.log('📝 Updating exercise:', id);

      if (!ObjectId.isValid(id)) {
        return {
          success: false,
          error: 'Invalid ID',
          message: 'Ungültige Exercise-ID'
        };
      }

      // Validation
      const validation = validateExerciseData(updateData);
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

      const collection = await getCollection('exercises');
      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        updateDoc
      );

      if (result.matchedCount === 0) {
        return {
          success: false,
          error: 'Not found',
          message: 'Exercise nicht gefunden'
        };
      }

      if (result.modifiedCount > 0) {
        console.log('✅ Exercise updated successfully');
        const updatedExercise = await this.findById(id);
        return {
          success: true,
          exercise: updatedExercise,
          message: 'Exercise erfolgreich aktualisiert'
        };
      }

      return {
        success: false,
        error: 'No changes',
        message: 'Keine Änderungen vorgenommen'
      };

    } catch (error) {
      console.error('❌ Error updating exercise:', error);
      const dbError = handleDatabaseError(error, 'exercise update');
      return {
        success: false,
        error: dbError.error,
        message: dbError.message
      };
    }
  }

  /* 
    DELETE - Exercise löschen
    Für Admin-Funktionalität
  */
  static async delete(id) {
    try {
      console.log('🗑️ Deleting exercise:', id);

      if (!ObjectId.isValid(id)) {
        return {
          success: false,
          error: 'Invalid ID',
          message: 'Ungültige Exercise-ID'
        };
      }

      const collection = await getCollection('exercises');
      const result = await collection.deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount > 0) {
        console.log('✅ Exercise deleted successfully');
        return {
          success: true,
          message: 'Exercise erfolgreich gelöscht'
        };
      }

      return {
        success: false,
        error: 'Not found',
        message: 'Exercise nicht gefunden'
      };

    } catch (error) {
      console.error('❌ Error deleting exercise:', error);
      const dbError = handleDatabaseError(error, 'exercise deletion');
      return {
        success: false,
        error: dbError.error,
        message: dbError.message
      };
    }
  }

  /* 
    STATISTICS - Exercise-Statistiken
    Ersetzt die calculateExerciseStats() Funktion
  */
  static async getStatistics() {
    try {
      console.log('📊 Calculating exercise statistics...');

      const collection = await getCollection('exercises');

      // Aggregation Pipeline für umfassende Statistiken
      const stats = await collection.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
            muscleGroups: { $push: '$muscle_group' },
            difficulties: { $push: '$difficulty' },
            equipment: { $push: '$equipment' }
          }
        }
      ]).toArray();

      if (stats.length === 0) {
        return {
          total: 0,
          byMuscleGroup: {},
          byDifficulty: {},
          byEquipment: {}
        };
      }

      const stat = stats[0];

      // Count distributions
      const byMuscleGroup = stat.muscleGroups.reduce((acc, muscle) => {
        acc[muscle] = (acc[muscle] || 0) + 1;
        return acc;
      }, {});

      const byDifficulty = stat.difficulties.reduce((acc, diff) => {
        acc[diff] = (acc[diff] || 0) + 1;
        return acc;
      }, {});

      const byEquipment = stat.equipment.reduce((acc, equip) => {
        acc[equip] = (acc[equip] || 0) + 1;
        return acc;
      }, {});

      return {
        total: stat.total,
        byMuscleGroup,
        byDifficulty,
        byEquipment
      };

    } catch (error) {
      console.error('❌ Error calculating exercise statistics:', error);
      return {
        total: 0,
        byMuscleGroup: {},
        byDifficulty: {},
        byEquipment: {}
      };
    }
  }

  /* 
    SEARCH - Advanced Exercise Search
    Für komplexe Suchfunktionen
  */
  static async search(searchTerm, filters = {}) {
    try {
      console.log('🔍 Searching exercises:', searchTerm);

      const collection = await getCollection('exercises');
      
      // Build search query
      let query = {};
      
      if (searchTerm) {
        const searchRegex = { $regex: searchTerm, $options: 'i' };
        query.$or = [
          { name: searchRegex },
          { description: searchRegex },
          { muscle_group: searchRegex },
          { equipment: searchRegex },
          { 'primary_muscles': { $elemMatch: searchRegex } },
          { 'benefits': { $elemMatch: searchRegex } }
        ];
      }
      
      // Apply additional filters
      if (filters.muscle_group) {
        query.muscle_group = filters.muscle_group;
      }
      if (filters.difficulty) {
        query.difficulty = filters.difficulty;
      }
      if (filters.equipment) {
        query.equipment = filters.equipment;
      }

      const exercises = await collection
        .find(query)
        .sort({ name: 1 })
        .limit(50) // Reasonable limit for search results
        .toArray();

      console.log(`✅ Search found ${exercises.length} exercises`);

      return {
        success: true,
        exercises: exercises.map(this.formatExercise),
        searchTerm,
        total: exercises.length
      };

    } catch (error) {
      console.error('❌ Error searching exercises:', error);
      return {
        success: false,
        exercises: [],
        error: error.message
      };
    }
  }

  /* 
    UTILITY - Format exercise for frontend
    Standardisiert die Datenstruktur für das Frontend
  */
  static formatExercise(exercise) {
    if (!exercise) return null;

    return {
      id: exercise._id.toString(),
      name: exercise.name,
      description: exercise.description,
      instructions: exercise.instructions,
      muscle_group: exercise.muscle_group,
      equipment: exercise.equipment,
      difficulty: exercise.difficulty,
      category_id: exercise.category_id?.toString() || null,
      image_url: exercise.image_url,
      
      // Advanced fields
      primary_muscles: exercise.primary_muscles || [],
      secondary_muscles: exercise.secondary_muscles || [],
      benefits: exercise.benefits || [],
      tips: exercise.tips || [],
      variations: exercise.variations || [],
      
      // Training data
      sets_recommendation: exercise.sets_recommendation || {},
      rest_time: exercise.rest_time,
      
      // Meta data
      created_by: exercise.created_by,
      created_at: exercise.created_at,
      updated_at: exercise.updated_at
    };
  }

  /* 
    UTILITY - Get unique values for filters
    Für dynamische Filter-Dropdowns
  */
  static async getFilterOptions() {
    try {
      const collection = await getCollection('exercises');
      
      const [muscleGroups, difficulties, equipment] = await Promise.all([
        collection.distinct('muscle_group'),
        collection.distinct('difficulty'),
        collection.distinct('equipment')
      ]);

      return {
        muscleGroups: muscleGroups.sort(),
        difficulties: difficulties.sort(),
        equipment: equipment.sort()
      };

    } catch (error) {
      console.error('❌ Error getting filter options:', error);
      return {
        muscleGroups: [],
        difficulties: [],
        equipment: []
      };
    }
  }

}

/* 
  EXPORT DEFAULT für einfachen Import
*/
export default ExerciseModel;