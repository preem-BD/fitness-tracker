<script>
    let { data } = $props();
</script>

<div class="container mt-4">
    <h1>🔍 Simple Goals Debug</h1>
    
    {#if data.success}
        <div class="alert alert-success">
            ✅ {data.message}
        </div>
        
        <h3>Collections in Database:</h3>
        <ul>
            {#each data.collections as collection}
                <li>{collection}</li>
            {/each}
        </ul>
        
        <h3>Goals Found ({data.rawCount}):</h3>
        {#if data.goals.length > 0}
            {#each data.goals as goal}
                <div class="card mb-2">
                    <div class="card-body">
                        <h5>{goal.title}</h5>
                        <p>Type: {goal.goal_type}</p>
                        <p>Target: {goal.target_value} {goal.unit}</p>
                        <p>Current: {goal.current_value}</p>
                        <p>Achieved: {goal.achieved}</p>
                        <small>Created: {goal.created_at}</small>
                    </div>
                </div>
            {/each}
        {:else}
            <p>Keine Goals gefunden!</p>
        {/if}
        
    {:else}
        <div class="alert alert-danger">
            ❌ Error: {data.error}
        </div>
        
        {#if data.stack}
            <pre class="bg-light p-3">{data.stack}</pre>
        {/if}
    {/if}
</div>