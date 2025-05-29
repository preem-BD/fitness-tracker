<!-- src/routes/goals/[id]/+page.svelte - CLEAN WORKING VERSION -->

<svelte:head>
    <title>{data.goal.title} - Goal Details</title>
</svelte:head>

<script>
    import { page } from '$app/stores';
    import { enhance } from '$app/forms';
    
    let { data, form } = $props();
    
    let showUpdateForm = $state(false);
    let updateValue = $state(data.goal.current_value);
    
    // Helper Functions
    function getProgressPercentage() {
        return Math.min(Math.round((data.goal.current_value / data.goal.target_value) * 100), 100);
    }
    
    function getRemainingProgress() {
        return Math.max(data.goal.target_value - data.goal.current_value, 0);
    }
    
    function getDaysToTarget() {
        if (!data.goal.target_date) return null;
        const today = new Date();
        const targetDate = new Date(data.goal.target_date);
        return Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24));
    }
    
    function getProgressColor() {
        if (data.goal.achieved) return 'success';
        const percentage = getProgressPercentage();
        if (percentage >= 75) return 'info';
        if (percentage >= 50) return 'warning';
        return 'danger';
    }
    
    function getGoalTypeLabel(goalType) {
        const labels = {
            'weight_loss': '🏃‍♂️ Gewichtsverlust',
            'weight_gain': '💪 Gewichtszunahme',
            'muscle_gain': '🏋️ Muskelaufbau',
            'strength': '💪 Krafttraining',
            'endurance': '🏃 Ausdauer/Cardio',
            'flexibility': '🤸 Flexibilität',
            'habit': '✅ Gesunde Gewohnheit'
        };
        return labels[goalType] || '🎯 ' + (goalType || 'Allgemein');
    }
    
    function toggleUpdateForm() {
        showUpdateForm = !showUpdateForm;
        if (showUpdateForm) {
            updateValue = data.goal.current_value;
        }
    }
    
    function incrementProgress(amount) {
        updateValue = Math.max(0, updateValue + amount);
    }
</script>

