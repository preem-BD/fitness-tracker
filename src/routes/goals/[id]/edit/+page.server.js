// src/routes/goals/[id]/+page.server.js - SAFE VERSION

import { GoalModel } from '$lib/database/models/Goal.js';
import { error } from '@sveltejs/kit';

// LOAD FUNCTION: Sicher mit Error Handling
export async function load({ params }) {
    try {
        console.log('🔍 Loading goal details for ID:', params.id);
        
        // Validiere Goal ID Format
        if (!params.id || params.id.length !== 24) {
            throw error(400, {
                message: 'Ungültige Goal-ID',
                details: 'Goal-ID muss 24 Zeichen lang sein'
            });
        }
        
        const goal = await GoalModel.getGoalById(params.id);
        
        // SAFE SERIALIZATION
        const serializedGoal = {
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
        
        console.log('✅ Goal loaded successfully:', serializedGoal.title);
        
        return {
            goal: serializedGoal
        };
        
    } catch (err) {
        console.error('❌ Error loading goal details:', err);
        
        // Specific error handling
        if (err.message.includes('not found')) {
            throw error(404, {
                message: 'Goal nicht gefunden',
                details: `Goal mit ID ${params.id} existiert nicht`
            });
        }
        
        if (err.message.includes('invalid')) {
            throw error(400, {
                message: 'Ungültige Goal-ID',
                details: 'Die Goal-ID hat ein ungültiges Format'
            });
        }
        
        // Generic server error
        throw error(500, {
            message: 'Server-Fehler',
            details: 'Fehler beim Laden der Goal-Details'
        });
    }
}

// FORM ACTIONS: Vereinfacht und sicher
export const actions = {
    updateProgress: async ({ request, params }) => {
        try {
            const formData = await request.formData();
            const newCurrentValue = parseFloat(formData.get('current_value'));
            
            // INPUT VALIDATION
            if (isNaN(newCurrentValue) || newCurrentValue < 0) {
                return {
                    success: false,
                    error: 'Bitte geben Sie einen gültigen positiven Wert ein'
                };
            }
            
            console.log(`🔄 Updating goal ${params.id} progress to ${newCurrentValue}`);
            
            // Update mit automatischem Achievement Check
            const success = await GoalModel.updateProgress(params.id, newCurrentValue);
            
            if (success) {
                return {
                    success: true,
                    message: '✅ Fortschritt erfolgreich aktualisiert!'
                };
            } else {
                return {
                    success: false,
                    error: 'Fehler beim Speichern des Fortschritts'
                };
            }
            
        } catch (err) {
            console.error('❌ Error updating progress:', err);
            return {
                success: false,
                error: 'Server-Fehler beim Aktualisieren'
            };
        }
    }
};