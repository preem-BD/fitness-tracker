<!-- 
  GOAL CREATE FORM - SVELTE 5 RUNES VERSION
  Nach Exercise Create Page Vorbild, aber für Goals
-->

<svelte:head>
  <title>🎯 Neues Goal erstellen | Fitness Tracker</title>
  <meta name="description" content="Erstelle ein neues Fitness-Goal mit detaillierten Informationen und Zielen.">
</svelte:head>

<div class="goal-create-page">
  
  <!-- Page Header -->
  <header class="page-header">
    <h1>🎯 Neues Goal erstellen</h1>
    <p>Füge ein neues Fitness-Goal zu deiner Zielverfolgung hinzu</p>
  </header>

  <!-- Breadcrumb Navigation -->
  <nav class="breadcrumb">
    <a href="/">🏠 Home</a>
    <span class="separator">›</span>
    <a href="/goals">🎯 Goals</a>
    <span class="separator">›</span>
    <span class="current">Neues Goal</span>
  </nav>

  <!-- 
    ERROR BANNER
    Zeigt Server-Validierungsfehler
  -->
  {#if form?.error}
    <div class="error-banner">
      <div class="error-content">
        <h3>⚠️ {form.error}</h3>
        {#if form.message}
          <p class="error-details">{form.message}</p>
        {/if}
      </div>
    </div>
  {/if}

  <!-- 
    SUCCESS MESSAGE
    Zeigt Bestätigung nach erfolgreicher Erstellung
  -->
  {#if form?.success}
    <div class="success-banner">
      <h3>✅ Goal erfolgreich erstellt!</h3>
      <p>{form.message}</p>
    </div>
  {/if}

  <!-- 
    MAIN FORM
    SvelteKit Form mit Method POST und Form Actions
  -->
  <form 
    method="POST" 
    action="?/create" 
    class="goal-form"
  >
    
    <!-- 
      BASIC INFORMATION SECTION
      Grundlegende Goal-Daten
    -->
    <section class="form-section">
      <h2>📝 Grundinformationen</h2>
      
      <!-- Goal Title -->
      <div class="form-group">
        <label for="title" class="required">Goal Titel:</label>
        <input 
          type="text" 
          id="title" 
          name="title"
          bind:value={formData.title}
          placeholder="z.B. 10kg abnehmen, 100kg Bankdrücken..."
          required
          maxlength="100"
          class="form-input"
          class:error={form?.errors?.title}
        />
        {#if form?.errors?.title}
          <span class="field-error">{form.errors.title}</span>
        {/if}
        <span class="field-hint">Der Titel sollte präzise und messbar sein</span>
      </div>

      <!-- Description -->
      <div class="form-group">
        <label for="description" class="required">Beschreibung:</label>
        <textarea 
          id="description" 
          name="description"
          bind:value={formData.description}
          placeholder="Beschreibe dein Goal detailliert. Was möchtest du erreichen und warum?"
          required
          maxlength="500"
          rows="4"
          class="form-input"
          class:error={form?.errors?.description}
        ></textarea>
        {#if form?.errors?.description}
          <span class="field-error">{form.errors.description}</span>
        {/if}
        <span class="field-hint">{descriptionLength}/500 Zeichen</span>
      </div>

    </section>

    <!-- 
      GOAL CATEGORIZATION SECTION
      Goal-Typ und Klassifizierung
    -->
    <section class="form-section">
      <h2>🎯 Goal-Kategorisierung</h2>
      
      <!-- Goal Type -->
      <div class="form-group">
        <label for="goal_type" class="required">Goal-Typ:</label>
        <select 
          id="goal_type" 
          name="goal_type"
          bind:value={formData.goal_type}
          required
          class="form-input"
          class:error={form?.errors?.goal_type}
        >
          <option value="">Bitte wählen...</option>
          {#each data.goalTypes as goalType}
            <option value={goalType.value}>{goalType.label}</option>
          {/each}
        </select>
        {#if form?.errors?.goal_type}
          <span class="field-error">{form.errors.goal_type}</span>
        {/if}
        <span class="field-hint">Wähle die Kategorie, die am besten zu deinem Goal passt</span>
      </div>

    </section>

    <!-- 
      TARGET VALUES SECTION
      Zielwerte und Messungen
    -->
    <section class="form-section">
      <h2>📊 Zielwerte</h2>
      
      <div class="form-row">
        <!-- Target Value -->
        <div class="form-group">
          <label for="target_value" class="required">Zielwert:</label>
          <input 
            type="number" 
            id="target_value" 
            name="target_value"
            bind:value={formData.target_value}
            placeholder="10"
            min="0.1"
            step="0.1"
            required
            class="form-input"
            class:error={form?.errors?.target_value}
          />
          {#if form?.errors?.target_value}
            <span class="field-error">{form.errors.target_value}</span>
          {/if}
          <span class="field-hint">Der numerische Wert, den du erreichen möchtest</span>
        </div>

        <!-- Unit -->
        <div class="form-group">
          <label for="unit" class="required">Masseinheit:</label>
          <input 
            type="text" 
            id="unit" 
            name="unit"
            bind:value={formData.unit}
            placeholder="kg, lbs, km, etc."
            required
            maxlength="20"
            class="form-input"
            class:error={form?.errors?.unit}
          />
          {#if form?.errors?.unit}
            <span class="field-error">{form.errors.unit}</span>
          {/if}
          
          <!-- Unit Suggestions basierend auf Goal Type -->
          {#if formData.goal_type && data.unitSuggestions[formData.goal_type]}
            <div class="unit-suggestions">
              <span class="suggestions-label">Vorschläge:</span>
              <div class="suggestions-buttons">
                {#each data.unitSuggestions[formData.goal_type] as unit}
                  <button 
                    type="button" 
                    class="suggestion-btn"
                    onclick={() => formData.unit = unit}
                  >
                    {unit}
                  </button>
                {/each}
              </div>
            </div>
          {/if}
        </div>
      </div>

      <!-- Target Date (Optional) -->
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
          <span class="field-error">{form.errors.target_date}</span>
        {/if}
        <span class="field-hint">Setze eine Deadline um motiviert zu bleiben (optional)</span>
      </div>

    </section>

    <!-- 
      PREVIEW SECTION
      Zeigt eine Vorschau des Goals
    -->
    {#if formData.title && formData.target_value && formData.unit}
      <section class="form-section preview-section">
        <h2>👀 Vorschau</h2>
        
        <div class="goal-preview">
          <div class="preview-header">
            <h3 class="preview-title">{formData.title}</h3>
            <span class="preview-type">
              {data.goalTypes.find(t => t.value === formData.goal_type)?.label || 'Unbekannt'}
            </span>
          </div>
          
          <div class="preview-target">
            <span class="preview-label">Zielwert:</span>
            <span class="preview-value">{formData.target_value} {formData.unit}</span>
          </div>
          
          {#if formData.target_date}
            <div class="preview-date">
              <span class="preview-label">Zieldatum:</span>
              <span class="preview-value">{new Date(formData.target_date).toLocaleDateString('de-DE')}</span>
            </div>
          {/if}
          
          {#if formData.description}
            <div class="preview-description">
              <span class="preview-label">Beschreibung:</span>
              <p class="preview-text">{formData.description}</p>
            </div>
          {/if}
          
          <!-- Progress Bar Simulation -->
          <div class="preview-progress">
            <div class="progress-info">
              <span>Fortschritt</span>
              <span>0 / {formData.target_value} {formData.unit}</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: 0%">0%</div>
            </div>
          </div>
        </div>
        
      </section>
    {/if}

    <!-- 
      FORM ACTIONS
      Submit und Cancel Buttons
    -->
    <section class="form-actions">
      <button type="submit" class="submit-btn" disabled={!formIsValid || isSubmitting}>
        {#if isSubmitting}
          🔄 Erstelle Goal...
        {:else}
          ✅ Goal erstellen
        {/if}
      </button>
      
      <a href="/goals" class="cancel-btn">
        ❌ Abbrechen
      </a>
    </section>

  </form>

</div>

<script>
  /* 
    SVELTE 5 RUNES für GOAL FORM MANAGEMENT
    Nach Exercise Create Vorbild adaptiert
  */

  // SvelteKit Imports
  import { goto } from '$app/navigation';

  // Props von Load Function (Svelte 5 Syntax)
  let { data, form } = $props();

  /* 
    SVELTE 5 STATE MANAGEMENT
    Goal Form State
  */
  
  // Basic Form Data
  let formData = $state({
    title: form?.formData?.title || '',
    description: form?.formData?.description || '',
    goal_type: form?.formData?.goal_type || data.defaults?.goal_type || '',
    target_value: form?.formData?.target_value || '',
    unit: form?.formData?.unit || '',
    target_date: form?.formData?.target_date || ''
  });

  // Form State
  let isSubmitting = $state(false);

  /* 
    DERIVED VALUES (Svelte 5)
    Berechnete Werte für Validation und Character Counts
  */
  let descriptionLength = $derived(formData.description?.length || 0);
  
  let formIsValid = $derived(
    formData.title.trim().length >= 3 &&
    formData.description.trim().length >= 10 &&
    formData.goal_type &&
    formData.target_value > 0 &&
    formData.unit.trim().length >= 1
  );

  /* 
    SVELTE 5 EFFECTS
    Side Effects für Debugging
  */
  $effect(() => {
    console.log('📝 Goal Form State:', {
      formData,
      formIsValid,
      descriptionLength
    });
  });

  // Auto-Save Draft (simuliert)
  $effect(() => {
    if (formData.title.length > 2) {
      console.log('💾 Auto-Save Goal Draft:', formData.title);
    }
  });
</script>

<style>
  /* 
    MAIN LAYOUT - Identisch zu Exercise Create
    Responsive Form-Layout mit CSS Grid
  */
  .goal-create-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }

  .page-header {
    text-align: center;
    margin-bottom: 30px;
  }
  .page-header h1 {
    color: var(--text-primary);
    margin-bottom: 10px;
  }

  .page-header p {
    color: var(--text-secondary);
    font-size: 1.1em;
  }
  /* Breadcrumb */
  .breadcrumb {
    margin-bottom: 30px;
    padding: 10px 0;
    font-size: 0.9em;
    color: var(--text-secondary);
  }

  .breadcrumb a {
    color: var(--primary);
    text-decoration: none;
  }

  .breadcrumb a:hover {
    text-decoration: underline;
  }

  .separator {
    margin: 0 10px;
    color: var(--text-muted);
  }

  .current {
    color: var(--text-primary);
    font-weight: 500;
  }
  /* 
    FORM STYLING - Identisch zu Exercise Create
  */
  .goal-form {
    background: var(--card-bg);
    border-radius: 12px;
    box-shadow: 0 4px 12px var(--shadow-color);
    overflow: hidden;
  }

  .form-section {
    padding: 30px;
    border-bottom: 1px solid var(--border-color);
  }

  .form-section:last-child {
    border-bottom: none;
  }

  .form-section h2 {
    margin: 0 0 25px 0;
    color: var(--text-primary);
    font-size: 1.4em;
    border-bottom: 2px solid var(--primary);
    padding-bottom: 10px;
  }

  /* Form Groups */
  .form-group {
    margin-bottom: 25px;
  }
  .form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: var(--text-primary);
  }

  .form-group label.required::after {
    content: " *";
    color: var(--error);
  }

  .form-input {
    width: 100%;
    padding: 12px;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    font-size: 16px;
    background-color: var(--bg-primary);
    color: var(--text-primary);
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .form-input:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 2px var(--primary-transparent, rgba(102, 126, 234, 0.2));
  }
  .form-input.error {
    border-color: var(--error);
    box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.2);
  }

  /* Form Rows */
  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  /* Field Hints and Errors */
  .field-hint {
    display: block;
    margin-top: 5px;
    font-size: 0.9em;
    color: var(--text-secondary);
  }

  .field-error {
    display: block;
    margin-top: 5px;
    font-size: 0.9em;
    color: var(--error);
    font-weight: 500;
  }
  /* Unit Suggestions */
  .unit-suggestions {
    margin-top: 10px;
  }

  .suggestions-label {
    font-size: 0.9em;
    color: var(--text-secondary);
    margin-right: 10px;
  }

  .suggestions-buttons {
    display: inline-flex;
    gap: 5px;
    flex-wrap: wrap;
  }

  .suggestion-btn {
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.8em;
    cursor: pointer;
    color: var(--text-primary);
    transition: all 0.2s;
  }

  .suggestion-btn:hover {
    background: var(--bg-tertiary);
    border-color: var(--text-muted);
  }
  /* Preview Section */
  .preview-section {
    background: var(--bg-secondary);
  }

  .goal-preview {
    background: var(--card-bg);
    border-radius: 8px;
    padding: 20px;
    border: 1px solid var(--border-color);
  }

  .preview-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }

  .preview-title {
    margin: 0;
    color: var(--text-primary);
    font-size: 1.3em;
  }

  .preview-type {
    background: var(--primary);
    color: white;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.8em;
    font-weight: 500;
  }

  .preview-target,
  .preview-date {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    padding: 8px 0;
    border-bottom: 1px solid var(--border-color);
  }

  .preview-label {
    font-weight: 500;
    color: var(--text-secondary);
  }

  .preview-value {
    color: var(--text-primary);
    font-weight: 600;
  }

  .preview-description {
    margin: 15px 0;
  }

  .preview-text {
    margin: 5px 0 0 0;
    color: var(--text-secondary);
    line-height: 1.5;
  }
  .preview-progress {
    margin-top: 20px;
  }

  .progress-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
    font-size: 0.9em;
    color: var(--text-secondary);
  }

  .progress-bar {
    height: 8px;
    background: var(--bg-tertiary);
    border-radius: 4px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: var(--primary);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7em;
    color: white;
    font-weight: bold;
  }
  /* 
    FORM ACTIONS - Identisch zu Exercise Create
  */
  .form-actions {
    padding: 30px;
    background: var(--bg-secondary);
    display: flex;
    gap: 15px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .submit-btn {
    background: var(--primary);
    color: white;
    border: none;
    padding: 15px 30px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    font-size: 1.1em;
    transition: all 0.2s;
  }
  .submit-btn:hover:not(:disabled) {
    background: var(--primary-dark, #5a67d8);
    transform: translateY(-1px);
  }

  .submit-btn:disabled {
    background: var(--text-muted);
    cursor: not-allowed;
    transform: none;
  }
  .cancel-btn {
    background: var(--text-muted);
    color: white;
    padding: 15px 30px;
    border-radius: 6px;
    text-decoration: none;
    display: inline-block;
    transition: background 0.2s;
  }

  .cancel-btn:hover {
    background: var(--text-secondary);
  }

  /* 
    BANNERS für Feedback - Identisch zu Exercise Create
  */
  .error-banner {
    background: #f8d7da;
    border: 1px solid #f5c6cb;
    color: #721c24;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
  }

  .error-banner h3 {
    margin: 0 0 10px 0;
  }

  .error-details {
    font-size: 0.9em;
    opacity: 0.8;
    margin: 5px 0;
  }

  .success-banner {
    background: #d4edda;
    border: 1px solid #c3e6cb;
    color: #155724;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
  }

  .success-banner h3 {
    margin: 0 0 10px 0;
  }

  /* 
    RESPONSIVE DESIGN
  */
  @media (max-width: 768px) {
    .goal-create-page {
      padding: 15px;
    }
    
    .form-section {
      padding: 20px;
    }
    
    .form-row {
      grid-template-columns: 1fr;
    }
    
    .preview-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }
    
    .form-actions {
      flex-direction: column;
      align-items: center;
    }
    
    .submit-btn, .cancel-btn {
      width: 100%;
      max-width: 300px;
    }
  }
</style>