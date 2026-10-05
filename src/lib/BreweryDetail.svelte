<script>
  import { onMount } from 'svelte';
  import { fetchBreweryDetail } from './api.js';

  let { breweryId, onBack } = $props();

  let brewery = $state(null);
  let loading = $state(true);

  onMount(async () => {
    loading = true;
    brewery = await fetchBreweryDetail(breweryId);
    loading = false;
  });
</script>

<div class="detail-view">
  <button class="back-btn" onclick={onBack}>&larr; Back to List</button>

  {#if loading}
    <p>Loading details...</p>
  {:else if brewery}
    <div class="card">
      <h2>{brewery.name}</h2>
      
      <ul>
        <li><strong>Type:</strong> {brewery.brewery_type}</li>
        <li><strong>Address:</strong> {brewery.street || 'N/A'}, {brewery.city}, {brewery.state} {brewery.postal_code}</li>
        <li><strong>Phone:</strong> {brewery.phone || 'N/A'}</li>
        <li>
          <strong>Website:</strong> 
          {#if brewery.website_url}
            <a href={brewery.website_url} target="_blank" rel="noreferrer">{brewery.website_url}</a>
          {:else}
            N/A
          {/if}
        </li>
      </ul>
    </div>
  {:else}
    <p>Failed to load brewery details.</p>
  {/if}
</div>

<style>
  .detail-view {
    max-width: 600px;
    margin: 0 auto;
  }

  .back-btn {
    margin-bottom: 20px;
    background-color: #eee;
    color: #333;
    border: 1px solid #ccc;
    padding: 8px 16px;
    cursor: pointer;
    border-radius: 4px;
  }

  .back-btn:hover {
    background-color: #e0e0e0;
  }

  .card {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    border: 1px solid #eee;
  }

  h2 {
    margin-top: 0;
    color: #0056b3;
    border-bottom: 2px solid #eee;
    padding-bottom: 10px;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 15px;
    font-size: 1.1rem;
  }

  a {
    color: #0056b3;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
</style>
