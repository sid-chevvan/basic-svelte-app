<script>
  import { onMount } from 'svelte';
  import { fetchArtworks } from './lib/api.js';
  import GalleryList from './lib/GalleryList.svelte';
  import ArtworkDetail from './lib/ArtworkDetail.svelte';

  let artworks = $state([]);
  let loading = $state(true);
  let loadingMore = $state(false);
  let page = $state(1);
  let selectedArtworkId = $state(null);

  async function loadInitial() {
    loading = true;
    const data = await fetchArtworks(1);
    artworks = data.artworks;
    loading = false;
  }

  async function loadMore() {
    loadingMore = true;
    page += 1;
    const data = await fetchArtworks(page);
    artworks = [...artworks, ...data.artworks];
    loadingMore = false;
  }

  onMount(() => {
    loadInitial();
  });

  function handleSelect(id) {
    selectedArtworkId = id;
    window.scrollTo(0, 0);
  }

  function handleBack() {
    selectedArtworkId = null;
  }
</script>

<main class="container">
  <header>
    <h1>Art Explorer</h1>
    <p>Viewing data from the Art Institute of Chicago API</p>
  </header>

  {#if selectedArtworkId}
    <ArtworkDetail artworkId={selectedArtworkId} onBack={handleBack} />
  {:else}
    <GalleryList 
      {artworks} 
      {loading} 
      onSelectArtwork={handleSelect}
      {loadMore}
      {loadingMore}
    />
  {/if}
</main>

<style>
  header {
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid #ddd;
  }

  h1 {
    color: var(--primary-color);
    margin-bottom: 5px;
  }

  p {
    color: #666;
    margin: 0;
  }
</style>
