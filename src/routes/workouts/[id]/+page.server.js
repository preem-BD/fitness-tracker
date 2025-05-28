/* 
  WORKOUT DETAILS - MONGODB VERSION
  Lädt einzelnes Workout aus MongoDB basierend auf URL-Parameter
  Zeigt Dynamic Routing mit echter Database-Integration
*/

import WorkoutModel from '$lib/database/models/Workout.js';
import ExerciseModel from '$lib/database/models/Exercise.js';
import { connectToDatabase } from '$lib/database/mongodb.js';
import { error } from '@sveltejs/kit';

/* 
  LOAD FUNCTION für Workout Details
  Lädt spezifisches Workout aus MongoDB basierend auf [id] Parameter
*/
export async function load({ params }) {
  console.log('📖 Loading workout details for ID:', params.id);
  
  try {
    // Stelle sicher dass DB verbunden ist
    await connectToDatabase();
    
    /* 
      MONGODB WORKOUT LOOKUP
      Verwendet WorkoutModel statt Array.find()
      Zeigt professionelle Database-Abstraktion
    */
    const workout = await WorkoutModel.findById(params.id);
    
    if (!workout) {
      console.log('❌ Workout not found for ID:', params.id);
      
      // SvelteKit Error für 404 Not Found
      throw error(404, {
        message: 'Workout nicht gefunden',
        details: `Das Workout mit ID ${params.id} existiert nicht oder wurde gelöscht.`
      });
    }

    console.log('✅ Workout loaded:', workout.name);

    /* 
      RELATED WORKOUTS
      Findet ähnliche Workouts basierend auf Schwierigkeit oder Muskelgruppe
      Zeigt erweiterte MongoDB Queries
    */
    const relatedWorkouts = await findRelatedWorkouts(
      workout.id, 
      workout.difficulty, 
      workout.target_muscle
    );

    /* 
      WORKOUT STATISTICS
      Zusätzliche Metriken für einzelnes Workout
    */
    const workoutStats = calculateWorkoutMetrics(workout);

    /* 
      EXERCISE DETAILS (für später)
      Wenn Workout Exercise-IDs enthält, lade die Details
      Aktuell: Placeholder für Exercise-Integration
    */
    let exerciseDetails = [];
    if (workout.exercises && workout.exercises.length > 0) {
      // TODO: Lade echte Exercise-Details aus MongoDB
      exerciseDetails = workout.exercises;
    }

    /* 
      SUCCESS RESPONSE
      Vollständige Workout-Daten für Frontend
    */
    return {
      workout: workout,
      relatedWorkouts: relatedWorkouts,
      stats: workoutStats,
      exerciseDetails: exerciseDetails,
      meta: {
        title: `${workout.name} - Workout Details`,
        description: workout.description,
        keywords: [workout.difficulty, workout.target_muscle, 'workout', 'fitness'].join(', ')
      }
    };

  } catch (err) {
    /* 
      ERROR HANDLING
      Unterscheidet zwischen erwarteten (404) und unerwarteten Fehlern
    */
    if (err.status === 404) {
      // Re-throw SvelteKit Error
      throw err;
    }

    console.error('💥 Unexpected error loading workout details:', err);
    
    // Unerwarteter Fehler - 500 Internal Server Error
    throw error(500, {
      message: 'Fehler beim Laden der Workout-Details',
      details: 'Ein unerwarteter Server-Fehler ist aufgetreten. Bitte versuche es später erneut.'
    });
  }
}

/* 
  HELPER FUNCTIONS
  Zusätzliche Datenverarbeitung für Workout Details
*/

async function findRelatedWorkouts(excludeId, difficulty, targetMuscle, limit = 3) {
  try {
    console.log('🔍 Finding related workouts...');
    
    // Erst nach gleicher Schwierigkeit suchen
    const difficultyResult = await WorkoutModel.findAll({ 
      difficulty: difficulty,
      limit: limit + 1 // +1 weil wir das aktuelle Workout ausschließen
    });
    
    if (difficultyResult.success) {
      let related = difficultyResult.workouts.filter(w => w.id !== excludeId);
      
      if (related.length >= limit) {
        return related.slice(0, limit);
      }
      
      // Falls nicht genug gefunden, suche nach gleicher Muskelgruppe
      const muscleResult = await WorkoutModel.findAll({
        target_muscle: targetMuscle,
        limit: limit * 2
      });
      
      if (muscleResult.success) {
        const additionalWorkouts = muscleResult.workouts
          .filter(w => w.id !== excludeId && !related.find(r => r.id === w.id))
          .slice(0, limit - related.length);
        
        related = [...related, ...additionalWorkouts];
      }
      
      console.log(`✅ Found ${related.length} related workouts`);
      return related.slice(0, limit);
    }
    
    return [];
    
  } catch (error) {
    console.error('❌ Error finding related workouts:', error);
    return [];
  }
}

