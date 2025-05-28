import ExerciseModel from '$lib/database/models/Exercise.js';
import { connectToDatabase } from '$lib/database/mongodb.js';

export async function load({ url }) {
  try {
    await connectToDatabase();

    const filters = {
      muscle_group: url.searchParams.get('muscle_group'),
      difficulty: url.searchParams.get('difficulty'),
      search: url.searchParams.get('search')
    };

    const exercisesResult = await ExerciseModel.findAll(filters);
    const stats = await ExerciseModel.getStatistics();

    return {
      exercises: exercisesResult.success ? exercisesResult.exercises : [],
      stats: stats,
      filters: {
        muscleGroups: ['Brust', 'Rücken', 'Schultern', 'Beine', 'Bauch'],
        difficulties: ['Leicht', 'Mittel', 'Schwer'],
        applied: filters
      },
      totalCount: exercisesResult.total || 0,
      filteredCount: exercisesResult.exercises?.length || 0
    };

  } catch (error) {
    console.error('❌ Error loading exercises:', error);
    return {
      exercises: [],
      stats: { total: 0, byMuscleGroup: {}, byDifficulty: {} },
      error: `Fehler: ${error.message}`
    };
  }
}