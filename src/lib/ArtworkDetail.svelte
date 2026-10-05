<script>
  import { onMount } from 'svelte';
  import { fetchArtworkDetails } from './api.js';

  let { artworkId, onBack } = $props();

  let artwork = $state(null);
  let loading = $state(true);
  let error = $state(null);

  onMount(async () => {
    loading = true;
    try {
      artwork = await fetchArtworkDetails(artworkId);
      if (!artwork) {
        error = "Artwork not found";
      }
    } catch (err) {
      error = "Failed to load artwork details.";
    } finally {
      loading = false;
    }
  });
</script>

<div>
  <button class="back-btn" onclick={onBack}>&larr; Back to Gallery</button>

  {#if loading}
    <p>Loading details...</p>
  {:else if error}
    <p class="error">{error}</p>
  {:else if artwork}
    <div class="detail-container">
      <div class="image-section">
        {#if artwork.imageUrl}
          <img src={artwork.imageUrl} alt={artwork.title} />
        {:else}
          <div class="no-image">No Image Available</div>
        {/if}
      </div>
      
      <div class="info-section">
        <h2>{artwork.title}</h2>
        <p><strong>Artist:</strong> {artwork.artist_title || 'Unknown'}</p>
        
        {#if artwork.date_display}
          <p><strong>Date:</strong> {artwork.date_display}</p>
        {/if}

        {#if artwork.medium_display}
          <p><strong>Medium:</strong> {artwork.medium_display}</p>
        {/if}

        {#if artwork.dimensions}
          <p><strong>Dimensions:</strong> {artwork.dimensions}</p>
        {/if}

        {#if artwork.description}
          <div class="description">
            <h3>About this piece</h3>
            <div>{@html artwork.description}</div>
          </div>
        {/if}
      </div>
    </div>
  {/if}
</div>

<style>
  .back-btn {
    margin-bottom: 20px;
    background-color: transparent;
    color: var(--primary-color);
    border: 1px solid var(--primary-color);
  }

  .back-btn:hover {
    background-color: #f0f8ff;
  }

  .detail-container {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    background: var(--card-bg);
    padding: 20px;
    border-radius: var(--border-radius);
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }

  .image-section {
    flex: 1;
    min-width: 300px;
  }

  .image-section img {
    max-width: 100%;
    height: auto;
    border-radius: var(--border-radius);
  }

  .info-section {
    flex: 1;
    min-width: 300px;
  }

  .error {
    color: red;
  }

  .no-image {
    padding: 50px;
    background: #eee;
    text-align: center;
  }

  .description {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #eee;
  }
</style>
