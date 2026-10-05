export async function fetchBreweries() {
  try {
    const response = await fetch('https://api.openbrewerydb.org/v1/breweries?by_state=texas&per_page=50');
    if (!response.ok) throw new Error('Failed to fetch data');
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

export async function fetchBreweryDetail(id) {
  try {
    const response = await fetch(`https://api.openbrewerydb.org/v1/breweries/${id}`);
    if (!response.ok) throw new Error('Failed to fetch details');
    return await response.json();
  } catch (error) {
    console.error(`Error fetching details for ${id}:`, error);
    return null;
  }
}
