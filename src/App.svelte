<script>
  import { onMount } from 'svelte';
  import { fetchBusStops } from './lib/api.js';
  import BusStopTable from './lib/BusStopTable.svelte';

  let busStops = $state([]);
  let loading = $state(true);

  onMount(async () => {
    loading = true;
    busStops = await fetchBusStops();
    loading = false;
  });
</script>

<main class="container">
  <header>
    <h1>Texas Bus Stops Data</h1>
    <p>A simple table listing official Capital Metro bus stops in Texas</p>
  </header>

  {#if loading}
    <p class="loading">Loading table data...</p>
  {:else}
    <BusStopTable {busStops} />
  {/if}
</main>

<style>
  header {
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid #0056b3;
  }

  h1 {
    color: #0056b3;
    margin-bottom: 5px;
  }

  p {
    color: #555;
    margin: 0;
  }

  .loading {
    font-size: 1.2rem;
    color: #666;
    margin-top: 40px;
  }
</style>
