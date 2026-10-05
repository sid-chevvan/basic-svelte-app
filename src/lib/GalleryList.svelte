<script>
  import ArtworkCard from './ArtworkCard.svelte';
  
  let { artworks, loading, onSelectArtwork, loadMore, loadingMore } = $props();
</script>

<div>
  {#if loading && artworks.length === 0}
    <p class="loading">Loading artworks...</p>
  {:else}
    <div class="grid">
      {#each artworks as artwork (artwork.id)}
        <ArtworkCard {artwork} onClick={onSelectArtwork} />
      {/each}
    </div>
    
    <div class="actions">
      <button onclick={loadMore} disabled={loadingMore}>
        {loadingMore ? 'Loading...' : 'Load More'}
      </button>
    </div>
  {/if}
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
  }

  .loading {
    text-align: center;
    font-size: 1.2rem;
    margin: 50px 0;
  }

  .actions {
    text-align: center;
    margin-bottom: 40px;
  }
</style>
