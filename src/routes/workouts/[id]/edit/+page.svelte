<!-- src/routes/workouts/[id]/edit/+page.svelte - GOALS PATTERN VERSION -->

<svelte:head>
    <title>{data.workout.name} bearbeiten - Fitness Tracker</title>
    <meta name="description" content="Bearbeite dein Workout: {data.workout.name}" />
</svelte:head>

<script>
    // SVELTEKIT IMPORTS für Form Handling
    import { enhance } from '$app/forms';
    import { goto } from '$app/navigation';
    
    // SVELTE 5 RUNES: Props für Form Action Results und Workout Data
    let { data, form } = $props();
    
    // SVELTE 5 RUNES: $state() für Form Data
    let formData = $state({
        name: form?.values?.name || data.workout.name || '',
        description: form?.values?.description || data.workout.description || '',
        duration: form?.values?.duration || data.workout.duration || 45,
        difficulty: form?.values?.difficulty || data.workout.difficulty || 'Beginner',
        target_muscle: form?.values?.target_muscle || data.workout.target_muscle || ''
    });
    
    // EXERCISES STATE
    let exercises = $state([...(data.workout.exercises || [])]);
    
    // FORM VALIDATION STATE
    let isSubmitting = $state(false);
    let showValidation = $state(false);
    
    // DIFFICULTY OPTIONS
    const difficultyOptions = [
        { value: 'Beginner', label: 'Anfänger' },
        { value: 'Intermediate', label: 'Fortgeschritten' },
        { value: 'Advanced', label: 'Profi' },
        { value: 'Expert', label: 'Experte' }
    ];
    
    // FORM VALIDATION (Goals Pattern)
    let isFormValid = $derived(
        formData.name.length >= 2 &&
        formData.description.length >= 10 &&
        formData.duration >= 10 && formData.duration <= 180 &&
        formData.difficulty.length > 0 &&
        formData.target_muscle.length > 0
    );
    
    // EXERCISE MANAGEMENT FUNCTIONS
    function addExercise() {
        exercises.push({ 
            name: '', 
            sets: 3, 
            reps: 10, 
            rest_time: 60 
        });
    }
    
    function removeExercise(index) {
        if (confirm('Übung wirklich entfernen?')) {
            exercises.splice(index, 1);
        }
    }
    
    // FORM ENHANCEMENT (Goals Pattern)
    function handleSubmit() {
        return enhance(({ formData }) => {
            isSubmitting = true;
            
            // Add exercises as JSON
            formData.append('exercises', JSON.stringify(exercises));
            
            return async ({ result }) => {
                isSubmitting = false;
                
                if (result.type === 'success') {
                    console.log('✅ Workout updated successfully');
                } else if (result.type === 'failure') {
                    console.log('❌ Update failed:', result.data?.error);
                } else if (result.type === 'redirect') {
                    console.log('🔄 Redirecting after update');
                }
            };
        });
    }
</script>

