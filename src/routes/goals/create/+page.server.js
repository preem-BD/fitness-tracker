// +page.server.js - SERVER-SIDE für Goal Create Page
// Nach Exercise Create Vorbild mit deutscher Sprache

import { GoalModel } from '$lib/database/models/Goal.js';
import { fail, redirect } from '@sveltejs/kit';

export async function load() {
    try {
        console.log('📁 Lade Goal Create Page Daten...');

        return {
            goalTypes: [
                { value: 'weight_loss', label: 'Gewichtsverlust' },
                { value: 'weight_gain', label: 'Gewichtszunahme' },
                { value: 'muscle_gain', label: 'Muskelaufbau' },
                { value: 'strength', label: 'Krafttraining' },
                { value: 'endurance', label: 'Ausdauer/Cardio' },
                { value: 'flexibility', label: 'Flexibilität' },
                { value: 'habit', label: 'Gesunde Gewohnheit' },
                { value: 'other', label: 'Sonstiges' }
            ],
            unitSuggestions: {
                'weight_loss': ['kg', 'lbs', 'pounds'],
                'weight_gain': ['kg', 'lbs', 'pounds'],
                'muscle_gain': ['kg', 'lbs', 'cm', 'inches'],
                'strength': ['kg', 'lbs', 'reps', 'sets'],
                'endurance': ['km', 'miles', 'minuten', 'stunden'],
                'flexibility': ['cm', 'inches', 'grad'],
                'habit': ['tage', 'wochen', 'mal'],
                'other': ['einheiten', 'stück', 'mal']
            },
            defaults: {
                goal_type: 'other',
                current_value: 0
            }
        };

    } catch (error) {
        console.error('❌ Fehler beim Laden der Goal Create Page:', error);
        
        // Fallback Daten
        return {
            goalTypes: [
                { value: 'other', label: 'Allgemein' }
            ],
            unitSuggestions: { 'other': ['einheiten'] },
            defaults: { goal_type: 'other', current_value: 0 }
        };
    }
}

export const actions = {
    create: async ({ request }) => {
        console.log('📝 Goal Create Action gestartet');
        
        try {
            const formData = await request.formData();
            
            // Debug: Alle Form-Daten loggen
            console.log('📋 Form Data erhalten:');
            for (let [key, value] of formData.entries()) {
                console.log(`  ${key}: ${value}`);
            }
            
            const goalData = {
                title: formData.get('title'),
                description: formData.get('description'),
                goal_type: formData.get('goal_type'),
                target_value: parseFloat(formData.get('target_value')),
                unit: formData.get('unit'),
                target_date: formData.get('target_date') || null
            };

            console.log('📊 Basic goal data:', goalData);

            // Server-side Validation
            const errors = {};

            if (!goalData.title || goalData.title.trim().length < 3) {
                errors.title = 'Titel muss mindestens 3 Zeichen haben';
            }

            if (!goalData.description || goalData.description.trim().length < 10) {
                errors.description = 'Beschreibung muss mindestens 10 Zeichen haben';
            }

            if (!goalData.goal_type) {
                errors.goal_type = 'Bitte wählen Sie einen Zieltyp aus';
            }

            if (isNaN(goalData.target_value) || goalData.target_value <= 0) {
                errors.target_value = 'Zielwert muss eine positive Zahl sein';
            }

            if (!goalData.unit || goalData.unit.trim().length < 1) {
                errors.unit = 'Bitte geben Sie eine Maßeinheit an';
            }

            // Target Date Validation (optional)
            if (goalData.target_date) {
                const parsedDate = new Date(goalData.target_date);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                
                if (parsedDate < today) {
                    errors.target_date = 'Zieldatum kann nicht in der Vergangenheit liegen';
                }
            }

            // Validation Fehler zurückgeben
            if (Object.keys(errors).length > 0) {
                console.log('❌ Validation failed:', errors);
                return fail(400, {
                    error: 'Bitte korrigieren Sie die folgenden Fehler',
                    errors: errors,
                    formData: goalData
                });
            }

            console.log('✅ Validation passed, creating goal...');

            const goalId = await GoalModel.createGoal(goalData);

            if (!goalId) {
                console.error('❌ Goal creation failed');
                return fail(400, {
                    error: 'Fehler beim Erstellen des Goals',
                    formData: goalData
                });
            }

            console.log('✅ Goal created successfully with ID:', goalId);

            // Redirect zu Goal Details
            throw redirect(303, `/goals/${goalId}`);

        } catch (error) {
            if (error.status === 303) {
                // Redirect ist kein echter Error
                throw error;
            }

            console.error('💥 Unexpected error in goal creation:', error);
            
            return fail(500, {
                error: 'Ein unerwarteter Fehler ist aufgetreten',
                message: error.message
            });
        }
    }
};