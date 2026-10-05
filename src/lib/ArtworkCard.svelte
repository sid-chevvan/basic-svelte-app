<script>
  let { artwork, onClick } = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="card" onclick={() => onClick(artwork.id)}>
  {#if artwork.imageUrl}
    <img src={artwork.imageUrl} alt={artwork.title} />
  {:else}
    <div class="placeholder">No image</div>
  {/if}
  <div class="card-content">
    <h3>{artwork.title}</h3>
    <p class="artist">{artwork.artist_title || 'Unknown Artist'}</p>
  </div>
</div>

<style>
  .card {
    background-color: var(--card-bg);
    border-radius: var(--border-radius);
    overflow: hidden;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    cursor: pointer;
    transition: transform 0.2s;
  }

  .card:hover {
    transform: translateY(-5px);
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .placeholder {
    width: 100%;
    height: 200px;
    background-color: #ddd;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card-content {
    padding: 15px;
  }

  h3 {
    font-size: 1.1rem;
    margin-bottom: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .artist {
    color: #666;
    margin: 0;
    font-size: 0.9rem;
  }
</style>
