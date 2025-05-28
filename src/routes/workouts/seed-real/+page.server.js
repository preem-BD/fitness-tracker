import WorkoutModel from '$lib/database/models/Workout.js';
import ExerciseModel from '$lib/database/models/Exercise.js';
import { getCollection } from '$lib/database/mongodb.js';

export async function load() {
  console.log('🌱 Creating comprehensive fitness data...');
  
  try {
    // 1. Erst Exercise Categories erstellen
    await seedExerciseCategories();
    
    // 2. Dann Exercises erstellen  
    await seedExercises();
    
    // 3. Dann Workouts erstellen
    await seedWorkouts();
    
    return {
      success: true,
      message: 'Komplette Fitness-Datenbank erstellt!',
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('❌ Real seeding error:', error);
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
}

async function seedExerciseCategories() {
  const collection = await getCollection('exercise_categories');
  
  const categories = [
    {
      name: "Kraft",
      description: "Krafttraining mit Gewichten",
      color: "#ff3e00",
      created_at: new Date()
    },
    {
      name: "Eigengewicht", 
      description: "Training mit dem eigenen Körpergewicht",
      color: "#28a745",
      created_at: new Date()
    },
    {
      name: "Cardio",
      description: "Ausdauertraining", 
      color: "#007bff",
      created_at: new Date()
    },
    {
      name: "Flexibilität",
      description: "Dehnungs- und Beweglichkeitsübungen",
      color: "#6f42c1",
      created_at: new Date()
    }
  ];
  
  // Nur einfügen wenn leer
  const count = await collection.countDocuments();
  if (count === 0) {
    await collection.insertMany(categories);
    console.log('✅ Exercise categories seeded');
  }
}

async function seedExercises() {
  const exercises = [
    {
      name: "Bankdrücken",
      description: "Klassische Brustübung mit der Langhantel",
      instructions: "Lege dich auf die Bank, greife die Hantel schulterbreit und drücke sie kontrolliert nach oben. Senke die Hantel bis zur Brust und drücke sie wieder hoch.",
      muscle_group: "Brust",
      equipment: "Langhantel",
      difficulty: "Mittel",
      primary_muscles: ["Brustmuskel", "Trizeps"],
      secondary_muscles: ["Vordere Schulter"],
      benefits: ["Stärkt die Brustmuskulatur", "Verbessert Druckkraft"],
      tips: ["Schulterblätter zusammenziehen", "Kontrollierte Bewegung"],
      sets_recommendation: {
        beginner: "3x8-10",
        intermediate: "4x6-8", 
        advanced: "5x4-6"
      },
      rest_time: "90-120 Sekunden",
      created_at: new Date()
    },
    {
      name: "Kniebeugen",
      description: "Grundübung für die Beinmuskulatur",
      instructions: "Stelle dich schulterbreit hin, gehe in die Kniebeuge bis die Oberschenkel parallel zum Boden sind und drücke dich wieder hoch.",
      muscle_group: "Beine", 
      equipment: "Körpergewicht",
      difficulty: "Leicht",
      primary_muscles: ["Quadrizeps", "Gesäßmuskel"],
      secondary_muscles: ["Hamstrings", "Rumpf"],
      benefits: ["Stärkt die Beinmuskulatur", "Verbessert funktionale Bewegung"],
      tips: ["Knie in Richtung Zehen", "Rücken gerade halten"],
      sets_recommendation: {
        beginner: "3x10-15",
        intermediate: "4x8-12",
        advanced: "5x6-10"
      },
      rest_time: "60-90 Sekunden",
      created_at: new Date()
    },
    {
      name: "Klimmzüge",
      description: "Rückenübung am Klimmzugturm",
      instructions: "Hänge dich an die Stange und ziehe deinen Körper kontrolliert nach oben bis das Kinn über der Stange ist.",
      muscle_group: "Rücken",
      equipment: "Klimmzugstange", 
      difficulty: "Schwer",
      primary_muscles: ["Latissimus", "Rhomboids"],
      secondary_muscles: ["Bizeps", "Unterarme"],
      benefits: ["Entwickelt V-Form", "Stärkt Oberkörper-Zug"],
      tips: ["Schulterblätter zusammenziehen", "Kontrollierte Bewegung"],
      sets_recommendation: {
        beginner: "3x3-5",
        intermediate: "4x5-8",
        advanced: "5x8-12"
      },
      rest_time: "120-180 Sekunden",
      created_at: new Date()
    },
    {
      name: "Liegestütze",
      description: "Klassische Eigengewichtsübung für den Oberkörper",
      instructions: "Stütze dich mit gestreckten Armen ab, senke den Körper bis die Brust fast den Boden berührt und drücke dich wieder hoch.",
      muscle_group: "Brust",
      equipment: "Körpergewicht",
      difficulty: "Leicht", 
      primary_muscles: ["Brustmuskel", "Trizeps"],
      secondary_muscles: ["Vordere Schulter", "Rumpf"],
      benefits: ["Überall durchführbar", "Stärkt Oberkörper"],
      tips: ["Körper gerade halten", "Volle Bewegungsamplitude"],
      sets_recommendation: {
        beginner: "3x5-10",
        intermediate: "4x10-15",
        advanced: "5x15-25"
      },
      rest_time: "60-90 Sekunden",
      created_at: new Date()
    },
    {
      name: "Plank",
      description: "Isometrische Rumpfübung",
      instructions: "Halte deinen Körper in einer geraden Linie auf Unterarmen und Zehenspitzen. Spanne den Rumpf an.",
      muscle_group: "Bauch",
      equipment: "Körpergewicht",
      difficulty: "Leicht",
      primary_muscles: ["Rumpfmuskulatur", "Bauchmuskeln"],
      secondary_muscles: ["Schultern", "Rückenstrecker"],
      benefits: ["Verbessert Rumpfstabilität", "Stärkt Core"],
      tips: ["Körper gerade halten", "Gleichmäßig atmen"],
      sets_recommendation: {
        beginner: "3x20-30s",
        intermediate: "4x30-45s",
        advanced: "5x45-60s"
      },
      rest_time: "60 Sekunden",
      created_at: new Date()
    }
  ];
  
  // Exercises über Model erstellen
  for (const exerciseData of exercises) {
    const existing = await ExerciseModel.findByName(exerciseData.name);
    if (!existing) {
      const result = await ExerciseModel.create(exerciseData);
      if (result.success) {
        console.log(`✅ Exercise created: ${exerciseData.name}`);
      } else {
        console.log(`❌ Failed to create exercise: ${exerciseData.name}`);
      }
    }
  }
}

async function seedWorkouts() {
  const workouts = [
    {
      name: "Push Day Power",
      description: "Intensives Oberkörper-Training für Kraft und Masse. Fokussiert auf Drückbewegungen für Brust, Schultern und Trizeps.",
      duration: 60,
      difficulty: "Schwer", 
      target_muscle: "Oberkörper",
      exercises: [
        { exercise_name: "Bankdrücken", sets: 4, reps: 6, rest_time: 120, order: 1 },
        { exercise_name: "Schulterdrücken", sets: 4, reps: 8, rest_time: 90, order: 2 },
        { exercise_name: "Dips", sets: 3, reps: 10, rest_time: 75, order: 3 },
        { exercise_name: "Trizeps Extensions", sets: 3, reps: 12, rest_time: 60, order: 4 }
      ]
    },
    {
      name: "Pull Day Strength", 
      description: "Krafttraining für Rücken und Bizeps. Zieht alle wichtigen Rückenmuskeln ins Training ein.",
      duration: 55,
      difficulty: "Schwer",
      target_muscle: "Oberkörper",
      exercises: [
        { exercise_name: "Klimmzüge", sets: 4, reps: 6, rest_time: 120, order: 1 },
        { exercise_name: "Rudern", sets: 4, reps: 8, rest_time: 90, order: 2 },
        { exercise_name: "Bizeps Curls", sets: 3, reps: 12, rest_time: 60, order: 3 }
      ]
    },
    {
      name: "Leg Day Intensity",
      description: "Komplettes Beintraining für maximale Kraft und Muskelmasse. Alle wichtigen Beinmuskeln werden trainiert.",
      duration: 70,
      difficulty: "Schwer", 
      target_muscle: "Unterkörper",
      exercises: [
        { exercise_name: "Kniebeugen", sets: 4, reps: 8, rest_time: 120, order: 1 },
        { exercise_name: "Kreuzheben", sets: 4, reps: 6, rest_time: 150, order: 2 },
        { exercise_name: "Ausfallschritte", sets: 3, reps: 12, rest_time: 90, order: 3 },
        { exercise_name: "Wadenheben", sets: 4, reps: 15, rest_time: 60, order: 4 }
      ]
    },
    {
      name: "Beginner Full Body",
      description: "Perfektes Ganzkörper-Workout für Einsteiger. Alle wichtigen Muskelgruppen werden trainiert.",
      duration: 45,
      difficulty: "Leicht",
      target_muscle: "Ganzkörper",
      exercises: [
        { exercise_name: "Kniebeugen", sets: 3, reps: 12, rest_time: 60, order: 1 },
        { exercise_name: "Liegestütze", sets: 3, reps: 8, rest_time: 60, order: 2 },
        { exercise_name: "Plank", sets: 3, reps: 30, rest_time: 45, order: 3 },
        { exercise_name: "Ausfallschritte", sets: 2, reps: 10, rest_time: 60, order: 4 }
      ]
    },
    {
      name: "HIIT Cardio Blast",
      description: "Hochintensives Intervalltraining für maximale Fettverbrennung und Ausdauer.",
      duration: 30,
      difficulty: "Mittel",
      target_muscle: "Ganzkörper", 
      exercises: [
        { exercise_name: "Burpees", sets: 4, reps: 10, rest_time: 30, order: 1 },
        { exercise_name: "Mountain Climbers", sets: 4, reps: 20, rest_time: 30, order: 2 },
        { exercise_name: "Jump Squats", sets: 4, reps: 15, rest_time: 30, order: 3 },
        { exercise_name: "High Knees", sets: 4, reps: 30, rest_time: 30, order: 4 }
      ]
    },
    {
      name: "Upper Body Strength",
      description: "Krafttraining für den kompletten Oberkörper. Ausgewogenes Training für alle Oberkörpermuskeln.",
      duration: 50,
      difficulty: "Mittel",
      target_muscle: "Oberkörper",
      exercises: [
        { exercise_name: "Liegestütze", sets: 4, reps: 12, rest_time: 75, order: 1 },
        { exercise_name: "Klimmzüge", sets: 3, reps: 6, rest_time: 90, order: 2 },
        { exercise_name: "Plank", sets: 3, reps: 45, rest_time: 60, order: 3 }
      ]
    }
  ];
  
  // Workouts über Model erstellen
  for (const workoutData of workouts) {
    const existing = await WorkoutModel.findByName(workoutData.name);
    if (!existing) {
      const result = await WorkoutModel.create(workoutData);
      if (result.success) {
        console.log(`✅ Workout created: ${workoutData.name}`);
      } else {
        console.log(`❌ Failed to create workout: ${workoutData.name} - ${result.error}`);
      }
    }
  }
}