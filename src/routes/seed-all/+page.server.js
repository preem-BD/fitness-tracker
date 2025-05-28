import WorkoutModel from '$lib/database/models/Workout.js';

export async function load() {
  console.log('🌱 Quick seed...');
  
  const workouts = [
    {
      name: "Push Day Power",
      description: "Intensives Oberkörper-Training",
      duration: 60,
      difficulty: "Schwer",
      target_muscle: "Oberkörper",
      exercises: []
    },
    {
      name: "Beginner Workout", 
      description: "Einfaches Ganzkörpertraining",
      duration: 30,
      difficulty: "Leicht", 
      target_muscle: "Ganzkörper",
      exercises: []
    }
  ];
  
  try {
    for (const w of workouts) {
      const existing = await WorkoutModel.findByName(w.name);
      if (!existing) {
        await WorkoutModel.create(w);
        console.log(`✅ Created: ${w.name}`);
      }
    }
    
    return { success: true, message: 'Workouts erstellt!' };
  } catch (error) {
    return { success: false, error: error.message };
  }
}