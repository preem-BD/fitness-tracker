// src/routes/workouts/[id]/edit/+page.server.js - GOALS PATTERN VERSION

import { WorkoutModel } from '$lib/database/models/Workout.js';
import { error, fail, redirect } from '@sveltejs/kit';

// LOAD FUNCTION: Sicher mit Error Handling (Goals Pattern)
export async function load({ params }) {
    try {
        console.log('🔍 Loading workout for editing, ID:', params.id);
        
        // Validiere Workout ID Format
        if (!params.id || params.id.length !== 24) {
            throw error(400, {
                message: 'Ungültige Workout-ID',
                details: 'Workout-ID muss 24 Zeichen lang sein'
            });
        }
        
        const workout = await WorkoutModel.findById(params.id);
        
        if (!workout) {
            throw error(404, {
                message: 'Workout nicht gefunden',
                details: `Workout mit ID ${params.id} existiert nicht`
            });
        }
        
        // SAFE SERIALIZATION (Goals Pattern) - Fixed ID handling
        const serializedWorkout = {
            _id: (workout._id || workout.id || params.id).toString(),
            name: workout.name || 'Unbenanntes Workout',
            description: workout.description || '',
            duration: Number(workout.duration) || 0,
            difficulty: workout.difficulty || 'Beginner',
            target_muscle: workout.target_muscle || '',
            exercises: workout.exercises || [],
            created_at: workout.created_at instanceof Date ? 
                workout.created_at.toISOString() : 
                (workout.created_at || new Date().toISOString()),
            updated_at: workout.updated_at instanceof Date ? 
                workout.updated_at.toISOString() : 
                (workout.updated_at || new Date().toISOString())
        };
        
        console.log('✅ Workout loaded for editing:', serializedWorkout.name);
        
        return {
            workout: serializedWorkout
        };
        
    } catch (err) {
        console.error('❌ Error loading workout for editing:', err);
        
        // Specific error handling (Goals Pattern)
        if (err.message.includes('not found')) {
            throw error(404, {
                message: 'Workout nicht gefunden',
                details: `Workout mit ID ${params.id} existiert nicht`
            });
        }
        
        if (err.message.includes('invalid')) {
            throw error(400, {
                message: 'Ungültige Workout-ID',
                details: 'Die Workout-ID hat ein ungültiges Format'
            });
        }
        
        // Generic server error
        throw error(500, {
            message: 'Server-Fehler',
            details: 'Fehler beim Laden der Workout-Details'
        });
    }
}

// FORM ACTIONS: Vereinfacht und sicher (Goals Pattern)
export const actions = {
    // COMPLETE UPDATE ACTION (Main Action)
    update: async ({ request, params }) => {
        try {
            const formData = await request.formData();
            
            // Extract all fields
            const name = formData.get('name')?.toString().trim();
            const description = formData.get('description')?.toString().trim();
            const duration = parseInt(formData.get('duration'));
            const difficulty = formData.get('difficulty')?.toString().trim();
            const target_muscle = formData.get('target_muscle')?.toString().trim();
            const exercisesJson = formData.get('exercises');
            
            // Validate basic fields
            if (!name || name.length < 2) {
                return fail(400, {
                    error: 'Name muss mindestens 2 Zeichen haben',
                    field: 'name'
                });
            }
            
            if (!description || description.length < 10) {
                return fail(400, {
                    error: 'Beschreibung muss mindestens 10 Zeichen haben',
                    field: 'description'
                });
            }
            
            // Parse exercises if provided
            let exercises = [];
            if (exercisesJson) {
                try {
                    exercises = JSON.parse(exercisesJson);
                } catch (parseErr) {
                    console.error('Error parsing exercises:', parseErr);
                    return fail(400, {
                        error: 'Ungültige Übungen-Daten',
                        field: 'exercises'
                    });
                }
            }
            
            console.log(`🔄 Complete update for workout ${params.id}`);
            
            // Complete Update
            const updateData = {
                name,
                description,
                duration,
                difficulty,
                target_muscle,
                exercises,
                updated_at: new Date()
            };
            
            const success = await WorkoutModel.update(params.id, updateData);
            
            if (success) {
                // Redirect to workout detail page after successful update
                throw redirect(303, `/workouts/${params.id}`);
            } else {
                return fail(500, {
                    error: 'Fehler beim Speichern der Änderungen'
                });
            }
            
        } catch (err) {
            // Handle redirect
            if (err.status === 303) {
                throw err;
            }
            
            console.error('❌ Error in complete workout update:', err);
            return fail(500, {
                error: 'Server-Fehler beim Aktualisieren'
            });
        }
    }
};