function calculateWorkoutMetrics(workout) {
  try {
    /* 
      WORKOUT METRICS CALCULATION
      Berechnet zusätzliche Statistiken für einzelnes Workout
    */
    
    const metrics = {
      // Basic Info
      totalExercises: workout.exercises?.length || 0,
      estimatedCalories: Math.round(workout.duration * 8), // Grobe Schätzung
      
      // Exercise Breakdown
      totalSets: 0,
      totalReps: 0,
      totalRestTime: 0,
      
      // Difficulty Metrics
      difficultyScore: getDifficultyScore(workout.difficulty),
      intensityLevel: getIntensityLevel(workout.duration, workout.difficulty),
      
      // Meta
      createdDate: workout.created_at ? new Date(workout.created_at).toLocaleDateString('de-DE') : 'Unbekannt',
      lastModified: workout.updated_at ? new Date(workout.updated_at).toLocaleDateString('de-DE') : 'Unbekannt'
    };

    // Exercise Aggregation
    if (workout.exercises && workout.exercises.length > 0) {
      workout.exercises.forEach(exercise => {
        metrics.totalSets += exercise.sets || 0;
        metrics.totalReps += (exercise.sets || 0) * (exercise.reps || 0);
        metrics.totalRestTime += (exercise.rest_time || 0) * (exercise.sets || 0);
      });
      
      // Durchschnittswerte
      metrics.avgSetsPerExercise = Math.round(metrics.totalSets / workout.exercises.length);
      metrics.avgRestTime = Math.round(metrics.totalRestTime / metrics.totalSets) || 0;
    }

    console.log('📊 Calculated workout metrics:', metrics);
    return metrics;
    
  } catch (error) {
    console.error('❌ Error calculating workout metrics:', error);
    
    // Fallback metrics
    return {
      totalExercises: workout.exercises?.length || 0,
      estimatedCalories: Math.round(workout.duration * 8),
      difficultyScore: 1,
      intensityLevel: 'Niedrig',
      createdDate: 'Unbekannt'
    };
  }
}

function getDifficultyScore(difficulty) {
  const scores = {
    'Leicht': 1,
    'Mittel': 2,
    'Schwer': 3
  };
  return scores[difficulty] || 1;
}

function getIntensityLevel(duration, difficulty) {
  const difficultyMultiplier = getDifficultyScore(difficulty);
  const intensityScore = (duration / 60) * difficultyMultiplier;
  
  if (intensityScore < 1) return 'Niedrig';
  if (intensityScore < 2) return 'Mittel';
  if (intensityScore < 3) return 'Hoch';
  return 'Sehr Hoch';
}

/* 
  ADDITIONAL ACTIONS für Workout Details
  Optional: Weitere Actions für diese Route
*/
export const actions = {
  
  /* 
    DELETE ACTION
    Löscht Workout aus MongoDB
  */
  delete: async ({ params, request }) => {
    console.log('🗑️ Delete workout action for ID:', params.id);
    
    try {
      await connectToDatabase();
      
      const result = await WorkoutModel.delete(params.id);
      
      if (!result.success) {
        return fail(400, {
          error: result.error,
          message: result.message
        });
      }
      
      console.log('✅ Workout deleted successfully');
      
      // Redirect zur Workout-Liste
      throw redirect(303, '/workouts');
      
    } catch (error) {
      if (error.status === 303) {
        throw error;
      }
      
      console.error('❌ Error deleting workout:', error);
      return fail(500, {
        error: 'Fehler beim Löschen',
        message: 'Workout konnte nicht gelöscht werden'
      });
    }
  }
  
};