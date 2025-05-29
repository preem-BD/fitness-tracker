// src/routes/goals/[id]/+page.server.js - MINIMAL DEBUG VERSION

import { MongoClient, ObjectId } from 'mongodb';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
    console.log('🔍 DEBUG: Goal Details Load started for ID:', params.id);
    
    try {
        // Validiere Goal ID
        if (!params.id || params.id.length !== 24) {
            console.log('❌ Invalid goal ID format');
            throw error(400, 'Ungültige Goal-ID');
        }
        
        // Direkte MongoDB Verbindung (ohne Model)
        console.log('📡 Connecting to MongoDB...');
        const client = new MongoClient(process.env.MONGODB_URI);
        await client.connect();
        console.log('✅ MongoDB connected');
        
        const db = client.db('fitness_tracker');
        
        console.log('🔍 Looking for goal with ID:', params.id);
        const goal = await db.collection('goals').findOne({ 
            _id: new ObjectId(params.id) 
        });
        
        await client.close();
        console.log('🔐 MongoDB connection closed');
        
        if (!goal) {
            console.log('❌ Goal not found');
            throw error(404, 'Goal nicht gefunden');
        }
        
        console.log('✅ Goal found:', goal.title);
        
        // Einfache Serialisierung
        const serializedGoal = {
            _id: goal._id.toString(),
            title: goal.title || 'Unbenanntes Goal',
            description: goal.description || '',
            goal_type: goal.goal_type || 'other',
            target_value: Number(goal.target_value) || 0,
            current_value: Number(goal.current_value) || 0,
            unit: goal.unit || 'Einheiten',
            achieved: Boolean(goal.achieved),
            created_at: goal.created_at ? goal.created_at.toISOString() : new Date().toISOString(),
            updated_at: goal.updated_at ? goal.updated_at.toISOString() : new Date().toISOString(),
            target_date: goal.target_date ? goal.target_date.toISOString() : null
        };
        
        console.log('✅ Goal serialized successfully');
        
        return {
            goal: serializedGoal
        };
        
    } catch (err) {
        console.error('💥 DETAILED ERROR:', {
            message: err.message,
            stack: err.stack,
            goalId: params.id
        });
        
        if (err.status) {
            // SvelteKit error - re-throw
            throw err;
        }
        
        // Unexpected error
        throw error(500, {
            message: 'Server-Fehler beim Laden der Goal-Details',
            details: err.message
        });
    }
}

// Einfache Form Action
export const actions = {
    updateProgress: async ({ request, params }) => {
        console.log('🔄 DEBUG: Update progress action started');
        
        try {
            const formData = await request.formData();
            const newCurrentValue = parseFloat(formData.get('current_value'));
            
            console.log('📝 Form data:', { newCurrentValue, goalId: params.id });
            
            if (isNaN(newCurrentValue) || newCurrentValue < 0) {
                return {
                    success: false,
                    error: 'Ungültiger Wert'
                };
            }
            
            // Direkte MongoDB Update
            const client = new MongoClient(process.env.MONGODB_URI);
            await client.connect();
            const db = client.db('fitness_tracker');
            
            // Goal laden für Achievement Check
            const goal = await db.collection('goals').findOne({ 
                _id: new ObjectId(params.id) 
            });
            
            if (!goal) {
                await client.close();
                return {
                    success: false,
                    error: 'Goal nicht gefunden'
                };
            }
            
            // Achievement Check
            const isAchieved = newCurrentValue >= goal.target_value;
            
            // Update
            await db.collection('goals').updateOne(
                { _id: new ObjectId(params.id) },
                { 
                    $set: { 
                        current_value: newCurrentValue,
                        achieved: isAchieved,
                        updated_at: new Date()
                    }
                }
            );
            
            await client.close();
            
            console.log('✅ Progress updated successfully');
            
            return {
                success: true,
                message: 'Fortschritt aktualisiert!'
            };
            
        } catch (err) {
            console.error('💥 UPDATE ERROR:', err);
            return {
                success: false,
                error: 'Server-Fehler beim Update'
            };
        }
    }
};