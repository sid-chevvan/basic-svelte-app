export async function fetchBusStops() {
  try {
    // We fetch from the static JSON file containing the actual CapMetro Texas bus stops
    const response = await fetch('/stops.json');
    if (!response.ok) throw new Error('Failed to fetch data');
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}
