// src/routes/goals/+page.server.js - VERBESSERT

import { connectToDatabase } from '$lib/database/mongodb.js';

export async function load() {
    try {
        console.log('🔍 GOALS MAIN: Starting load...');
        
        // Direkte MongoDB Verbindung
        const { db } = await connectToDatabase();
        console.log('🔍 GOALS MAIN: Database connected');
        
        // Direkte Goals Abfrage mit besserer Fehlerbehandlung
        const rawGoals = await db.collection('goals')
            .find({})
            .sort({ created_at: -1 })
            .toArray();
        
        console.log('🔍 GOALS MAIN: Raw goals count:', rawGoals.length);
        console.log('🔍 GOALS MAIN: First goal:', rawGoals[0]);
        
        // SICHERE Serialisierung mit Default-Werten
        const goals = rawGoals.map(goal => {
            try {
                return {
                    _id: goal._id.toString(),
                    title: goal.title || 'Unbenanntes Goal',
                    description: goal.description || '',
                    goal_type: goal.goal_type || 'other',
                    target_value: Number(goal.target_value) || 0,
                    current_value: Number(goal.current_value) || 0,
                    unit: goal.unit || 'Einheiten',
                    achieved: Boolean(goal.achieved),
                    created_at: goal.created_at instanceof Date ? 
                        goal.created_at.toISOString() : 
                        (goal.created_at || new Date().toISOString()),
                    updated_at: goal.updated_at instanceof Date ? 
                        goal.updated_at.toISOString() : 
                        (goal.updated_at || new Date().toISOString()),
                    target_date: goal.target_date instanceof Date ? 
                        goal.target_date.toISOString() : 
                        goal.target_date
                };
            } catch (serializationError) {
                console.error('❌ Goal serialization error:', serializationError, 'Goal:', goal);
                return null;
            }
        }).filter(goal => goal !== null); // Entferne kaputte Goals
        
        console.log('🔍 GOALS MAIN: Serialized goals count:', goals.length);
        console.log('🔍 GOALS MAIN: First serialized goal:', goals[0]);
        
        // SICHERE Stats berechnen
        const total = goals.length;
        const achieved = goals.filter(g => g.achieved === true).length;
        let avgProgress = 0;
        
        if (total > 0) {
            const totalProgress = goals.reduce((sum, g) => {
                const progress = (g.current_value || 0) / (g.target_value || 1);
                return sum + Math.min(progress, 1);
            }, 0);
            avgProgress = totalProgress / total;
        }
        
        const stats = {
            total: total,
            achieved: achieved,
            avgProgress: avgProgress
        };
        
        console.log('🔍 GOALS MAIN: Final stats:', stats);
        console.log('🔍 GOALS MAIN: Final goals array length:', goals.length);
        
        return {
            goals: goals, // WICHTIG: Stelle sicher dass es ein Array ist
            stats: stats
        };
        
    } catch (error) {
        console.error('❌ GOALS MAIN ERROR:', error);
        
        return {
            goals: [], // IMMER ein leeres Array, nie undefined
            stats: {
                total: 0,
                achieved: 0,
                avgProgress: 0
            },
            error: 'Fehler beim Laden der Goals: ' + error.message
        };
    }
}