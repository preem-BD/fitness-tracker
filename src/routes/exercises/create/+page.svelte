<!-- 
  EXERCISE CREATE FORM - SVELTE 5 RUNES VERSION
  Komplexes CRUD-Formular für zweite Entitätstyp (Exercise)
  Zeigt fortgeschrittene Form-Techniken und Dynamic Arrays
-->

<svelte:head>
  <title>✏️ Neue Übung erstellen | Fitness Tracker</title>
  <meta name="description" content="Erstelle eine neue Fitness-Übung mit detaillierten Informationen und Anleitungen.">
</svelte:head>

<div class="exercise-create-page">
  
  <!-- Page Header -->
  <header class="page-header">
    <h1>✏️ Neue Exercise erstellen</h1>
    <p>Füge eine neue Übung zu deiner Exercise-Datenbank hinzu</p>
  </header>

  <!-- Breadcrumb Navigation -->
  <nav class="breadcrumb">
    <a href="/">🏠 Home</a>
    <span class="separator">›</span>
    <a href="/exercises">🏋️ Exercises</a>
    <span class="separator">›</span>
    <span class="current">Neue Exercise</span>
  </nav>

  <!-- 
    ERROR BANNER
    Zeigt Server-Validierungsfehler oder andere Probleme
  -->
  {#if form?.error}
    <div class="error-banner">
      <div class="error-content">
        <h3>⚠️ {form.error}</h3>
        {#if form.details}
          <p class="error-details">{form.details}</p>
        {/if}
        {#if form.suggestion}
          <p class="error-suggestion">{form.suggestion}</p>
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
      <h3>✅ Exercise erfolgreich erstellt!</h3>
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
    class="exercise-form"
    
  >
    
    <!-- 
      BASIC INFORMATION SECTION
      Grundlegende Exercise-Daten
    -->
    <section class="form-section">
      <h2>📝 Grundinformationen</h2>
      
      <!-- Exercise Name -->
      <div class="form-group">
        <label for="name" class="required">Exercise Name:</label>
        <input 
          type="text" 
          id="name" 
          name="name"
          bind:value={formData.name}
          placeholder="z.B. Bankdrücken, Klimmzüge..."
          required
          maxlength="100"
          class="form-input"
          class:error={form?.errors?.name}
        />
        {#if form?.errors?.name}
          <span class="field-error">{form.errors.name}</span>
        {/if}
        <span class="field-hint">Der Name sollte eindeutig und beschreibend sein</span>
      </div>

      <!-- Description -->
      <div class="form-group">
        <label for="description" class="required">Kurzbeschreibung:</label>
        <textarea 
          id="description" 
          name="description"
          bind:value={formData.description}
          placeholder="Kurze Beschreibung der Übung und ihrer Hauptwirkung..."
          required
          maxlength="500"
          rows="3"
          class="form-input"
          class:error={form?.errors?.description}
        ></textarea>
        {#if form?.errors?.description}
          <span class="field-error">{form.errors.description}</span>
        {/if}
        <span class="field-hint">{descriptionLength}/500 Zeichen</span>
      </div>

      <!-- Instructions -->
      <div class="form-group">
        <label for="instructions" class="required">Ausführungsanleitung:</label>
        <textarea 
          id="instructions" 
          name="instructions"
          bind:value={formData.instructions}
          placeholder="Detaillierte Schritt-für-Schritt Anleitung zur korrekten Ausführung..."
          required
          maxlength="1000"
          rows="5"
          class="form-input"
          class:error={form?.errors?.instructions}
        ></textarea>
        {#if form?.errors?.instructions}
          <span class="field-error">{form.errors.instructions}</span>
        {/if}
        <span class="field-hint">{instructionsLength}/1000 Zeichen</span>
      </div>

    </section>

    <!-- 
      CATEGORIZATION SECTION
      Kategorisierung und Klassifizierung
    -->
    <section class="form-section">
      <h2>🎯 Kategorisierung</h2>
      
      <div class="form-row">
        <!-- Muscle Group -->
        <div class="form-group">
          <label for="muscle_group" class="required">Primäre Muskelgruppe:</label>
          <select 
            id="muscle_group" 
            name="muscle_group"
            bind:value={formData.muscle_group}
            required
            class="form-input"
            class:error={form?.errors?.muscle_group}
          >
            <option value="">Bitte wählen...</option>
            {#each data.muscleGroups as muscleGroup}
              <option value={muscleGroup}>{muscleGroup}</option>
            {/each}
          </select>
          {#if form?.errors?.muscle_group}
            <span class="field-error">{form.errors.muscle_group}</span>
          {/if}
        </div>

        <!-- Equipment -->
        <div class="form-group">
          <label for="equipment" class="required">Benötigtes Equipment:</label>
          <select 
            id="equipment" 
            name="equipment"
            bind:value={formData.equipment}
            required
            class="form-input"
            class:error={form?.errors?.equipment}
          >
            <option value="">Bitte wählen...</option>
            {#each data.equipmentOptions as equipment}
              <option value={equipment}>{equipment}</option>
            {/each}
          </select>
          {#if form?.errors?.equipment}
            <span class="field-error">{form.errors.equipment}</span>
          {/if}
        </div>
      </div>

      <div class="form-row">
        <!-- Difficulty -->
        <div class="form-group">
          <label for="difficulty" class="required">Schwierigkeit:</label>
          <select 
            id="difficulty" 
            name="difficulty"
            bind:value={formData.difficulty}
            required
            class="form-input"
            class:error={form?.errors?.difficulty}
          >
            <option value="">Bitte wählen...</option>
            {#each data.difficultyLevels as difficulty}
              <option value={difficulty}>{difficulty}</option>
            {/each}
          </select>
          {#if form?.errors?.difficulty}
            <span class="field-error">{form.errors.difficulty}</span>
          {/if}
        </div>

        <!-- Category -->
        <div class="form-group">
          <label for="category_id" class="required">Kategorie:</label>
          <select 
            id="category_id" 
            name="category_id"
            bind:value={formData.category_id}
            required
            class="form-input"
            class:error={form?.errors?.category_id}
          >
            <option value="">Bitte wählen...</option>
            {#each data.categories as category}
              <option value={category.id}>{category.name}</option>
            {/each}
          </select>
          {#if form?.errors?.category_id}
            <span class="field-error">{form.errors.category_id}</span>
          {/if}
        </div>
      </div>

      <!-- Image URL (optional) -->
      <div class="form-group">
        <label for="image_url">Bild-URL (optional):</label>
        <input 
          type="url" 
          id="image_url" 
          name="image_url"
          bind:value={formData.image_url}
          placeholder="https://example.com/exercise-image.jpg"
          class="form-input"
          class:error={form?.errors?.image_url}
        />
        {#if form?.errors?.image_url}
          <span class="field-error">{form.errors.image_url}</span>
        {/if}
        <span class="field-hint">URL zu einem Bild der Übungsausführung</span>
      </div>

    </section>

    <!-- 
      MUSCLE DETAILS SECTION
      Detaillierte Muskel-Informationen mit Dynamic Arrays
    -->
    <section class="form-section">
      <h2>💪 Muskel-Details</h2>
      
      <!-- Primary Muscles -->
      <div class="form-group">
        <label class="required">Primäre Muskeln:</label>
        <div class="dynamic-list">
          {#each primaryMuscles as muscle, index}
            <div class="dynamic-item">
              <input 
                type="text" 
                bind:value={muscle.value}
                placeholder="z.B. Brustmuskel, Trizeps..."
                class="form-input"
                class:error={form?.errors?.[`primary_muscle_${index}`]}
              />
              <button 
                type="button" 
                class="remove-btn"
                onclick={() => removePrimaryMuscle(index)}
                disabled={primaryMuscles.length <= 1}
              >
                🗑️
              </button>
              {#if form?.errors?.[`primary_muscle_${index}`]}
                <span class="field-error">{form.errors[`primary_muscle_${index}`]}</span>
              {/if}
            </div>
          {/each}
          <button 
            type="button" 
            class="add-btn"
            onclick={addPrimaryMuscle}
          >
            ➕ Primären Muskel hinzufügen
          </button>
        </div>
        {#if form?.errors?.primary_muscles}
          <span class="field-error">{form.errors.primary_muscles}</span>
        {/if}
      </div>

      <!-- Secondary Muscles -->
      <div class="form-group">
        <label>Sekundäre Muskeln (optional):</label>
        <div class="dynamic-list">
          {#each secondaryMuscles as muscle, index}
            <div class="dynamic-item">
              <input 
                type="text" 
                bind:value={muscle.value}
                placeholder="z.B. Stabilisierende Rumpfmuskulatur..."
                class="form-input"
              />
              <button 
                type="button" 
                class="remove-btn"
                onclick={() => removeSecondaryMuscle(index)}
              >
                🗑️
              </button>
            </div>
          {/each}
          <button 
            type="button" 
            class="add-btn"
            onclick={addSecondaryMuscle}
          >
            ➕ Sekundären Muskel hinzufügen
          </button>
        </div>
      </div>

    </section>

    <!-- 
      TRAINING RECOMMENDATIONS SECTION
      Sets, Reps und Pausenzeiten
    -->
    <section class="form-section">
      <h2>🎯 Trainingsempfehlungen</h2>
      
      <div class="recommendations-grid">
        <!-- Sets Recommendations -->
        <div class="form-group">
          <label for="sets_beginner">Sets/Reps Anfänger:</label>
          <input 
            type="text" 
            id="sets_beginner" 
            name="sets_beginner"
            bind:value={formData.sets_beginner}
            placeholder="3x8-10"
            pattern="\d+x\d+-?\d*"
            class="form-input"
            class:error={form?.errors?.sets_beginner}
          />
          {#if form?.errors?.sets_beginner}
            <span class="field-error">{form.errors.sets_beginner}</span>
          {/if}
          <span class="field-hint">Format: 3x8-10 (Sets x Wiederholungen)</span>
        </div>

        <div class="form-group">
          <label for="sets_intermediate">Sets/Reps Fortgeschritten:</label>
          <input 
            type="text" 
            id="sets_intermediate" 
            name="sets_intermediate"
            bind:value={formData.sets_intermediate}
            placeholder="4x6-8"
            pattern="\d+x\d+-?\d*"
            class="form-input"
            class:error={form?.errors?.sets_intermediate}
          />
          {#if form?.errors?.sets_intermediate}
            <span class="field-error">{form.errors.sets_intermediate}</span>
          {/if}
        </div>

        <div class="form-group">
          <label for="sets_advanced">Sets/Reps Profi:</label>
          <input 
            type="text" 
            id="sets_advanced" 
            name="sets_advanced"
            bind:value={formData.sets_advanced}
            placeholder="5x4-6"
            pattern="\d+x\d+-?\d*"
            class="form-input"
            class:error={form?.errors?.sets_advanced}
          />
          {#if form?.errors?.sets_advanced}
            <span class="field-error">{form.errors.sets_advanced}</span>
          {/if}
        </div>

        <!-- Rest Time -->
        <div class="form-group">
          <label for="rest_time">Pausenzeit:</label>
          <input 
            type="text" 
            id="rest_time" 
            name="rest_time"
            bind:value={formData.rest_time}
            placeholder="60-90 Sekunden"
            class="form-input"
          />
          <span class="field-hint">z.B. "60-90 Sekunden" oder "2-3 Minuten"</span>
        </div>
      </div>

    </section>

    <!-- 
      BENEFITS SECTION
      Vorteile der Übung (Dynamic Array)
    -->
    <section class="form-section">
      <h2>✨ Vorteile</h2>
      
      <div class="form-group">
        <label>Vorteile dieser Übung:</label>
        <div class="dynamic-list">
          {#each benefits as benefit, index}
            <div class="dynamic-item">
              <input 
                type="text" 
                bind:value={benefit.value}
                placeholder="z.B. Stärkt die gesamte Brustmuskulatur..."
                class="form-input"
                class:error={form?.errors?.[`benefit_${index}`]}
              />
              <button 
                type="button" 
                class="remove-btn"
                onclick={() => removeBenefit(index)}
              >
                🗑️
              </button>
              {#if form?.errors?.[`benefit_${index}`]}
                <span class="field-error">{form.errors[`benefit_${index}`]}</span>
              {/if}
            </div>
          {/each}
          <button 
            type="button" 
            class="add-btn"
            onclick={addBenefit}
          >
            ➕ Vorteil hinzufügen
          </button>
        </div>
      </div>

    </section>

    <!-- 
      TIPS SECTION
      Ausführungstipps (Dynamic Array)
    -->
    <section class="form-section">
      <h2>💡 Ausführungstipps</h2>
      
      <div class="form-group">
        <label>Tipps für korrekte Ausführung:</label>
        <div class="dynamic-list">
          {#each tips as tip, index}
            <div class="dynamic-item">
              <input 
                type="text" 
                bind:value={tip.value}
                placeholder="z.B. Halte die Schulterblätter zusammengezogen..."
                class="form-input"
                class:error={form?.errors?.[`tip_${index}`]}
              />
              <button 
                type="button" 
                class="remove-btn"
                onclick={() => removeTip(index)}
              >
                🗑️
              </button>
              {#if form?.errors?.[`tip_${index}`]}
                <span class="field-error">{form.errors[`tip_${index}`]}</span>
              {/if}
            </div>
          {/each}
          <button 
            type="button" 
            class="add-btn"
            onclick={addTip}
          >
            ➕ Tipp hinzufügen
          </button>
        </div>
      </div>

    </section>

    <!-- 
      VARIATIONS SECTION
      Übungsvariationen (Complex Dynamic Array)
    -->
    <section class="form-section">
      <h2>🔄 Variationen</h2>
      
      <div class="form-group">
        <label>Übungsvariationen (optional):</label>
        <div class="dynamic-list">
          {#each variations as variation, index}
            <div class="variation-item">
              <div class="variation-inputs">
                <input 
                  type="text" 
                  bind:value={variation.name}
                  placeholder="Name der Variation..."
                  class="form-input"
                  class:error={form?.errors?.[`variation_${index}_name`]}
                />
                <input 
                  type="text" 
                  bind:value={variation.description}
                  placeholder="Beschreibung der Variation..."
                  class="form-input"
                  class:error={form?.errors?.[`variation_${index}_description`]}
                />
              </div>
              <button 
                type="button" 
                class="remove-btn"
                onclick={() => removeVariation(index)}
              >
                🗑️
              </button>
              {#if form?.errors?.[`variation_${index}_name`]}
                <span class="field-error">{form.errors[`variation_${index}_name`]}</span>
              {/if}
              {#if form?.errors?.[`variation_${index}_description`]}
                <span class="field-error">{form.errors[`variation_${index}_description`]}</span>
              {/if}
            </div>
          {/each}
          <button 
            type="button" 
            class="add-btn"
            onclick={addVariation}
          >
            ➕ Variation hinzufügen
          </button>
        </div>
      </div>

    </section>

    <!-- 
      FORM ACTIONS
      Submit und Cancel Buttons
    -->
    <section class="form-actions">
      <button type="submit" class="submit-btn" disabled={isSubmitting}>
        {#if isSubmitting}
          🔄 Erstelle Exercise...
        {:else}
          ✅ Exercise erstellen
        {/if}
      </button>
      
      <button type="button" class="preview-btn" onclick={previewExercise}>
        👀 Vorschau
      </button>
      
      <a href="/exercises" class="cancel-btn">
        ❌ Abbrechen
      </a>
    </section>

  </form>

</div>

<script>
  /* 
    SVELTE 5 RUNES für COMPLEX FORM MANAGEMENT
    Zeigt fortgeschrittene Form-Techniken mit Dynamic Arrays
  */

  // SvelteKit Imports
  // import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';

  // Props von Load Function (Svelte 5 Syntax)
  let { data, form } = $props();

  /* 
    SVELTE 5 STATE MANAGEMENT
    Komplexe Form-State mit verschachtelten Objekten und Arrays
  */
  
  // Basic Form Data
  let formData = $state({
    name: form?.formData?.name || '',
    description: form?.formData?.description || '',
    instructions: form?.formData?.instructions || '',
    muscle_group: form?.formData?.muscle_group || '',
    equipment: form?.formData?.equipment || '',
    difficulty: form?.formData?.difficulty || data.defaults?.difficulty || '',
    category_id: form?.formData?.category_id || data.defaults?.category_id || '',
    image_url: form?.formData?.image_url || '',
    sets_beginner: form?.formData?.sets_beginner || data.defaults?.sets_beginner || '',
    sets_intermediate: form?.formData?.sets_intermediate || data.defaults?.sets_intermediate || '',
    sets_advanced: form?.formData?.sets_advanced || data.defaults?.sets_advanced || '',
    rest_time: form?.formData?.rest_time || data.defaults?.rest_time || ''
  });

  // Dynamic Arrays für komplexe Datenstrukturen
  let primaryMuscles = $state(
    form?.formData?.primary_muscles?.map(m => ({ value: m })) || 
    [{ value: '' }]
  );

  let secondaryMuscles = $state(
    form?.formData?.secondary_muscles?.map(m => ({ value: m })) || 
    [{ value: '' }]
  );

  let benefits = $state(
    form?.formData?.benefits?.map(b => ({ value: b })) || 
    [{ value: '' }]
  );

  let tips = $state(
    form?.formData?.tips?.map(t => ({ value: t })) || 
    [{ value: '' }]
  );

  let variations = $state(
    form?.formData?.variations || 
    [{ name: '', description: '' }]
  );

  // Form State
  let isSubmitting = $state(false);

  /* 
    DERIVED VALUES (Svelte 5)
    Berechnete Werte für Character Counts etc.
  */
  let descriptionLength = $derived(formData.description?.length || 0);
  let instructionsLength = $derived(formData.instructions?.length || 0);
  
  let hasValidPrimaryMuscles = $derived(
    primaryMuscles.some(m => m.value.trim().length > 0)
  );

  let formIsValid = $derived(
    formData.name.trim().length >= 2 &&
    formData.description.trim().length >= 10 &&
    formData.instructions.trim().length >= 20 &&
    formData.muscle_group &&
    formData.equipment &&
    formData.difficulty &&
    formData.category_id &&
    hasValidPrimaryMuscles
  );

  /* 
    DYNAMIC ARRAY MANAGEMENT FUNCTIONS
    Zeigt komplexe Array-Manipulationen in Svelte 5
  */

  // Primary Muscles
  function addPrimaryMuscle() {
    primaryMuscles.push({ value: '' });
  }

  function removePrimaryMuscle(index) {
    if (primaryMuscles.length > 1) {
      primaryMuscles.splice(index, 1);
    }
  }

  // Secondary Muscles
  function addSecondaryMuscle() {
    secondaryMuscles.push({ value: '' });
  }

  function removeSecondaryMuscle(index) {
    secondaryMuscles.splice(index, 1);
  }

  // Benefits
  function addBenefit() {
    benefits.push({ value: '' });
  }

  function removeBenefit(index) {
    benefits.splice(index, 1);
  }

  // Tips
  function addTip() {
    tips.push({ value: '' });
  }

  function removeTip(index) {
    tips.splice(index, 1);
  }

  // Variations
  function addVariation() {
    variations.push({ name: '', description: '' });
  }

  function removeVariation(index) {
    variations.splice(index, 1);
  }

  /* 
    FORM INTERACTION FUNCTIONS
    Event Handlers und Form-Enhancement
  */

  // Preview Function
  function previewExercise() {
    console.log('👀 Exercise Vorschau:', {
      formData,
      primaryMuscles: primaryMuscles.map(m => m.value).filter(v => v),
      secondaryMuscles: secondaryMuscles.map(m => m.value).filter(v => v),
      benefits: benefits.map(b => b.value).filter(v => v),
      tips: tips.map(t => t.value).filter(v => v),
      variations: variations.filter(v => v.name && v.description)
    });

    // TODO: Modal mit Exercise-Vorschau öffnen
    alert('Preview-Funktion wird in einem späteren Update implementiert!');
  }

  /* 
    FORM ENHANCEMENT
    SvelteKit enhance() für bessere UX
  */
  function handleSubmit() {
    return enhance(({ formData }) => {
      isSubmitting = true;

      // Arrays als JSON zum FormData hinzufügen
      formData.append('primary_muscles', JSON.stringify(
        primaryMuscles.map(m => m.value).filter(v => v.trim())
      ));
      
      formData.append('secondary_muscles', JSON.stringify(
        secondaryMuscles.map(m => m.value).filter(v => v.trim())
      ));
      
      formData.append('benefits', JSON.stringify(
        benefits.map(b => b.value).filter(v => v.trim())
      ));
      
      formData.append('tips', JSON.stringify(
        tips.map(t => t.value).filter(v => v.trim())
      ));
      
      formData.append('variations', JSON.stringify(
        variations.filter(v => v.name.trim() && v.description.trim())
      ));

      console.log('📤 Submitting Exercise Form...');

      return async ({ result }) => {
        isSubmitting = false;

        if (result.type === 'success') {
          console.log('✅ Exercise erfolgreich erstellt');
          // Navigation erfolgt durch redirect im Server
        } else if (result.type === 'failure') {
          console.log('❌ Validation Errors:', result.data?.errors);
        }
      };
    });
  }

  /* 
    SVELTE 5 EFFECTS
    Side Effects für Debugging und Auto-Save
  */
  $effect(() => {
    console.log('📝 Exercise Form State:', {
      basicData: formData,
      arrayLengths: {
        primaryMuscles: primaryMuscles.length,
        secondaryMuscles: secondaryMuscles.length,
        benefits: benefits.length,
        tips: tips.length,
        variations: variations.length
      },
      formIsValid,
      hasValidPrimaryMuscles
    });
  });

  // Auto-Save Draft (simuliert)
  $effect(() => {
    if (formData.name.length > 2) {
      // Simuliert lokales Speichern des Entwurfs
      console.log('💾 Auto-Save Draft:', formData.name);
      // localStorage.setItem('exercise-draft', JSON.stringify({...}));
    }
  });
</script>

<style>
  /* 
    MAIN LAYOUT
    Responsive Form-Layout mit CSS Grid
  */
  .exercise-create-page {
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
    color: var(--primary-color);
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
    FORM STYLING
    Professionelles Form-Design
  */  .exercise-form {
    background: var(--bg-primary);
    border-radius: 12px;
    box-shadow: var(--shadow-md);
    overflow: hidden;
    border: 1px solid var(--border-color);
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
    border-bottom: 2px solid var(--primary-color);
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

  .label.required::after {
    content: " *";
    color: var(--danger-color);
  }

  .form-input {
    width: 100%;
    padding: 12px;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    font-size: 16px;
    transition: border-color 0.2s, box-shadow 0.2s;
    background-color: var(--bg-primary);
    color: var(--text-primary);
  }

  .form-input:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px var(--primary-transparent);
  }

  .form-input.error {
    border-color: var(--danger-color);
    box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.2);
  }

  /* Form Rows */
  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  /* Field Hints and Errors */  .field-hint {
    display: block;
    margin-top: 5px;
    font-size: 0.9em;
    color: var(--text-secondary);
  }

  .field-error {
    display: block;
    margin-top: 5px;
    font-size: 0.9em;
    color: var(--danger-color);
    font-weight: 500;
  }

  /* 
    DYNAMIC LISTS
    Styling für Add/Remove Listen
  */
  .dynamic-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .dynamic-item {
    display: flex;
    gap: 10px;
    align-items: flex-start;
  }

  .dynamic-item .form-input {
    flex: 1;
  }
  .variation-item {
    background: var(--bg-secondary);
    padding: 15px;
    border-radius: 8px;
    border: 1px solid var(--border-color);
  }

  .variation-inputs {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 10px;
    margin-bottom: 10px;
  }
  /* Buttons */
  .add-btn {
    background: var(--success-color);
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9em;
    transition: background 0.2s;
    align-self: flex-start;
  }

  .add-btn:hover {
    background: var(--success-dark);
  }

  .remove-btn {
    background: var(--danger-color);
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.8em;
    transition: background 0.2s;
    flex-shrink: 0;
  }

  .remove-btn:hover:not(:disabled) {
    background: var(--danger-dark);
  }

  .remove-btn:disabled {
    background: var(--gray-600);
    cursor: not-allowed;
  }

  /* 
    TRAINING RECOMMENDATIONS GRID
  */
  .recommendations-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
  }

  /* 
    FORM ACTIONS
    Submit Button Area
  */  .form-actions {
    padding: 30px;
    background: var(--bg-secondary);
    display: flex;
    gap: 15px;
    justify-content: center;
    flex-wrap: wrap;
    border-top: 1px solid var(--border-color);
  }

  .submit-btn {
    background: var(--primary-color);
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
    background: var(--primary-dark);
    transform: translateY(-1px);
  }

  .submit-btn:disabled {
    background: var(--gray-600);
    cursor: not-allowed;
    transform: none;
  }

  .preview-btn {
    background: var(--warning-color);
    color: white;
    border: none;
    padding: 15px 30px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    transition: background 0.2s;
  }

  .preview-btn:hover {
    background: var(--warning-dark);
  }

  .cancel-btn {
    background: var(--gray-600);
    color: white;
    padding: 15px 30px;
    border-radius: 6px;
    text-decoration: none;
    display: inline-block;
    transition: background 0.2s;
  }

  .cancel-btn:hover {
    background: var(--gray-700);
  }

  /* 
    BANNERS für Feedback
  */  .error-banner {
    background: var(--error-bg);
    border: 1px solid var(--error-light);
    color: var(--error-text);
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

  .error-suggestion {
    font-style: italic;
    margin: 10px 0 0 0;
  }

  .success-banner {
    background: var(--success-bg);
    border: 1px solid var(--success-light);
    color: var(--success-text);
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
  }

  .success-banner h3 {
    margin: 0 0 10px 0;
  }

  /* 
    RESPONSIVE DESIGN
    Mobile-optimierte Layouts
  */
  @media (max-width: 768px) {
    .exercise-create-page {
      padding: 15px;
    }
    
    .form-section {
      padding: 20px;
    }
    
    .form-row {
      grid-template-columns: 1fr;
    }
    
    .recommendations-grid {
      grid-template-columns: 1fr;
    }
    
    .variation-inputs {
      grid-template-columns: 1fr;
    }
    
    .form-actions {
      flex-direction: column;
      align-items: center;
    }
    
    .submit-btn, .preview-btn, .cancel-btn {
      width: 100%;
      max-width: 300px;
    }
  }
</style>