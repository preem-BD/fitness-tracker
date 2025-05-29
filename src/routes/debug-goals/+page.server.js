// Einfache Debug Route ohne komplexe Methoden
import { connectToDatabase } from '$lib/database/mongodb.js';

export async function load() {
    try {
        console.log('🔍 SIMPLE DEBUG: Starting...');
        
        // Direkte MongoDB Verbindung
        const { db } = await connectToDatabase();
        console.log('🔍 SIMPLE DEBUG: Database connected');
        
        // Direkte Collection Abfrage
        const goals = await db.collection('goals').find({}).toArray();
        console.log('🔍 SIMPLE DEBUG: Goals found:', goals.length);
        console.log('🔍 SIMPLE DEBUG: Raw goals:', goals);
        
        // Alle Collections auflisten
        const collections = await db.listCollections().toArray();
        const collectionNames = collections.map(c => c.name);
        console.log('🔍 SIMPLE DEBUG: Available collections:', collectionNames);
        
        // Einfache Serialisierung
        const serializedGoals = goals.map(goal => ({
            id: goal._id.toString(),
            title: goal.title,
            description: goal.description,
            target_value: goal.target_value,
            current_value: goal.current_value,
            unit: goal.unit,
            goal_type: goal.goal_type,
            achieved: goal.achieved,
            created_at: goal.created_at,
            target_date: goal.target_date
        }));
        
        return {
            success: true,
            rawCount: goals.length,
            collections: collectionNames,
            goals: serializedGoals,
            message: `Found ${goals.length} goals in database`
        };
        
    } catch (error) {
        console.error('❌ SIMPLE DEBUG ERROR:', error);
        
        return {
            success: false,
            error: error.message,
            stack: error.stack,
            goals: [],
            collections: []
        };
    }
}