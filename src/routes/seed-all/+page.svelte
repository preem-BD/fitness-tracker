<h1>🌱 Quick Seed</h1>

{#if data.success}
  <p style="color: green;">✅ {data.message}</p>
  <a href="/workouts">→ Zur Workout-Liste</a>
{:else}
  <p style="color: red;">❌ {data.error}</p>
{/if}

<script>
  let { data } = $props();
</script>