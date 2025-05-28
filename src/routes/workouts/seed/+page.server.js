import { seedWorkouts } from '../+page.server.js';

export async function load() {
  console.log('🌱 Manual workout seeding triggered...');
  
  try {
    await seedWorkouts();
    
    return {
      success: true,
      message: 'Workouts erfolgreich in MongoDB erstellt!',
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
}