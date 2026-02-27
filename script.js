// Access token for Mapbox API
mapboxgl.accessToken = 'pk.eyJ1IjoiZW1tZXR0eW91bmciLCJhIjoiY21rNGI3Y3Z4MDV3ZjNrcHk2MXFrYTlpeSJ9.nhnMjjZj_o1eyXtp_Y8Svw';

// Initialize the map to a const variable so that it cannot be reassigned later on in the code
const map = new mapboxgl.Map({
    container: 'my-map',
    style: 'mapbox://styles/emmettyoung/cmlh2534n006s01qv686sadry',
    center: [-79.38, 43.65],
    zoom: 12,
    maxBounds: [
        [-80.110931, 43.425996],
        [-78.857117, 44.085612]],
});

// Add geocoder control to the map with a bounding box that limits search results to Toronto
map.addControl(
    new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        region: 'Ontario',
        placeholder: 'Search for a location in Toronto',
        bbox: [-79.6393, 43.5810, -79.1158, 43.8554]
    })
);

// Add zoom and rotation controls to the map
map.addControl(new mapboxgl.NavigationControl());

// Load the GeoJSON data for the ice rinks (both indoor and outdoor) and the neighbourhoods, and add them as 
// sources and layers to the map
map.on('load', () => {
    // Add sources for the neighbourhoods and ice rinks, promoting the _id property to be used as a unique 
    // identifier for each feature
    map.addSource('neighbourhoods', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/emmettzyoung/Lab3/main/Neighbourhoods_Clean/neighbourhoods_cleaned.geojson',
        promoteId: '_id'
    });
        // Add layers for the neighbourhoods and ice rinks, using the feature state to change the opacity 
    // and size of the features when they are hovered over
    map.addLayer({
        'id': 'neighbourhoods-fill',
        'type': 'fill',
        'source': 'neighbourhoods',
        'paint': {
            'fill-color': '#FFC4C4',
            'fill-opacity': 1
        }
    });
    map.addLayer({
        'id': 'neighbourhoods-outline',
        'type': 'line',
        'source': 'neighbourhoods',
        'paint': {
            'line-color': '#000000',
            'line-width': 1
        }
    });
});