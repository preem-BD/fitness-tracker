/* 
  WORKOUTS LISTE - CLEAN MONGODB VERSION
  Nur erlaubte Exports, keine Helper-Funktionen
*/

import WorkoutModel from '$lib/database/models/Workout.js';
import { connectToDatabase } from '$lib/database/mongodb.js';

export async function load({ url }) {
  console.log('📊 Loading workouts from MongoDB...');
  
  try {
    await connectToDatabase();
    
    const workoutsResult = await WorkoutModel.findAll();
    
    if (!workoutsResult.success) {
      return {
        workouts: [],
        stats: { total: 0, avgDuration: 0, difficulties: {}, muscleGroups: {} },
        error: 'Workouts konnten nicht geladen werden'
      };
    }

    const workouts = workoutsResult.workouts;
    const total = workouts.length;
    const avgDuration = workouts.length > 0 
      ? Math.round(workouts.reduce((sum, w) => sum + w.duration, 0) / total)
      : 0;

    const difficulties = {};
    const muscleGroups = {};
    
    workouts.forEach(w => {
      if (w.difficulty) {
        difficulties[w.difficulty] = (difficulties[w.difficulty] || 0) + 1;
      }
      if (w.target_muscle) {
        muscleGroups[w.target_muscle] = (muscleGroups[w.target_muscle] || 0) + 1;
      }
    });

    return {
      workouts,
      stats: { total, avgDuration, difficulties, muscleGroups },
      totalCount: total,
      filteredCount: total
    };

  } catch (error) {
    console.error('❌ Error loading workouts:', error);
    
    return {
      workouts: [],
      stats: { total: 0, avgDuration: 0, difficulties: {}, muscleGroups: {} },
      error: `Fehler: ${error.message}`
    };
  }
}