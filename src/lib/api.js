const API_BASE_URL = 'https://api.artic.edu/api/v1';

export async function fetchArtworks(page = 1, limit = 12) {
  try {
    // Use the search endpoint to only get public domain artworks, which guarantees the images are loadable
    const response = await fetch(
      `${API_BASE_URL}/artworks/search?query[term][is_public_domain]=true&page=${page}&limit=${limit}&fields=id,title,image_id,artist_title,date_display,medium_display`
    );
    if (!response.ok) throw new Error('Failed to fetch artworks');
    const data = await response.json();
    
    // Filter out any potential artworks without images just in case
    const artworks = data.data.filter(art => art.image_id).map(art => ({
      ...art,
      imageUrl: `https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`
    }));
    
    return {
      artworks,
      pagination: data.pagination
    };
  } catch (error) {
    console.error('Error fetching artworks:', error);
    return { artworks: [], pagination: null };
  }
}

export async function fetchArtworkDetails(id) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/artworks/${id}?fields=id,title,image_id,artist_title,date_display,medium_display,description,dimensions,credit_line`
    );
    if (!response.ok) throw new Error('Failed to fetch artwork details');
    const data = await response.json();
    
    return {
      ...data.data,
      imageUrl: data.data.image_id 
        ? `https://www.artic.edu/iiif/2/${data.data.image_id}/full/843,/0/default.jpg`
        : null
    };
  } catch (error) {
    console.error(`Error fetching artwork ${id}:`, error);
    return null;
  }
}
