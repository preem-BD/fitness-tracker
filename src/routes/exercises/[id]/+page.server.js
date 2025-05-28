import ExerciseModel from '$lib/database/models/Exercise.js';
import { connectToDatabase } from '$lib/database/mongodb.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  try {
    await connectToDatabase();
    
    const exercise = await ExerciseModel.findById(params.id);
    
    if (!exercise) {
      throw error(404, { message: 'Exercise nicht gefunden' });
    }

    const relatedExercises = await ExerciseModel.findByMuscleGroup(
      exercise.muscle_group, 
      exercise.id, 
      3
    );

    return {
      exercise: exercise,
      relatedExercises: relatedExercises,
      meta: {
        title: `${exercise.name} - Exercise Details`,
        description: exercise.description
      }
    };

  } catch (err) {
    if (err.status === 404) throw err;
    throw error(500, { message: 'Fehler beim Laden der Exercise-Details' });
  }
}