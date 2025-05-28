import { getCollection } from '$lib/database/mongodb.js';

export async function load() {
  try {
    const collection = await getCollection('exercise_categories');
    
    const categories = [
      { name: "Kraft", description: "Krafttraining", color: "#ff3e00" },
      { name: "Eigengewicht", description: "Körpergewicht", color: "#28a745" },
      { name: "Cardio", description: "Ausdauer", color: "#007bff" },
      { name: "Flexibilität", description: "Dehnung", color: "#6f42c1" }
    ];
    
    let created = 0;
    for (const cat of categories) {
      const existing = await collection.findOne({ name: cat.name });
      if (!existing) {
        await collection.insertOne({ ...cat, created_at: new Date() });
        created++;
      }
    }
    
    return { success: true, message: `${created} Kategorien erstellt!` };
  } catch (error) {
    return { success: false, error: error.message };
  }
}