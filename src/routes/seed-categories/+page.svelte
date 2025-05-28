<h1>📁 Categories Seeding</h1>
{#if data.success}
  <p style="color: green;">✅ {data.message}</p>
  <a href="/exercises/create">→ Exercise erstellen</a>
{:else}
  <p style="color: red;">❌ {data.error}</p>
{/if}

<script>let { data } = $props();</script>