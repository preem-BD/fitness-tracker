<!-- src/routes/goals/[id]/edit/+page.svelte - FIXED LAYOUT -->

<svelte:head>
    <title>{data.goal.title} bearbeiten - Fitness Tracker</title>
    <meta name="description" content="Bearbeite dein Fitness-Ziel: {data.goal.title}" />
</svelte:head>

<script>
    // SVELTEKIT IMPORTS für Form Handling
    import { enhance } from '$app/forms';
    import { goto } from '$app/navigation';
    
    // SVELTE 5 RUNES: Props für Form Action Results und Goal Data
    let { data, form } = $props();
    
    // SVELTE 5 RUNES: $state() für Form Data
    let formData = $state({
        title: form?.values?.title || data.goal.title || '',
        description: form?.values?.description || data.goal.description || '',
        goal_type: form?.values?.goal_type || data.goal.goal_type || '',
        target_value: form?.values?.target_value || data.goal.target_value || '',
        unit: form?.values?.unit || data.goal.unit || '',
        target_date: form?.values?.target_date || (data.goal.target_date ? data.goal.target_date.split('T')[0] : '')
    });
    
    // FORM VALIDATION STATE
    let isSubmitting = $state(false);
    let showValidation = $state(false);
    
    // GOAL TYPE OPTIONS
    const goalTypes = [
        { value: 'weight_loss', label: 'Gewichtsverlust' },
        { value: 'weight_gain', label: 'Gewichtszunahme' },
        { value: 'muscle_gain', label: 'Muskelaufbau' },
        { value: 'strength', label: 'Krafttraining' },
        { value: 'endurance', label: 'Ausdauer/Cardio' },
        { value: 'flexibility', label: 'Flexibilität' },
        { value: 'habit', label: 'Gesunde Gewohnheit' },
        { value: 'other', label: 'Sonstiges' }
    ];
    
    // UNIT SUGGESTIONS
    let suggestedUnits = $derived(() => {
        switch (formData.goal_type) {
            case 'weight_loss':
            case 'weight_gain':
                return ['kg', 'lbs', 'pounds'];
            case 'muscle_gain':
                return ['kg', 'lbs', 'cm', 'inches'];
            case 'strength':
                return ['kg', 'lbs', 'reps', 'sets'];
            case 'endurance':
                return ['km', 'miles', 'minuten', 'stunden'];
            case 'flexibility':
                return ['cm', 'inches', 'grad'];
            case 'habit':
                return ['tage', 'wochen', 'mal'];
            default:
                return ['einheiten', 'stück', 'mal'];
        }
    });
    
    // CLIENT-SIDE VALIDATION
    let validationErrors = $derived(() => {
        if (!showValidation) return {};
        
        const errors = {};
        
        if (!formData.title || formData.title.length < 3) {
            errors.title = 'Titel muss mindestens 3 Zeichen lang sein';
        }
        
        if (!formData.description || formData.description.length < 10) {
            errors.description = 'Beschreibung muss mindestens 10 Zeichen lang sein';
        }
        
        if (!formData.goal_type) {
            errors.goal_type = 'Bitte wählen Sie einen Zieltyp aus';
        }
        
        const targetValue = parseFloat(formData.target_value);
        if (isNaN(targetValue) || targetValue <= 0) {
            errors.target_value = 'Muss eine positive Zahl sein';
        }
        
        if (!formData.unit || formData.unit.length < 1) {
            errors.unit = 'Bitte geben Sie eine Einheit an';
        }
        
        return errors;
    });
    
    let isFormValid = $derived(() => {
        return Object.keys(validationErrors).length === 0 && 
               formData.title && formData.description && formData.goal_type && 
               formData.target_value && formData.unit;
    });
    
    let hasChanges = $derived(() => {
        return formData.title !== data.goal.title ||
               formData.description !== data.goal.description ||
               formData.goal_type !== data.goal.goal_type ||
               parseFloat(formData.target_value) !== data.goal.target_value ||
               formData.unit !== data.goal.unit ||
               formData.target_date !== (data.goal.target_date ? data.goal.target_date.split('T')[0] : '');
    });
    
    function handleSubmit() {
        showValidation = true;
        isSubmitting = true;
    }
    
    function handleCancel() {
        goto(`/goals/${data.goal._id}`);
    }
    
    function selectUnit(unit) {
        formData.unit = unit;
    }
    
    function resetForm() {
        formData = {
            title: data.goal.title,
            description: data.goal.description,
            goal_type: data.goal.goal_type,
            target_value: data.goal.target_value,
            unit: data.goal.unit,
            target_date: data.goal.target_date ? data.goal.target_date.split('T')[0] : ''
        };
        showValidation = false;
    }
