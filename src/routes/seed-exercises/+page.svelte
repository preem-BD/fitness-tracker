<h1>🏋️ Exercise Seeding</h1>
{#if data.success}
  <p style="color: green;">✅ {data.message}</p>
  <a href="/exercises">→ Zu den Exercises</a>
{/if}

<script>let { data } = $props();</script>