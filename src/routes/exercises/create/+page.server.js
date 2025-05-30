import { fail, redirect } from '@sveltejs/kit';
import ExerciseModel from '$lib/database/models/Exercise.js';
import { connectToDatabase, getCollection } from '$lib/database/mongodb.js';

export async function load() {
  try {
    await connectToDatabase();
    
    const categoriesCollection = await getCollection('exercise_categories');
    const categoriesRaw = await categoriesCollection.find({}).toArray();
    
    // WICHTIG: ObjectIds zu Strings konvertieren für SvelteKit Serialization
    const categories = categoriesRaw.map(cat => ({
      id: cat._id.toString(), // ObjectId zu String!
      name: cat.name,
      description: cat.description,
      color: cat.color
    }));

    console.log('📁 Categories loaded:', categories);

    return {
      categories,
      muscleGroups: ['Brust', 'Rücken', 'Schultern', 'Bizeps', 'Trizeps', 'Beine', 'Bauch'],
      equipmentOptions: ['Körpergewicht', 'Langhantel', 'Kurzhanteln', 'Maschinen'],
      difficultyLevels: ['Leicht', 'Mittel', 'Schwer'],
      defaults: {
        difficulty: 'Mittel',
        equipment: 'Körpergewicht'
      }
    };

  } catch (error) {
    console.error('❌ Error loading create page:', error);
    
    // Fallback categories
    return {
      categories: [
        { id: "1", name: "Kraft" },
        { id: "2", name: "Eigengewicht" }
      ],
      muscleGroups: ['Ganzkörper'],
      equipmentOptions: ['Körpergewicht'],
      difficultyLevels: ['Leicht', 'Mittel', 'Schwer']
    };
  }
}

export const actions = {
  create: async ({ request }) => {
    console.log('📝 Exercise Create Action gestartet');
    
    try {
      await connectToDatabase();
      
      const formData = await request.formData();
      
      // Debug: Alle Form-Daten loggen
      console.log('📋 Form Data erhalten:');
      for (let [key, value] of formData.entries()) {
        console.log(`  ${key}: ${value}`);
      }
      
      const exerciseData = {
        name: formData.get('name'),
        description: formData.get('description'),
        instructions: formData.get('instructions'),
        muscle_group: formData.get('muscle_group'),
        equipment: formData.get('equipment'),
        difficulty: formData.get('difficulty'),
        category_id: formData.get('category_id'), // Achtung: könnte null sein
        image_url: formData.get('image_url')
      };

      console.log('📊 Basic exercise data:', exerciseData);

      // Sichere JSON-Parsing für Arrays
      const primaryMusclesRaw = formData.get('primary_muscles');
      const secondaryMusclesRaw = formData.get('secondary_muscles');
      const benefitsRaw = formData.get('benefits');
      const tipsRaw = formData.get('tips');
      const variationsRaw = formData.get('variations');

      try {
        exerciseData.primary_muscles = primaryMusclesRaw ? JSON.parse(primaryMusclesRaw) : [exerciseData.muscle_group || 'Unbekannt'];
        exerciseData.secondary_muscles = secondaryMusclesRaw ? JSON.parse(secondaryMusclesRaw) : [];
        exerciseData.benefits = benefitsRaw ? JSON.parse(benefitsRaw) : [];
        exerciseData.tips = tipsRaw ? JSON.parse(tipsRaw) : [];
        exerciseData.variations = variationsRaw ? JSON.parse(variationsRaw) : [];
      } catch (parseError) {
        console.error('❌ JSON Parse Error:', parseError);
        // Fallback zu einfachen Arrays
        exerciseData.primary_muscles = [exerciseData.muscle_group || 'Unbekannt'];
        exerciseData.secondary_muscles = [];
        exerciseData.benefits = [];
        exerciseData.tips = [];
        exerciseData.variations = [];
      }

      // Sets Empfehlungen
      exerciseData.sets_beginner = formData.get('sets_beginner') || null;
      exerciseData.sets_intermediate = formData.get('sets_intermediate') || null;
      exerciseData.sets_advanced = formData.get('sets_advanced') || null;
      exerciseData.rest_time = formData.get('rest_time') || null;

      console.log('📋 Final exercise data:', exerciseData);

      // Validation
      if (!exerciseData.name || exerciseData.name.trim().length < 2) {
        console.log('❌ Validation failed: Name too short');
        return fail(400, {
          error: 'Name muss mindestens 2 Zeichen haben',
          formData: exerciseData
        });
      }

      if (!exerciseData.description || exerciseData.description.trim().length < 10) {
        console.log('❌ Validation failed: Description too short');
        return fail(400, {
          error: 'Beschreibung muss mindestens 10 Zeichen haben',
          formData: exerciseData
        });
      }

      console.log('✅ Validation passed, creating exercise...');

      const result = await ExerciseModel.create(exerciseData);

      if (!result.success) {
        console.error('❌ Exercise creation failed:', result.error);
        return fail(400, {
          error: result.error,
          errors: result.errors,
          message: result.message,
          formData: exerciseData
        });
      }

      console.log('✅ Exercise created successfully:', result.exercise.name);
      console.log('🆔 Exercise ID:', result.exercise.id);

      // Redirect zu Exercise Details
      throw redirect(303, `/exercises/${result.exercise.id}`);

    } catch (error) {
      if (error.status === 303) {
        // Redirect ist kein echter Error
        throw error;
      }

      console.error('💥 Unexpected error in exercise creation:', error);
      
      return fail(500, {
        error: 'Ein unerwarteter Fehler ist aufgetreten',
        message: error.message,
        details: error.stack
      });
    }
  }
};