</script>

<div class="edit-page">
    <!-- Breadcrumb Navigation -->
    <nav class="breadcrumb">
        <a href="/">🏠 Home</a>
        <span class="separator">›</span>
        <a href="/goals">🎯 Goals</a>
        <span class="separator">›</span>
        <a href="/goals/{data.goal._id}">{data.goal.title}</a>
        <span class="separator">›</span>
        <span class="current">Bearbeiten</span>
    </nav>

    <!-- Page Header -->
    <header class="page-header">
        <h1>✏️ Goal bearbeiten</h1>
        <p>Passe dein Fitness-Goal an deine aktuellen Bedürfnisse an</p>
    </header>

    <!-- Form Error Display -->
    {#if form?.error}
        <div class="error-banner">
            <strong>❌ Fehler:</strong> {form.error}
        </div>
    {/if}

    <!-- Changes Indicator -->
    {#if hasChanges}
        <div class="changes-banner">
            <strong>💾 Nicht gespeicherte Änderungen!</strong> Vergiss nicht zu speichern.
        </div>
    {/if}

    <!-- Main Edit Form -->
    <div class="form-container">
        <form 
            method="POST" 
            use:enhance={() => {
                isSubmitting = true;
                
                return async ({ result, update }) => {
                    isSubmitting = false;
                    
                    if (result.type === 'redirect') {
                        await goto(result.location);
                    } else {
                        await update();
                    }
                };
            }}
            onsubmit={handleSubmit}
            class="goal-form"
        >
            
            <!-- Basic Info Section -->
            <section class="form-section">
                <h2>📝 Grundinformationen</h2>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="title" class="required">Goal-Titel:</label>
                        <input 
                            type="text" 
                            id="title"
                            name="title"
                            bind:value={formData.title}
                            placeholder="z.B. 10kg abnehmen"
                            required
                            class="form-input"
                            class:error={form?.errors?.title || validationErrors.title}
                        />
                        {#if form?.errors?.title || validationErrors.title}
                            <span class="field-error">{form?.errors?.title || validationErrors.title}</span>
                        {/if}
                    </div>
                    
                    <div class="form-group">
                        <label for="goal_type" class="required">Goal-Typ:</label>
                        <select 
                            id="goal_type"
                            name="goal_type"
                            bind:value={formData.goal_type}
                            required
                            class="form-input"
                            class:error={form?.errors?.goal_type || validationErrors.goal_type}
                        >
                            <option value="">Goaltyp wählen...</option>
                            {#each goalTypes as type}
                                <option value={type.value}>{type.label}</option>
                            {/each}
                        </select>
                        {#if form?.errors?.goal_type || validationErrors.goal_type}
                            <span class="field-error">{form?.errors?.goal_type || validationErrors.goal_type}</span>
                        {/if}
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="description" class="required">Beschreibung:</label>
                    <textarea 
                        id="description"
                        name="description"
                        bind:value={formData.description}
                        rows="3"
                        placeholder="Beschreibe dein Goal detailliert..."
                        required
                        class="form-input"
                        class:error={form?.errors?.description || validationErrors.description}
                    ></textarea>
                    {#if form?.errors?.description || validationErrors.description}
                        <span class="field-error">{form?.errors?.description || validationErrors.description}</span>
                    {/if}
                    <span class="field-hint">{formData.description.length} Zeichen (mindestens 10)</span>
                </div>
            </section>

            <!-- Target Values Section -->
            <section class="form-section">
                <h2>🎯 Zielwerte</h2>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="target_value" class="required">Zielwert:</label>
                        <input 
                            type="number" 
                            id="target_value"
                            name="target_value"
                            bind:value={formData.target_value}
                            placeholder="0"
                            min="0.1"
                            step="0.1"
                            required
                            class="form-input"
                            class:error={form?.errors?.target_value || validationErrors.target_value}
                        />
                        {#if form?.errors?.target_value || validationErrors.target_value}
                            <span class="field-error">{form?.errors?.target_value || validationErrors.target_value}</span>
                        {/if}
                        <span class="field-hint">
                            Aktueller Fortschritt: {data.goal.current_value} {data.goal.unit}
                        </span>
                    </div>
                    
                    <div class="form-group">
                        <label for="unit" class="required">Einheit:</label>
                        <input 
                            type="text" 
                            id="unit"
                            name="unit"
                            bind:value={formData.unit}
                            placeholder="kg, lbs, km, etc."
                            required
                            class="form-input"
                            class:error={form?.errors?.unit || validationErrors.unit}
                        />
                        {#if form?.errors?.unit || validationErrors.unit}
                            <span class="field-error">{form?.errors?.unit || validationErrors.unit}</span>
                        {/if}
                        
                        {#if suggestedUnits.length > 0 && formData.goal_type}
                            <div class="unit-suggestions">
                                <span class="suggestions-label">Vorschläge:</span>
                                <div class="suggestions-buttons">
                                    {#each suggestedUnits as unit}
                                        <button 
                                            type="button" 
                                            class="suggestion-btn"
                                            onclick={() => selectUnit(unit)}
                                        >
                                            {unit}
                                        </button>
                                    {/each}
                                </div>
                            </div>
                        {/if}
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="target_date">Zieldatum (optional):</label>
                    <input 
                        type="date" 
                        id="target_date"
                        name="target_date"
                        bind:value={formData.target_date}
                        min={new Date().toISOString().split('T')[0]}
                        class="form-input"
                        class:error={form?.errors?.target_date}
                    />
                    {#if form?.errors?.target_date}
                        <span class="field-error">{form?.errors?.target_date}</span>
                    {/if}
                    <span class="field-hint">Setze eine Deadline um motiviert zu bleiben</span>
                </div>
            </section>

            <!-- Progress Overview -->
            <section class="form-section progress-overview">
                <h2>📊 Aktueller Fortschritt</h2>
                
                <div class="progress-display">
                    <div class="progress-info">
                        <span>Fortschritt</span>
                        <span>{data.goal.current_value} / {data.goal.target_value} {data.goal.unit}</span>
                    </div>
                    <div class="progress-bar">
                        <div 
                            class="progress-fill"
                            style="width: {Math.min((data.goal.current_value / data.goal.target_value) * 100, 100)}%"
                        >
                            {Math.min(Math.round((data.goal.current_value / data.goal.target_value) * 100), 100)}%
                        </div>
                    </div>
                    <div class="progress-status">
                        {#if data.goal.achieved}
                            🏆 Goal erreicht!
                        {:else}
                            Noch {data.goal.target_value - data.goal.current_value} {data.goal.unit} bis zum Goal
                        {/if}
                    </div>
                </div>
            </section>

            <!-- Form Actions -->
            <section class="form-actions">
                <div class="action-buttons">
                    <button 
                        type="submit" 
                        class="submit-btn"
                        disabled={isSubmitting || (!isFormValid && showValidation) || !hasChanges}
                    >
                        {#if isSubmitting}
                            🔄 Speichere Änderungen...
                        {:else}
                            ✅ Änderungen speichern
                        {/if}
                    </button>
                    
                    <button 
                        type="button" 
                        class="reset-btn"
                        onclick={resetForm}
                        disabled={isSubmitting || !hasChanges}
                    >
                        🔄 Zurücksetzen
                    </button>
                    
                    <button 
                        type="button" 
                        class="cancel-btn"
                        onclick={handleCancel}
                        disabled={isSubmitting}
                    >
                        ❌ Abbrechen
                    </button>
                </div>
            </section>

        </form>
    </div>
</div>

<style>
    /* CLEAN EDIT PAGE LAYOUT */
    .edit-page {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
    }

    /* Breadcrumb */
    .breadcrumb {
        margin-bottom: 30px;
        padding: 10px 0;
        font-size: 0.9em;
        color: #666;
    }

    .breadcrumb a {
        color: #667eea;
        text-decoration: none;
    }

    .breadcrumb a:hover {
        text-decoration: underline;
    }

    .separator {
        margin: 0 10px;
        color: #999;
    }

    .current {
        color: #333;
        font-weight: 500;
    }

    /* Page Header */
    .page-header {
        text-align: center;
        margin-bottom: 30px;
    }

    .page-header h1 {
        color: #333;
        margin-bottom: 10px;
    }

    .page-header p {
        color: #666;
        font-size: 1.1em;
    }

    /* Banners */
    .error-banner, .changes-banner {
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 20px;
    }

    .error-banner {
        background: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
    }

    .changes-banner {
        background: #d1ecf1;
        color: #0c5460;
        border: 1px solid #bee5eb;
    }

    /* Form Container */
    .form-container {
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        overflow: hidden;
    }

    .goal-form {
        display: flex;
        flex-direction: column;
    }

    /* Form Sections */
    .form-section {
        padding: 30px;
        border-bottom: 1px solid #e9ecef;
    }

    .form-section:last-child {
        border-bottom: none;
    }

    .form-section h2 {
        margin: 0 0 25px 0;
        color: #333;
        font-size: 1.4em;
        border-bottom: 2px solid #667eea;
        padding-bottom: 10px;
    }

    /* Form Groups */
    .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        margin-bottom: 20px;
    }

    .form-group {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
    }

    .form-group label {
        margin-bottom: 8px;
        font-weight: 500;
        color: #333;
    }

    .form-group label.required::after {
        content: " *";
        color: #dc3545;
    }

    .form-input {
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 6px;
        font-size: 16px;
        transition: border-color 0.2s, box-shadow 0.2s;
    }

    .form-input:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
    }

    .form-input.error {
        border-color: #dc3545;
        box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.2);
    }

    .field-error {
        color: #dc3545;
        font-size: 0.9em;
        margin-top: 5px;
        font-weight: 500;
    }

    .field-hint {
        color: #666;
        font-size: 0.9em;
        margin-top: 5px;
    }

    /* Unit Suggestions */
    .unit-suggestions {
        margin-top: 10px;
    }

    .suggestions-label {
        font-size: 0.9em;
        color: #666;
        margin-right: 10px;
    }

    .suggestions-buttons {
        display: flex;
        gap: 5px;
        flex-wrap: wrap;
        margin-top: 5px;
    }

    .suggestion-btn {
        background: #f8f9fa;
        border: 1px solid #dee2e6;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 0.8em;
        cursor: pointer;
        transition: all 0.2s;
    }

    .suggestion-btn:hover {
        background: #e9ecef;
        border-color: #adb5bd;
    }

    /* Progress Overview */
    .progress-overview {
        background: #f8f9fa;
    }

    .progress-display {
        background: white;
        padding: 20px;
        border-radius: 8px;
        border: 1px solid #e9ecef;
    }

    .progress-info {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        font-weight: 500;
    }

    .progress-bar {
        height: 20px;
        background: #e9ecef;
        border-radius: 10px;
        overflow: hidden;
        margin-bottom: 10px;
    }

    .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #667eea, #764ba2);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 0.9em;
        transition: width 0.3s ease;
    }

    .progress-status {
        text-align: center;
        color: #666;
        font-style: italic;
    }

    /* Form Actions */
    .form-actions {
        background: #f8f9fa;
        padding: 30px;
    }

    .action-buttons {
        display: flex;
        gap: 15px;
        justify-content: center;
        flex-wrap: wrap;
    }

    .submit-btn, .reset-btn, .cancel-btn {
        padding: 15px 30px;
        border: none;
        border-radius: 6px;
        font-weight: bold;
        font-size: 1em;
        cursor: pointer;
        transition: all 0.2s;
        text-decoration: none;
        display: inline-block;
        text-align: center;
    }

    .submit-btn {
        background: #667eea;
        color: white;
    }

    .submit-btn:hover:not(:disabled) {
        background: #5a67d8;
        transform: translateY(-1px);
    }

    .reset-btn {
        background: #6c757d;
        color: white;
    }

    .reset-btn:hover:not(:disabled) {
        background: #5a6268;
    }

    .cancel-btn {
        background: #dc3545;
        color: white;
    }

    .cancel-btn:hover:not(:disabled) {
        background: #c82333;
    }

    .submit-btn:disabled, .reset-btn:disabled, .cancel-btn:disabled {
        background: #6c757d;
        cursor: not-allowed;
        transform: none;
        opacity: 0.6;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        .edit-page {
            padding: 15px;
        }
        
        .form-section {
            padding: 20px;
        }
        
        .form-row {
            grid-template-columns: 1fr;
        }
        
        .action-buttons {
            flex-direction: column;
            align-items: center;
        }
        
        .submit-btn, .reset-btn, .cancel-btn {
            width: 100%;
            max-width: 300px;
        }
    }
</style>