mapboxgl.accessToken = 'pk.eyJ1IjoiZW1tZXR0eW91bmciLCJhIjoiY21rNGI3Y3Z4MDV3ZjNrcHk2MXFrYTlpeSJ9.nhnMjjZj_o1eyXtp_Y8Svw';

const map = new mapboxgl.Map({
    container: 'my-map',
    style: 'mapbox://styles/emmettyoung/cmlh2534n006s01qv686sadry',
    center: [-79.38, 43.73],
    zoom: 10,
    maxBounds: [
        [-80.110931, 43.425996],
        [-78.857117, 44.085612]
    ]
});

map.addControl(new mapboxgl.NavigationControl());
map.addControl(new mapboxgl.FullscreenControl());

const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    countries: "ca"
});

document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

document.getElementById('returnbutton').addEventListener('click', () => {
    map.flyTo({
        center: [-79.38, 43.65],
        zoom: 10,
        essential: true
    });
});



const allLayers = [
    'neighbourhoods-quantile',
    'neighbourhoods-natural',
    'neighbourhoods-equal',
    'unsuitable-quantile',
    'unsuitable-natural',
    'unsuitable-equal'
];

function showOnlyLayer(selectedId) {
    allLayers.forEach(layerId => {
        map.setLayoutProperty(
            layerId,
            'visibility',
            layerId === selectedId ? 'visible' : 'none'
        );
    });
}


map.on('load', () => {
    map.addSource('neighbourhoods', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/emmettzyoung/Lab3/main/Neighbourhoods_Clean/neighbourhoods_cleaned.geojson',
        promoteId: '_id'  // Make sure every feature has a '_id' property in your GeoJSON
    });

    map.addLayer({
        'id': 'neighbourhoods-quantile',
        'type': 'fill',
        'source': 'neighbourhoods',
        'paint': {
            'fill-color':         [
                'step', // STEP expression produces stepped results based on value pairs
                ['get', 'Med_Inc'], // GET expression retrieves property value from 'population' data field
                '#eff3ff', // Colour assigned to any values < first step
                67000.01, '#bdd7e7', // Colours assigned to values >= each step
                72000.01, '#6baed6',
                77500.01, '#3182bd',
                85000.01, '#08519c'
            ],
            'fill-opacity': 0.5,
            'fill-outline-color': 'white'
        }
    });

    map.addLayer({
        'id': 'unsuitable-quantile',
        'type': 'fill',
        'source': 'neighbourhoods',
        'paint': {
            'fill-color':         [
                'step', // STEP expression produces stepped results based on value pairs
                ['get', 'Not_suitab'], // GET expression retrieves property value from 'population' data field
                '#eff3ff', // Colour assigned to any values < first step
                380.01, '#bdd7e7', // Colours assigned to values >= each step
                595.01, '#6baed6',
                980.01, '#3182bd',
                1410.01, '#08519c'
            ],
            'fill-opacity': 0.5,
            'fill-outline-color': 'white'
        }
    });

    map.addLayer({
        'id': 'neighbourhoods-equal_interval',
        'type': 'fill',
        'source': 'neighbourhoods',
        'paint': {
            'fill-color':         [
                'step', // STEP expression produces stepped results based on value pairs
                ['get', 'Med_Inc'], // GET expression retrieves property value from 'population' data field
                '#eff3ff', // Colour assigned to any values < first step
                74400.01, '#bdd7e7', // Colours assigned to values >= each step
                96800.01, '#6baed6',
                119200.01, '#3182bd',
                141600.01, '#08519c'
            ],
            'fill-opacity': 0.5,
            'fill-outline-color': 'white'
        }
    });

    map.addLayer({
        'id': 'unsuitable-equal_interval',
        'type': 'fill',
        'source': 'neighbourhoods',
        'paint': {
            'fill-color':         [
                'step', // STEP expression produces stepped results based on value pairs
                ['get', 'Not_suitab'], // GET expression retrieves property value from 'population' data field
                '#eff3ff', // Colour assigned to any values < first step
                650.01, '#bdd7e7', // Colours assigned to values >= each step
                1245.01, '#6baed6',
                1840.01, '#3182bd',
                2435.01, '#08519c'
            ],
            'fill-opacity': 0.5,
            'fill-outline-color': 'white'
        }
    });

    map.addLayer({
        'id': 'neighbourhoods-geometric_interval',
        'type': 'fill',
        'source': 'neighbourhoods',
        'paint': {
            'fill-color':         [
                'step', // STEP expression produces stepped results based on value pairs
                ['get', 'Med_Inc'], // GET expression retrieves property value from 'population' data field
                '#eff3ff', // Colour assigned to any values < first step
                65450.521, '#bdd7e7', // Colours assigned to values >= each step
                72301.779, '#6baed6',
                85752.299, '#3182bd',
                112158.617, '#08519c'
            ],
            'fill-opacity': 0.5,
            'fill-outline-color': 'white'
        }
    });

    map.addLayer({
        'id': 'unsuitable-geometric_interval',
        'type': 'fill',
        'source': 'neighbourhoods',
        'paint': {
            'fill-color':         [
                'step', // STEP expression produces stepped results based on value pairs
                ['get', 'Not_suitab'], // GET expression retrieves property value from 'population' data field
                '#eff3ff', // Colour assigned to any values < first step
                412.280, '#bdd7e7', // Colours assigned to values >= each step
                594.266, '#6baed6',
                951.546, '#3182bd',
                1652.964, '#08519c'
            ],
            'fill-opacity': 0.5,
            'fill-outline-color': 'white'
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

    showOnlyLayer('neighbourhoods-quantile');
});

// 3) Change map layer display based on check box using setLayoutProperty method
document.getElementById('layercheck').addEventListener('change', (e) => {
    const selectedLayer = document.getElementById('layer-select').value;
    map.setLayoutProperty(
        selectedLayer,
        'visibility',
        e.target.checked ? 'visible' : 'none'
    );
});

document.getElementById('layer-select').addEventListener('change', (event) => {
    showOnlyLayer(event.target.value);
    updateLegend(event.target.value);
});