<div class="goal-details-page">
    <!-- Breadcrumb -->
    <nav class="breadcrumb">
        <a href="/">🏠 Home</a>
        <span class="separator">›</span>
        <a href="/goals">🎯 Goals</a>
        <span class="separator">›</span>
        <span class="current">{data.goal.title}</span>
    </nav>

    <!-- Header -->
    <header class="page-header">
        <div class="header-content">
            <div class="title-section">
                <h1>{data.goal.title}</h1>
                {#if data.goal.achieved}
                    <span class="status-badge achieved">🏆 Goal erreicht!</span>
                {:else}
                    <span class="status-badge active">💪 In Bearbeitung</span>
                {/if}
                <div class="goal-type">
                    {getGoalTypeLabel(data.goal.goal_type)}
                </div>
            </div>
            
            <div class="header-actions">
                <button 
                    type="button"
                    class="btn btn-primary"
                    onclick={toggleUpdateForm}
                >
                    📊 Fortschritt aktualisieren
                </button>
                <a href="/goals/{data.goal._id}/edit" class="btn btn-secondary">
                    ✏️ Goal bearbeiten
                </a>
            </div>
        </div>
    </header>

    <!-- Feedback Messages -->
    {#if form?.success}
        <div class="alert alert-success">
            ✅ {form.message}
        </div>
    {/if}
    
    {#if form?.error}
        <div class="alert alert-error">
            ❌ {form.error}
        </div>
    {/if}

    <!-- Update Form -->
    {#if showUpdateForm}
        <div class="update-form-container">
            <div class="update-form">
                <h3>📊 Fortschritt aktualisieren</h3>
                
                <form method="POST" action="?/updateProgress" use:enhance>
                    <div class="form-grid">
                        <div class="form-group">
                            <label for="current_value">
                                Aktueller Wert ({data.goal.unit})
                            </label>
                            <input 
                                type="number" 
                                id="current_value"
                                name="current_value"
                                bind:value={updateValue}
                                min="0"
                                step="0.1"
                                required
                                class="form-input"
                            />
                        </div>
                        
                        <div class="quick-actions">
                            <span class="quick-label">Schnell hinzufügen:</span>
                            <div class="quick-buttons">
                                <button type="button" class="quick-btn" onclick={() => incrementProgress(1)}>+1</button>
                                <button type="button" class="quick-btn" onclick={() => incrementProgress(5)}>+5</button>
                                <button type="button" class="quick-btn" onclick={() => incrementProgress(10)}>+10</button>
                            </div>
                        </div>
                        
                        <div class="form-actions">
                            <button type="submit" class="btn btn-success">💾 Speichern</button>
                            <button type="button" class="btn btn-secondary" onclick={() => showUpdateForm = false}>❌ Abbrechen</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    {/if}

    <!-- Main Content -->
    <div class="content-grid">
        
        <!-- Progress Card -->
        <div class="card progress-card">
            <div class="card-header">
                <h2>📈 Fortschritt</h2>
            </div>
            <div class="card-body">
                
                <!-- Main Progress Display -->
                <div class="progress-display">
                    <div class="progress-info">
                        <span class="progress-label">Gesamtfortschritt</span>
                        <span class="progress-value">
                            {data.goal.current_value} / {data.goal.target_value} {data.goal.unit}
                        </span>
                    </div>
                    
                    <div class="progress-bar-container">
                        <div class="progress-bar">
                            <div 
                                class="progress-fill progress-{getProgressColor()}"
                                style="width: {getProgressPercentage()}%"
                            >
                                <span class="progress-text">
                                    {getProgressPercentage()}%
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Progress Stats -->
                    <div class="progress-stats">
                        <div class="stat-item">
                            <div class="stat-value">{getProgressPercentage()}%</div>
                            <div class="stat-label">Abgeschlossen</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">{getRemainingProgress()}</div>
                            <div class="stat-label">Verbleibend</div>
                        </div>
                        <div class="stat-item">
                            {#if getDaysToTarget() !== null}
                                {@const days = getDaysToTarget()}
                                <div class="stat-value {days < 0 ? 'overdue' : 'normal'}">
                                    {Math.abs(days)}
                                </div>
                                <div class="stat-label">
                                    {days < 0 ? 'Tage überfällig' : 'Tage verbleibend'}
                                </div>
                            {:else}
                                <div class="stat-value">-</div>
                                <div class="stat-label">Kein Goaldatum</div>
                            {/if}
                        </div>
                    </div>
                </div>
                
                <!-- Goal Description -->
                {#if data.goal.description}
                    <div class="goal-description">
                        <h3>📝 Beschreibung</h3>
                        <p>{data.goal.description}</p>
                    </div>
                {/if}
                
                <!-- Motivation Message -->
                <div class="motivation-message">
                    {#if data.goal.achieved}
                        <div class="message success">
                            🏆 <strong>Herzlichen Glückwunsch!</strong> Du hast dein Goal erreicht!
                        </div>
                    {:else if getProgressPercentage() >= 75}
                        <div class="message info">
                            🔥 <strong>Fantastisch!</strong> Du bist fast am Goal!
                        </div>
                    {:else if getProgressPercentage() >= 50}
                        <div class="message warning">
                            💪 <strong>Gute Arbeit!</strong> Du hast die Hälfte geschafft!
                        </div>
                    {:else}
                        <div class="message primary">
                            🚀 <strong>Los geht's!</strong> Jeder Schritt zählt!
                        </div>
                    {/if}
                </div>
                
            </div>
        </div>
        
        <!-- Info Card -->
        <div class="card info-card">
            <div class="card-header">
                <h2>ℹ️ Goal-Informationen</h2>
            </div>
            <div class="card-body">
                
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">Goaltyp</div>
                        <div class="info-value">{getGoalTypeLabel(data.goal.goal_type)}</div>
                    </div>
                    
                    <div class="info-item">
                        <div class="info-label">Goalwert</div>
                        <div class="info-value">{data.goal.target_value} {data.goal.unit}</div>
                    </div>
                    
                    <div class="info-item">
                        <div class="info-label">Aktueller Wert</div>
                        <div class="info-value highlight">{data.goal.current_value} {data.goal.unit}</div>
                    </div>
                    
                    {#if data.goal.target_date}
                        <div class="info-item">
                            <div class="info-label">Goaldatum</div>
                            <div class="info-value">{new Date(data.goal.target_date).toLocaleDateString('de-DE')}</div>
                        </div>
                    {/if}
                    
                    <div class="info-item">
                        <div class="info-label">Erstellt am</div>
                        <div class="info-value">{new Date(data.goal.created_at).toLocaleDateString('de-DE')}</div>
                    </div>
                </div>
                
            </div>
        </div>
        
    </div>
    
    <!-- Navigation -->
    <div class="bottom-navigation">
        <a href="/goals" class="btn btn-outline">
            ← Zurück zu Goals
        </a>
        
        <div class="nav-actions">
            <a href="/goals/{data.goal._id}/edit" class="btn btn-warning">
                ✏️ Goal bearbeiten
            </a>
            <button type="button" class="btn btn-danger" onclick={() => alert('Löschen-Feature kommt bald!')}>
                🗑️ Goal löschen
            </button>
        </div>
    </div>
</div>

<style>
    /* CLEAN GOAL DETAILS STYLING */
    .goal-details-page {
        max-width: 1000px;
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
        margin-bottom: 30px;
    }

    .header-content {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 20px;
    }

    .title-section h1 {
        margin: 0 0 10px 0;
        color: #333;
        font-size: 2rem;
    }

    .status-badge {
        display: inline-block;
        padding: 6px 16px;
        border-radius: 20px;
        font-size: 0.9em;
        font-weight: bold;
        margin-bottom: 10px;
    }

    .status-badge.achieved {
        background: #d4edda;
        color: #155724;
    }

    .status-badge.active {
        background: #cce5ff;
        color: #004085;
    }

    .goal-type {
        color: #666;
        font-size: 1.1em;
    }

    .header-actions {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
    }

    /* Buttons */
    .btn {
        padding: 10px 20px;
        border: none;
        border-radius: 6px;
        font-weight: 500;
        text-decoration: none;
        cursor: pointer;
        transition: all 0.2s;
        display: inline-block;
        text-align: center;
    }

    .btn-primary { background: #667eea; color: white; }
    .btn-secondary { background: #6c757d; color: white; }
    .btn-success { background: #28a745; color: white; }
    .btn-warning { background: #ffc107; color: #212529; }
    .btn-danger { background: #dc3545; color: white; }
    .btn-outline { background: transparent; color: #667eea; border: 2px solid #667eea; }

    .btn:hover {
        transform: translateY(-1px);
        opacity: 0.9;
    }

    /* Alerts */
    .alert {
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 20px;
    }

    .alert-success {
        background: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
    }

    .alert-error {
        background: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
    }

    /* Update Form */
    .update-form-container {
        margin-bottom: 30px;
    }

    .update-form {
        background: #f8f9fa;
        padding: 25px;
        border-radius: 12px;
        border: 1px solid #e9ecef;
    }

    .update-form h3 {
        margin: 0 0 20px 0;
        color: #333;
    }

    .form-grid {
        display: grid;
        grid-template-columns: 1fr auto auto;
        gap: 20px;
        align-items: end;
    }

    .form-group label {
        display: block;
        margin-bottom: 8px;
        font-weight: 500;
        color: #333;
    }

    .form-input {
        width: 100%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 6px;
        font-size: 16px;
    }

    .quick-actions {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .quick-label {
        font-size: 0.9em;
        color: #666;
        font-weight: 500;
    }

    .quick-buttons {
        display: flex;
        gap: 5px;
    }

    .quick-btn {
        padding: 8px 12px;
        background: #e9ecef;
        border: 1px solid #ced4da;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.9em;
        transition: all 0.2s;
    }

    .quick-btn:hover {
        background: #dee2e6;
    }

    .form-actions {
        display: flex;
        gap: 10px;
    }

    /* Content Grid */
    .content-grid {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 30px;
        margin-bottom: 30px;
    }

    /* Cards */
    .card {
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        overflow: hidden;
    }

    .card-header {
        background: #f8f9fa;
        padding: 20px;
        border-bottom: 1px solid #e9ecef;
    }

    .card-header h2 {
        margin: 0;
        color: #333;
        font-size: 1.3em;
    }

    .card-body {
        padding: 25px;
    }

    /* Progress Display */
    .progress-display {
        margin-bottom: 25px;
    }

    .progress-info {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        font-weight: 600;
    }

    .progress-label {
        color: #495057;
    }

    .progress-value {
        color: #667eea;
        font-size: 1.1em;
    }

    .progress-bar-container {
        margin-bottom: 20px;
    }

    .progress-bar {
        height: 24px;
        background: #e9ecef;
        border-radius: 12px;
        overflow: hidden;
        position: relative;
    }

    .progress-fill {
        height: 100%;
        border-radius: 12px;
        transition: width 0.5s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }

    .progress-text {
        color: #000;
        font-weight: bold;
        font-size: 0.9em;
        text-shadow: 1px 1px 2px rgba(255,255,255,0.8);
    }

    .progress-success { background: linear-gradient(90deg, #28a745, #20c997); }
    .progress-info { background: linear-gradient(90deg, #17a2b8, #20c997); }
    .progress-warning { background: linear-gradient(90deg, #ffc107, #fd7e14); }
    .progress-danger { background: linear-gradient(90deg, #dc3545, #e83e8c); }

    .progress-stats {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 15px;
        text-align: center;
    }

    .stat-item {
        padding: 15px;
        background: #f8f9fa;
        border-radius: 8px;
    }

    .stat-value {
        font-size: 1.5em;
        font-weight: bold;
        color: #667eea;
        margin-bottom: 5px;
    }

    .stat-value.overdue {
        color: #dc3545;
    }

    .stat-label {
        font-size: 0.9em;
        color: #666;
    }

    /* Goal Description */
    .goal-description {
        margin-bottom: 25px;
    }

    .goal-description h3 {
        margin: 0 0 10px 0;
        color: #333;
        font-size: 1.1em;
    }

    .goal-description p {
        color: #555;
        line-height: 1.6;
        margin: 0;
    }

    /* Motivation Message */
    .motivation-message {
        text-align: center;
    }

    .message {
        padding: 15px;
        border-radius: 8px;
        font-size: 1.1em;
    }

    .message.success { background: #d4edda; color: #155724; }
    .message.info { background: #d1ecf1; color: #0c5460; }
    .message.warning { background: #fff3cd; color: #856404; }
    .message.primary { background: #cce5ff; color: #004085; }

    /* Info Grid */
    .info-grid {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .info-item {
        padding-bottom: 15px;
        border-bottom: 1px solid #f8f9fa;
    }

    .info-item:last-child {
        border-bottom: none;
        padding-bottom: 0;
    }

    .info-label {
        font-weight: 600;
        color: #666;
        margin-bottom: 5px;
        font-size: 0.9em;
    }

    .info-value {
        color: #333;
        font-size: 1.1em;
    }

    .info-value.highlight {
        color: #667eea;
        font-weight: bold;
    }

    /* Bottom Navigation */
    .bottom-navigation {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 30px;
        border-top: 1px solid #e9ecef;
    }

    .nav-actions {
        display: flex;
        gap: 10px;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        .goal-details-page {
            padding: 15px;
        }
        
        .header-content {
            flex-direction: column;
            align-items: flex-start;
        }
        
        .content-grid {
            grid-template-columns: 1fr;
            gap: 20px;
        }
        
        .form-grid {
            grid-template-columns: 1fr;
        }
        
        .progress-stats {
            grid-template-columns: 1fr;
        }
        
        .bottom-navigation {
            flex-direction: column;
            gap: 15px;
            align-items: stretch;
        }
        
        .nav-actions {
            justify-content: center;
        }
    }
</style>