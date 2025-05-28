import WorkoutModel from '$lib/database/models/Workout.js';
import { connectToDatabase, getCollection } from '$lib/database/mongodb.js';

export async function load() {
  console.log('🔍 Debug: Checking workout data...');
  
  try {
    // 1. Connection Test
    await connectToDatabase();
    console.log('✅ MongoDB connected');
    
    // 2. Direct Collection Check
    const collection = await getCollection('workouts');
    const directCount = await collection.countDocuments();
    console.log('📊 Direct collection count:', directCount);
    
    // 3. Raw Documents
    const rawWorkouts = await collection.find({}).limit(5).toArray();
    console.log('📄 Raw workouts:', rawWorkouts);
    
    // 4. Model Test
    const modelResult = await WorkoutModel.findAll();
    console.log('🏗️ Model result:', modelResult);
    
    return {
      connection: 'success',
      directCount,
      rawWorkouts: rawWorkouts.map(w => ({
        id: w._id.toString(),
        name: w.name,
        difficulty: w.difficulty
      })),
      modelResult: {
        success: modelResult.success,
        count: modelResult.workouts?.length || 0,
        error: modelResult.error
      }
    };
    
  } catch (error) {
    console.error('❌ Debug error:', error);
    return {
      connection: 'failed',
      error: error.message,
      stack: error.stack
    };
  }
}