// scripts/fix-achievements.js - FIX EXISTING ACHIEVEMENTS

import { MongoClient} from 'mongodb';
import 'dotenv/config'; // Lädt .env Variablen

async function fixExistingAchievements() {
    console.log('🔧 Fixing existing goal achievements...');
    
    let client;
    try {
        // MongoDB Verbindung
        client = new MongoClient(process.env.MONGODB_URI);
        await client.connect();
        const db = client.db('fitness_tracker');
        
        console.log('📡 Connected to MongoDB');
        
        // Alle Goals laden
        const goals = await db.collection('goals').find({}).toArray();
        console.log(`📊 Found ${goals.length} goals to check`);
        
        let updatedCount = 0;
        
        for (const goal of goals) {
            const shouldBeAchieved = goal.current_value >= goal.target_value;
            const currentAchieved = goal.achieved || false;
            
            console.log(`🎯 Checking "${goal.title}": ${goal.current_value}/${goal.target_value} - Current: ${currentAchieved}, Should be: ${shouldBeAchieved}`);
            
            if (currentAchieved !== shouldBeAchieved) {
                await db.collection('goals').updateOne(
                    { _id: goal._id },
                    { 
                        $set: { 
                            achieved: shouldBeAchieved,
                            updated_at: new Date()
                        }
                    }
                );
                updatedCount++;
                console.log(`  ✅ Updated "${goal.title}" to achieved: ${shouldBeAchieved}`);
            } else {
                console.log(`  ✓ "${goal.title}" status already correct`);
            }
        }
        
        console.log(`\n🎉 Fixed ${updatedCount} goal achievement statuses`);
        
    } catch (error) {
        console.error('❌ Error fixing achievements:', error);
    } finally {
        if (client) {
            await client.close();
            console.log('🔐 Database connection closed');
        }
    }
}

// Run the fix
fixExistingAchievements();