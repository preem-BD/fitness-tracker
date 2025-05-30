<!-- 
  WORKOUT ERSTELLEN FORMULAR - SVELTE 5 RUNES VERSION
  Zeigt SvelteKit Form Actions, HTML Forms und Svelte 5 Event Handling
  Form Actions sind ein wichtiges SvelteKit Konzept für Datenverarbeitung
-->

<h1>💪 Neues Workout erstellen</h1>

<!-- 
  SVELTEKIT FORM mit METHOD="POST"
  - Verwendet automatisch SvelteKit Form Actions
  - Funktioniert auch ohne JavaScript (Progressive Enhancement)
  - action="?/create" ruft die 'create' Form Action auf
-->
<form method="POST" action="?/create" class="workout-form">
  
  <!-- 
    BASIC INPUT FIELDS
    HTML5 Validierung + Svelte 5 Binding
  -->
  <div class="form-group">
    <label for="name">Workout Name:</label>
    <input 
      type="text" 
      id="name" 
      name="name" 
      bind:value={formData.name}
      placeholder="z.B. Push Day"
      required
      class="form-input"
    />
  </div>

  <div class="form-group">
    <label for="description">Beschreibung:</label>
    <textarea 
      id="description" 
      name="description"
      bind:value={formData.description}
      placeholder="Beschreibe dein Workout..."
      rows="3"
      required
      class="form-input"
    ></textarea>
  </div>

  <!-- 
    NUMBER INPUT mit Validierung
    HTML5 min/max Attribute für Validation
  -->
  <div class="form-group">
    <label for="duration">Geschätzte Dauer (Minuten):</label>
    <input 
      type="number" 
      id="duration" 
      name="duration"
      bind:value={formData.duration}
      min="10" 
      max="180"
      placeholder="45"
      required
      class="form-input"
    />
  </div>

  <!-- 
    SELECT DROPDOWN
    Vordefinierte Optionen für Schwierigkeit
  -->
  <div class="form-group">
    <label for="difficulty">Schwierigkeit:</label>
    <select 
      id="difficulty" 
      name="difficulty"
      bind:value={formData.difficulty}
      required
      class="form-input"
    >
      <option value="">Bitte wählen...</option>
      <option value="Leicht">Leicht</option>
      <option value="Mittel">Mittel</option>
      <option value="Schwer">Schwer</option>
    </select>
  </div>

  <div class="form-group">
    <label for="target_muscle">Ziel-Muskelgruppe:</label>
    <input 
      type="text" 
      id="target_muscle" 
      name="target_muscle"
      bind:value={formData.target_muscle}
      placeholder="z.B. Oberkörper, Beine, Ganzkörper"
      required
      class="form-input"
    />
  </div>

  <!-- 
    DYNAMIC EXERCISES SECTION
    Zeigt wie man Arrays in Svelte 5 verwaltet
  -->
  <div class="exercises-section">
    <h3>🏋️ Übungen hinzufügen:</h3>
    
    <!-- 
      EACH BLOCK für dynamische Übungen-Liste
      Svelte 5: Gleiche Syntax wie Svelte 4, aber mit $state() Reactivity
    -->
    {#each exercises as exercise, index}
      <div class="exercise-input-group">
        <h4>Übung {index + 1}</h4>
        
        <div class="exercise-inputs">
          <input 
            type="text" 
            placeholder="Übungsname"
            bind:value={exercise.name}
            required
            class="form-input"
          />
          
          <input 
            type="number" 
            placeholder="Sets"
            bind:value={exercise.sets}
            min="1" max="10"
            required
            class="form-input small"
          />
          
          <input 
            type="number" 
            placeholder="Reps"
            bind:value={exercise.reps}
            min="1" max="50"
            required
            class="form-input small"
          />
          
          <input 
            type="number" 
            placeholder="Pause (Sek)"
            bind:value={exercise.rest_time}
            min="30" max="300"
            required
            class="form-input small"
          />
        </div>
        
        <!-- 
          EVENT HANDLER mit Svelte 5
          onclick ersetzt on:click (neue Syntax)
        -->
        <button 
          type="button" 
          class="remove-btn"
          onclick={() => removeExercise(index)}
        >
          🗑️ Entfernen
        </button>
      </div>
    {/each}
    
    <!-- Button zum Hinzufügen neuer Übungen -->
    <button 
      type="button" 
      class="add-btn"
      onclick={addExercise}
    >
      ➕ Übung hinzufügen
    </button>
  </div>

  <!-- 
    FORM SUBMISSION BUTTONS
    Zeigt unterschiedliche Actions
  -->
  <div class="form-actions">
    <button type="submit" class="submit-btn">
      ✅ Workout erstellen
    </button>
    <a href="/workouts" class="cancel-btn">
      ❌ Abbrechen
    </a>
  </div>
</form>

<!-- 
  ERROR HANDLING
  Zeigt Validierungsfehler vom Server
-->
{#if form?.error}
  <div class="error-message">
    ⚠️ {form.error}
  </div>
{/if}

<!-- 
  SUCCESS MESSAGE  
  Zeigt Bestätigung nach erfolgreichem Submit
-->
{#if form?.success}
  <div class="success-message">
    ✅ Workout wurde erfolgreich erstellt!
  </div>
{/if}

<script>
  /* 
    SVELTE 5 RUNES für FORM STATE MANAGEMENT
    Zeigt moderne Svelte 5 Patterns für Formulare
  */

  // SvelteKit Form Actions Import
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';

  // $props() für Component Props (Ersetzt export let in Svelte 5)
  // form kommt von SvelteKit Form Actions bei Validation Errors
let { form } = $props();

  // $state() für Form-Daten (Svelte 5 Reactivity)
  let formData = $state({
    name: '',
    description: '',
    duration: 30,
    difficulty: '',
    target_muscle: ''
  });

  // $state() für dynamische Übungen-Array
  let exercises = $state([
    { name: '', sets: 3, reps: 10, rest_time: 60 }
  ]);
    /* 
    WICHTIGE SVELTE 5 ÄNDERUNGEN:
    - export let prop → let { prop } = $props()
    - let variable → let variable = $state() (für reactive Daten)
    - $: computed → let computed = $derived()
    - on:click → onclick (neue Event Handler Syntax)
  */

  /* 
    ARRAY MANIPULATION FUNCTIONS
    Zeigt wie man Arrays in Svelte 5 verändert
  */
  
  // Neue Übung hinzufügen
  function addExercise() {
    // In Svelte 5: Direkte Array-Mutation ist reactive
    exercises.push({ 
      name: '', 
      sets: 3, 
      reps: 10, 
      rest_time: 60 
    });
  }

  // Übung entfernen
  function removeExercise(index) {
    // Array.splice für Entfernung
    exercises.splice(index, 1);
  }

  /* 
    FORM ENHANCEMENT
    SvelteKit enhance() für bessere UX
  */
  function handleSubmit() {
    return enhance(({ formData }) => {
      // Übungen als JSON zum FormData hinzufügen
      formData.append('exercises', JSON.stringify(exercises));
      
      return async ({ result }) => {
        // Nach erfolgreichem Submit zur Workout-Liste
        if (result.type === 'success') {
          goto('/workouts');
        }
      };
    });
  }
</script>

<style>
  /* 
    FORM LAYOUT mit CSS GRID und FLEXBOX
    Responsive Design für verschiedene Bildschirmgrößen
  */
  .workout-form {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }

  .form-group {
    margin-bottom: 20px;
  }

  .form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    color: #333;
  }

  /* 
    INPUT STYLING
    Einheitliches Design für alle Form-Elemente
  */
  .form-input {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 16px;
    transition: border-color 0.2s;
  }

  .form-input:focus {
    outline: none;
    border-color: #ff3e00;
    box-shadow: 0 0 0 2px rgba(255, 62, 0, 0.2);
  }

  .form-input.small {
    width: auto;
    min-width: 80px;
  }

  /* 
    EXERCISES SECTION STYLING
    Layout für dynamische Übungen-Eingabe
  */
  .exercises-section {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    margin: 20px 0;
  }

  .exercise-input-group {
    background: white;
    padding: 15px;
    margin-bottom: 15px;
    border-radius: 6px;
    border: 1px solid #e9ecef;
  }

  .exercise-inputs {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 10px;
    margin-bottom: 10px;
  }

  /* 
    BUTTON STYLING
    Verschiedene Button-Typen für verschiedene Actions
  */
  .add-btn {
    background: #28a745;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
  }

  .remove-btn {
    background: #dc3545;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
  }

  .form-actions {
    display: flex;
    gap: 15px;
    justify-content: center;
    margin-top: 30px;
  }

  .submit-btn {
    background: #ff3e00;
    color: white;
    border: none;
    padding: 15px 30px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
  }

  .cancel-btn {
    background: #6c757d;
    color: white;
    padding: 15px 30px;
    border-radius: 6px;
    text-decoration: none;
    display: inline-block;
  }

  /* 
    MESSAGE STYLING
    Error und Success Messages
  */
  .error-message {
    background: #f8d7da;
    color: #721c24;
    padding: 15px;
    border-radius: 6px;
    margin: 20px 0;
    border: 1px solid #f5c6cb;
  }

  .success-message {
    background: #d4edda;
    color: #155724;
    padding: 15px;
    border-radius: 6px;
    margin: 20px 0;
    border: 1px solid #c3e6cb;
  }

  /* 
    RESPONSIVE DESIGN
    Mobile-friendly Layout
  */
  @media (max-width: 768px) {
    .exercise-inputs {
      grid-template-columns: 1fr;
    }
    
    .form-actions {
      flex-direction: column;
    }
  }
</style>