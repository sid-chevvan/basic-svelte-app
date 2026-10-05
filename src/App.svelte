<script>
  import { onMount } from 'svelte';
  import { fetchBreweries } from './lib/api.js';
  import BreweryTable from './lib/BreweryTable.svelte';
  import BreweryDetail from './lib/BreweryDetail.svelte';

  let breweries = $state([]);
  let loading = $state(true);
  let selectedBreweryId = $state(null);

  onMount(async () => {
    loading = true;
    breweries = await fetchBreweries();
    loading = false;
  });

  function handleSelect(id) {
    selectedBreweryId = id;
    window.scrollTo(0, 0);
  }

  function handleBack() {
    selectedBreweryId = null;
  }
</script>

<main class="container">
  <header>
    <h1>Texas Breweries Directory</h1>
    <p>A simple list of breweries in the State of Texas</p>
  </header>

  {#if selectedBreweryId}
    <BreweryDetail breweryId={selectedBreweryId} onBack={handleBack} />
  {:else if loading}
    <p class="loading">Loading table data...</p>
  {:else}
    <BreweryTable {breweries} onSelect={handleSelect} />
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