<div class="workout-edit-page">
    <!-- BREADCRUMB NAVIGATION -->
    <nav class="breadcrumb">
        <a href="/">🏠 Home</a>
        <span class="separator">›</span>
        <a href="/workouts">💪 Workouts</a>
        <span class="separator">›</span>
        <a href="/workouts/{data.workout._id || data.workout.id}">{data.workout.name}</a>
        <span class="separator">›</span>
        <span class="current">Bearbeiten</span>
    </nav>

    <!-- PAGE HEADER -->
    <header class="page-header">
        <h1>✏️ Workout bearbeiten</h1>
        <p class="subtitle">Bearbeite "{data.workout.name}"</p>
    </header>

    <!-- EDIT FORM -->
    <form 
        method="POST" 
        action="?/update" 
        class="workout-form"
        use:enhance={handleSubmit}
    >
        <!-- BASIC INFORMATION -->
        <section class="form-section">
            <h2>📝 Grundinformationen</h2>
            
            <!-- Workout Name -->
            <div class="form-group">
                <label for="name" class="required">Workout Name:</label>
                <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    bind:value={formData.name}
                    placeholder="z.B. Push Day"
                    required
                    maxlength="100"
                    class="form-input"
                    class:error={form?.field === 'name'}
                />
                {#if form?.field === 'name'}
                    <span class="field-error">{form.error}</span>
                {/if}
            </div>

            <!-- Description -->
            <div class="form-group">
                <label for="description" class="required">Beschreibung:</label>
                <textarea 
                    id="description" 
                    name="description"
                    bind:value={formData.description}
                    placeholder="Beschreibe dein Workout..."
                    rows="4"
                    maxlength="500"
                    required
                    class="form-input"
                    class:error={form?.field === 'description'}
                ></textarea>
                {#if form?.field === 'description'}
                    <span class="field-error">{form.error}</span>
                {/if}
            </div>

            <!-- Duration and Difficulty -->
            <div class="form-grid">
                <div class="form-group">
                    <label for="duration" class="required">Dauer (Minuten):</label>
                    <input 
                        type="number" 
                        id="duration" 
                        name="duration"
                        bind:value={formData.duration}
                        min="10" 
                        max="180"
                        step="5"
                        required
                        class="form-input"
                        class:error={form?.field === 'duration'}
                    />
                    {#if form?.field === 'duration'}
                        <span class="field-error">{form.error}</span>
                    {/if}
                </div>

                <div class="form-group">
                    <label for="difficulty" class="required">Schwierigkeit:</label>
                    <select 
                        id="difficulty" 
                        name="difficulty"
                        bind:value={formData.difficulty}
                        required
                        class="form-input"
                        class:error={form?.field === 'difficulty'}
                    >
                        <option value="">Bitte wählen...</option>
                        {#each difficultyOptions as option}
                            <option value={option.value}>{option.label}</option>
                        {/each}
                    </select>
                    {#if form?.field === 'difficulty'}
                        <span class="field-error">{form.error}</span>
                    {/if}
                </div>
            </div>

            <!-- Target Muscle -->
            <div class="form-group">
                <label for="target_muscle" class="required">Ziel-Muskelgruppe:</label>
                <input 
                    type="text" 
                    id="target_muscle" 
                    name="target_muscle"
                    bind:value={formData.target_muscle}
                    placeholder="z.B. Oberkörper, Beine, Ganzkörper"
                    maxlength="100"
                    required
                    class="form-input"
                    class:error={form?.field === 'target_muscle'}
                />
                {#if form?.field === 'target_muscle'}
                    <span class="field-error">{form.error}</span>
                {/if}
            </div>
        </section>

        <!-- EXERCISES SECTION -->
        <section class="form-section">
            <h2>🏋️ Übungen ({exercises.length})</h2>
            
            <div class="exercises-container">
                {#each exercises as exercise, index}
                    <div class="exercise-item">
                        <div class="exercise-header">
                            <h4>Übung {index + 1}</h4>
                            <button 
                                type="button" 
                                class="remove-btn"
                                onclick={() => removeExercise(index)}
                            >
                                🗑️
                            </button>
                        </div>
                        
                        <div class="exercise-fields">
                            <div class="form-group">
                                <label for="exercise-name-{index}">Name:</label>
                                <input 
                                    type="text" 
                                    id="exercise-name-{index}"
                                    bind:value={exercise.name}
                                    placeholder="z.B. Bankdrücken"
                                    required
                                    class="form-input"
                                />
                            </div>
                            
                            <div class="form-group">
                                <label for="exercise-sets-{index}">Sets:</label>
                                <input 
                                    type="number" 
                                    id="exercise-sets-{index}"
                                    bind:value={exercise.sets}
                                    min="1" max="10"
                                    required
                                    class="form-input"
                                />
                            </div>
                            
                            <div class="form-group">
                                <label for="exercise-reps-{index}">Reps:</label>
                                <input 
                                    type="number" 
                                    id="exercise-reps-{index}"
                                    bind:value={exercise.reps}
                                    min="1" max="100"
                                    required
                                    class="form-input"
                                />
                            </div>
                            
                            <div class="form-group">
                                <label for="exercise-rest-{index}">Pause (Sek):</label>
                                <input 
                                    type="number" 
                                    id="exercise-rest-{index}"
                                    bind:value={exercise.rest_time}
                                    min="30" max="300"
                                    step="15"
                                    required
                                    class="form-input"
                                />
                            </div>
                        </div>
                    </div>
                {/each}
                
                <button 
                    type="button" 
                    class="add-exercise-btn"
                    onclick={addExercise}
                >
                    ➕ Übung hinzufügen
                </button>
                
                {#if form?.field === 'exercises'}
                    <span class="field-error">{form.error}</span>
                {/if}
            </div>
        </section>

        <!-- FORM ACTIONS -->
        <section class="form-actions">
            <div class="action-buttons">
                <a href="/workouts/{data.workout._id || data.workout.id}" class="cancel-btn">
                    ❌ Abbrechen
                </a>
                
                <button 
                    type="submit" 
                    class="submit-btn"
                    disabled={isSubmitting || !isFormValid}
                >
                    {#if isSubmitting}
                        ⏳ Speichere...
                    {:else}
                        💾 Workout aktualisieren
                    {/if}
                </button>
            </div>
            
            {#if form?.error}
                <div class="form-message error-message">
                    <h3>❌ Fehler beim Speichern</h3>
                    <p>{form.error}</p>
                </div>
            {/if}
        </section>
    </form>
</div>

<style>
    /* MAIN LAYOUT */
    .workout-edit-page {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        background: #f8f9fa;
        min-height: 100vh;
    }

    /* BREADCRUMB */
    .breadcrumb {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 20px;
        font-size: 0.9em;
    }

    .breadcrumb a {
        color: #007bff;
        text-decoration: none;
    }

    .breadcrumb a:hover {
        text-decoration: underline;
    }

    .separator {
        color: #999;
    }

    .current {
        color: #333;
        font-weight: bold;
    }

    /* HEADER */
    .page-header {
        text-align: center;
        margin-bottom: 30px;
        background: white;
        padding: 30px;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .page-header h1 {
        color: #333;
        margin: 0 0 10px 0;
        font-size: 2.2em;
    }

    .subtitle {
        color: #666;
        margin: 0;
        font-style: italic;
    }

    /* FORM LAYOUT */
    .workout-form {
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        overflow: hidden;
    }

    .form-section {
        padding: 30px;
        border-bottom: 1px solid #eee;
    }

    .form-section:last-child {
        border-bottom: none;
    }

    .form-section h2 {
        color: #333;
        margin: 0 0 20px 0;
        font-size: 1.4em;
    }

    /* FORM FIELDS */
    .form-group {
        margin-bottom: 20px;
    }

    .form-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
    }

    @media (max-width: 600px) {
        .form-grid {
            grid-template-columns: 1fr;
        }
    }

    label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
        color: #333;
    }

    label.required::after {
        content: ' *';
        color: #dc3545;
    }

    .form-input {
        width: 100%;
        padding: 12px;
        border: 2px solid #ddd;
        border-radius: 8px;
        font-size: 1em;
        transition: border-color 0.3s;
        box-sizing: border-box;
    }

    .form-input:focus {
        outline: none;
        border-color: #007bff;
    }

    .form-input.error {
        border-color: #dc3545;
        background-color: #fff5f5;
    }

    textarea.form-input {
        resize: vertical;
        min-height: 100px;
    }

    /* FIELD ERRORS */
    .field-error {
        display: block;
        margin-top: 5px;
        color: #dc3545;
        font-size: 0.85em;
        font-weight: bold;
    }

    /* EXERCISES */
    .exercises-container {
        margin-top: 20px;
    }

    .exercise-item {
        background: #f8f9fa;
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 20px;
        margin-bottom: 15px;
    }

    .exercise-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
    }

    .exercise-header h4 {
        margin: 0;
        color: #333;
    }

    .exercise-fields {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1fr;
        gap: 15px;
        align-items: end;
    }

    @media (max-width: 600px) {
        .exercise-fields {
            grid-template-columns: 1fr;
        }
    }

    .remove-btn {
        background: #dc3545;
        color: white;
        border: none;
        border-radius: 6px;
        padding: 8px 12px;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .remove-btn:hover {
        background: #c82333;
    }

    .add-exercise-btn {
        width: 100%;
        background: #28a745;
        color: white;
        border: none;
        border-radius: 8px;
        padding: 15px;
        font-size: 1.1em;
        cursor: pointer;
        transition: background-color 0.3s;
        margin-top: 10px;
    }

    .add-exercise-btn:hover {
        background: #218838;
    }

    /* FORM ACTIONS */
    .form-actions {
        background: #f8f9fa;
        padding: 30px;
    }

    .action-buttons {
        display: flex;
        gap: 15px;
        justify-content: center;
        margin-bottom: 20px;
    }

    @media (max-width: 600px) {
        .action-buttons {
            flex-direction: column;
        }
    }

    .cancel-btn {
        background: #6c757d;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        text-decoration: none;
        transition: background-color 0.3s;
        font-weight: bold;
        text-align: center;
    }

    .cancel-btn:hover {
        background: #5a6268;
    }

    .submit-btn {
        background: #007bff;
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.3s;
        font-weight: bold;
        font-size: 1.1em;
    }

    .submit-btn:hover:not(:disabled) {
        background: #0056b3;
    }

    .submit-btn:disabled {
        background: #6c757d;
        cursor: not-allowed;
        opacity: 0.6;
    }

    /* MESSAGES */
    .form-message {
        margin: 20px 0;
        padding: 15px;
        border-radius: 8px;
    }

    .error-message {
        background: #f8d7da;
        border: 1px solid #f5c6cb;
        color: #721c24;
    }

    .error-message h3 {
        margin: 0 0 10px 0;
    }
</style>