/* 
  WORKOUT CREATE FORM - MONGODB VERSION  
  Zeigt echte Database-Integration mit Validation und Error Handling
  Ersetzt Array-basierte Speicherung mit professioneller DB-Anbindung
*/

import { fail, redirect } from '@sveltejs/kit';
import WorkoutModel from '$lib/database/models/Workout.js';
import { connectToDatabase } from '$lib/database/mongodb.js';

/* 
  LOAD FUNCTION für Create Page
  Lädt Referenzdaten für Dropdowns und Form-Initialisierung
*/
export async function load() {
  console.log('✏️ Loading workout create page...');
  
  try {
    // Stelle sicher dass DB verbunden ist
    await connectToDatabase();
    
    // Form-Optionen für Dropdowns
    const formOptions = {
      difficulties: ['Leicht', 'Mittel', 'Schwer'],
      muscleGroups: [
        'Oberkörper', 'Unterkörper', 'Ganzkörper', 'Rumpf', 
        'Brust', 'Rücken', 'Schultern', 'Arme', 'Beine'
      ],
      defaultValues: {
        difficulty: 'Mittel',
        duration: 45,
        target_muscle: 'Ganzkörper'
      }
    };

    console.log('✅ Workout create page loaded');
    
    return {
      formOptions,
      success: true
    };

  } catch (error) {
    console.error('❌ Error loading create page:', error);
    
    return {
      formOptions: {
        difficulties: ['Leicht', 'Mittel', 'Schwer'],
        muscleGroups: ['Ganzkörper'],
        defaultValues: { difficulty: 'Mittel', duration: 45 }
      },
      error: 'Formular konnte nicht vollständig geladen werden'
    };
  }
}

/* 
  FORM ACTIONS für Workout CRUD Operations
  Zeigt SvelteKit Form Actions mit MongoDB Integration
*/
export const actions = {
  
  /* 
    CREATE ACTION - Neues Workout in MongoDB speichern
    Zeigt komplette Form-Verarbeitung mit Validation
  */
  create: async ({ request }) => {
    console.log('📝 Workout create action aufgerufen');
    
    try {
      // Stelle sicher dass DB verbunden ist
      await connectToDatabase();
      
      // Form-Daten extrahieren
      const formData = await request.formData();
      
      /* 
        FORM DATA EXTRACTION
        Alle Form-Felder systematisch auslesen
      */
      const workoutData = {
        name: formData.get('name'),
        description: formData.get('description'),
        duration: parseInt(formData.get('duration')),
        difficulty: formData.get('difficulty'),
        target_muscle: formData.get('target_muscle')
      };

      // Exercises Array aus JSON parsen (vom Frontend)
      const exercisesJSON = formData.get('exercises');
      let exercises = [];
      
      if (exercisesJSON) {
        try {
          exercises = JSON.parse(exercisesJSON);
          console.log('📋 Parsed exercises:', exercises);
        } catch (parseError) {
          console.error('❌ JSON Parse Error:', parseError);
          return fail(400, {
            error: 'Fehler beim Verarbeiten der Übungen',
            formData: workoutData
          });
        }
      }

      // Exercises zu Workout-Daten hinzufügen
      workoutData.exercises = exercises;

      console.log('📊 Workout data to create:', workoutData);

      /* 
        MONGODB CREATE OPERATION
        Verwendet WorkoutModel statt Array-Push
        Zeigt echte Database-Integration
      */
      const result = await WorkoutModel.create(workoutData);

      if (!result.success) {
        console.error('❌ Workout creation failed:', result.error);
        
        // Return Form mit Validation Errors
        return fail(400, {
          error: result.error,
          errors: result.errors || {},
          message: result.message,
          formData: workoutData
        });
      }

      console.log('✅ Workout created successfully:', result.workout.name);
      console.log('🆔 New workout ID:', result.workout.id);

      /* 
        SUCCESS REDIRECT
        Leitet zu Details-Page des neuen Workouts weiter
        Zeigt SvelteKit Navigation Flow
      */
      throw redirect(303, `/workouts/${result.workout.id}`);

    } catch (error) {
      /* 
        COMPREHENSIVE ERROR HANDLING
        Fängt alle unerwarteten Fehler ab
      */
      if (error.status === 303) {
        // Redirect ist kein echter Error
        throw error;
      }

      console.error('💥 Unexpected error in workout creation:', error);
      
      return fail(500, {
        error: 'Ein unerwarteter Fehler ist aufgetreten',
        message: 'Bitte versuche es später erneut',
        details: error.message,
        // Debug info nur in Development
        debugInfo: process.env.NODE_ENV === 'development' ? {
          stack: error.stack,
          timestamp: new Date().toISOString()
        } : null
      });
    }
  },

  /* 
    PREVIEW ACTION (optional)
    Validiert Form ohne zu speichern
    Für Live-Vorschau Feature
  */
  preview: async ({ request }) => {
    console.log('👀 Workout preview action aufgerufen');
    
    try {
      const formData = await request.formData();
      
      const workoutData = {
        name: formData.get('name'),
        description: formData.get('description'),
        duration: parseInt(formData.get('duration')),
        difficulty: formData.get('difficulty'),
        target_muscle: formData.get('target_muscle')
      };

      // Validierung ohne Speichern
      const validation = validateWorkoutData(workoutData);
      
      if (!validation.isValid) {
        return fail(400, {
          error: 'Validation failed',
          errors: validation.errors,
          preview: true
        });
      }

      return {
        success: true,
        preview: true,
        message: 'Workout-Vorschau ist gültig',
        previewData: workoutData
      };

    } catch (error) {
      console.error('❌ Preview error:', error);
      return fail(500, {
        error: 'Preview konnte nicht erstellt werden',
        preview: true
      });
    }
  }

};

/* 
  HELPER FUNCTIONS
  Interne Validierung und Utilities
  Nicht als Export (würde SvelteKit Error verursachen)
*/

function validateWorkoutData(data) {
  const errors = {};

  // Name validation
  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Name muss mindestens 2 Zeichen haben';
  }

  // Description validation  
  if (!data.description || data.description.trim().length < 10) {
    errors.description = 'Beschreibung muss mindestens 10 Zeichen haben';
  }

  // Duration validation
  if (!data.duration || data.duration < 10 || data.duration > 180) {
    errors.duration = 'Dauer muss zwischen 10 und 180 Minuten sein';
  }

  // Difficulty validation
  const validDifficulties = ['Leicht', 'Mittel', 'Schwer'];
  if (!data.difficulty || !validDifficulties.includes(data.difficulty)) {
    errors.difficulty = 'Ungültige Schwierigkeit';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/* 
  DEVELOPMENT HELPERS
  Zusätzliche Funktionen für Development
*/

// Quick Workout Templates für schnelle Tests
function getWorkoutTemplates() {
  return [
    {
      name: "Quick Push",
      description: "Schnelles Oberkörper-Training",
      duration: 30,
      difficulty: "Mittel",
      target_muscle: "Oberkörper",
      exercises: [
        { name: "Liegestütze", sets: 3, reps: 10, rest_time: 60 },
        { name: "Dips", sets: 3, reps: 8, rest_time: 60 }
      ]
    },
    {
      name: "Quick Legs",
      description: "Effektives Beintraining",
      duration: 25,
      difficulty: "Leicht", 
      target_muscle: "Unterkörper",
      exercises: [
        { name: "Kniebeugen", sets: 3, reps: 15, rest_time: 45 },
        { name: "Ausfallschritte", sets: 3, reps: 12, rest_time: 45 }
      ]
    }
  ];
}