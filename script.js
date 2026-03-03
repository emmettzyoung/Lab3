// Get access token from Mapbox and set it to a variable.
mapboxgl.accessToken = 'pk.eyJ1IjoiZW1tZXR0eW91bmciLCJhIjoiY21rNGI3Y3Z4MDV3ZjNrcHk2MXFrYTlpeSJ9.nhnMjjZj_o1eyXtp_Y8Svw';

/*--------------------------------------------------------------------
INITIALISE MAP
--------------------------------------------------------------------*/

// Initialize the map to a const variable so that it cannot be reassigned later on in the code.
const map = new mapboxgl.Map({
    container: 'my-map',
    style: 'mapbox://styles/emmettyoung/cmlh2534n006s01qv686sadry',
    center: [-79.380754, 43.711979],
    zoom: 10,
    maxBounds: [
        [-80.110931, 43.425996],
        [-78.857117, 44.085612]
    ]
});

/*--------------------------------------------------------------------
ADD CONTROLS, INTERACTIVITY, AND GEOCODER
--------------------------------------------------------------------*/

// Add navigation and fullscreen controls to the map.
map.addControl(new mapboxgl.NavigationControl());
map.addControl(new mapboxgl.FullscreenControl());

// Add geocoder control to the map, which allows users to search for locations in the GTA
const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    region: "Ontario",
    placeholder: 'Search for a location in GTA',
    bbox: [-79.6393, 43.5810, -79.1158, 43.8554]
});

// Append the geocoder control to the div with id 'geocoder' in the HTML file, so that it appears on the map.
document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

// Add event listener to the return button, which flies the map back to the original center and zoom level when clicked.
document.getElementById('returnbutton').addEventListener('click', () => {
    map.flyTo({
        center: [-79.380754, 43.711979],
        zoom: 10,
        essential: true
    });
});

/*--------------------------------------------------------------------
DEFINE LAYERS TO LATER SWITCH BETWEEN THEM
--------------------------------------------------------------------*/

// Define an array of all layer IDs to manage their visibility when a user selects a different layer from the dropdown menu.
const allLayers = [
    'neighbourhoods-quantile',
    'neighbourhoods-equal-interval',
    'neighbourhoods-geometric-interval',
    'unsuitable-quantile',
    'unsuitable-equal-interval',
    'unsuitable-geometric-interval'
];

/*--------------------------------------------------------------------
ONLY SHOW ONE LAYER AT A TIME FUNCTION IF CHECK BOX IS CHECKED
--------------------------------------------------------------------*/

// Function to show only the selected layer and hide all other layers by setting their visibility property using the setLayoutProperty method.
function showOnlyLayer(selectedId) {
    const isChecked = document.getElementById('layercheck').checked;
    allLayers.forEach(layerId => {
        map.setLayoutProperty(
            layerId,
            'visibility',
            // Only show the selected layer if the checkbox is also checked
            (layerId === selectedId && isChecked) ? 'visible' : 'none'
        );
    });
}

/*--------------------------------------------------------------------
LOAD GEOJSON DATA, ADD LAYERS TO MAP, AND ADD LEGEND FOR NEIGHBOURHOODS-QUANTILE LAYER BY DEFAULT
--------------------------------------------------------------------*/

// Add event listener to the map's 'load' event, which is triggered when the map has finished loading. This is where we add our GeoJSON data source and define the layers to visualize the data on the map.
map.on('load', () => {
    map.addSource('neighbourhoods', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/emmettzyoung/Lab3/main/Neighbourhoods_Clean/neighbourhoods_cleaned.geojson',
        promoteId: 'Neighb'
    });

    // Add all layers (three for income and three for unsuitable housing) to the map, each with a different color scheme based on the classification method used (quantile, equal interval, or geometric interval). The fill-color property uses a STEP expression to assign colors based on the values of the 'Med_Inc' and 'Not_suitab' properties in the GeoJSON data.
    map.addLayer({
        'id': 'neighbourhoods-quantile',
        'type': 'fill',
        'source': 'neighbourhoods',
        'paint': {
            'fill-color': [
                'step', // STEP expression produces stepped results based on value pairs
                ['get', 'Med_Inc'], // GET expression retrieves property value from 'population' data field
                '#eff3ff', // Colour assigned to any values < first step
                67000.01, '#bdd7e7', // Colours assigned to values >= each step
                72000.01, '#6baed6',
                77500.01, '#3182bd',
                85000.01, '#08519c'
            ],
            'fill-opacity': 1,
            'fill-outline-color': 'white'
        }
    });

    map.addLayer({
        'id': 'unsuitable-quantile',
        'type': 'fill',
        'source': 'neighbourhoods',
        'paint': {
            'fill-color': [
                'step', // STEP expression produces stepped results based on value pairs
                ['get', 'Not_suitab'], // GET expression retrieves property value from 'population' data field
                '#eff3ff', // Colour assigned to any values < first step
                380.01, '#bdd7e7', // Colours assigned to values >= each step
                595.01, '#6baed6',
                980.01, '#3182bd',
                1410.01, '#08519c'
            ],
            'fill-opacity': 1,
            'fill-outline-color': 'white'
        }
    });

    map.addLayer({
        'id': 'neighbourhoods-equal-interval',
        'type': 'fill',
        'source': 'neighbourhoods',
        'paint': {
            'fill-color': [
                'step', // STEP expression produces stepped results based on value pairs
                ['get', 'Med_Inc'], // GET expression retrieves property value from 'population' data field
                '#eff3ff', // Colour assigned to any values < first step
                74400.01, '#bdd7e7', // Colours assigned to values >= each step
                96800.01, '#6baed6',
                119200.01, '#3182bd',
                141600.01, '#08519c'
            ],
            'fill-opacity': 1,
            'fill-outline-color': 'white'
        }
    });

    map.addLayer({
        'id': 'unsuitable-equal-interval',
        'type': 'fill',
        'source': 'neighbourhoods',
        'paint': {
            'fill-color': [
                'step', // STEP expression produces stepped results based on value pairs
                ['get', 'Not_suitab'], // GET expression retrieves property value from 'population' data field
                '#eff3ff', // Colour assigned to any values < first step
                650.01, '#bdd7e7', // Colours assigned to values >= each step
                1245.01, '#6baed6',
                1840.01, '#3182bd',
                2435.01, '#08519c'
            ],
            'fill-opacity': 1,
            'fill-outline-color': 'white'
        }
    });

    map.addLayer({
        'id': 'neighbourhoods-geometric-interval',
        'type': 'fill',
        'source': 'neighbourhoods',
        'paint': {
            'fill-color': [
                'step', // STEP expression produces stepped results based on value pairs
                ['get', 'Med_Inc'], // GET expression retrieves property value from 'population' data field
                '#eff3ff', // Colour assigned to any values < first step
                65450.521, '#bdd7e7', // Colours assigned to values >= each step
                72301.779, '#6baed6',
                85752.299, '#3182bd',
                112158.617, '#08519c'
            ],
            'fill-opacity': 1,
            'fill-outline-color': 'white'
        }
    });

    map.addLayer({
        'id': 'unsuitable-geometric-interval',
        'type': 'fill',
        'source': 'neighbourhoods',
        'paint': {
            'fill-color': [
                'step', // STEP expression produces stepped results based on value pairs
                ['get', 'Not_suitab'], // GET expression retrieves property value from 'population' data field
                '#eff3ff', // Colour assigned to any values < first step
                412.280, '#bdd7e7', // Colours assigned to values >= each step
                594.266, '#6baed6',
                951.546, '#3182bd',
                1652.964, '#08519c'
            ],
            'fill-opacity': 1,
            'fill-outline-color': 'white'
        }
    });

    map.addLayer({
        'id': 'neighbourhoods-hover-outline',
        'type': 'line',
        'source': 'neighbourhoods',
        'paint': {
            'line-color': '#ffffff',
            'line-width': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                3,   // thick white border on hover
                0    // invisible otherwise
            ]
        }
    });

    // This final layer should always be visible, and always just show the outlines of the neighbourhoods.
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
    updateLegend('neighbourhoods-quantile'); // populate legend on load
});

/*--------------------------------------------------------------------
EVENT LISTENERS
--------------------------------------------------------------------*/

// Add an event listener that changes the layer displayed based on check box using setLayoutProperty method.
document.getElementById('layercheck').addEventListener('change', (e) => {
    const selectedLayer = document.getElementById('layer-select').value;
    map.setLayoutProperty(
        selectedLayer,
        'visibility',
        e.target.checked ? 'visible' : 'none'
    );
});

// Add an event listener that changes the layer displayed based on the dropdown menu selection using setLayoutProperty method and also updates the legend to match the selected layer.
document.getElementById('layer-select').addEventListener('change', (event) => {
    showOnlyLayer(event.target.value);
    updateLegend(event.target.value);
});

document.getElementById('legendcheck').addEventListener('change', (e) => {
    const legend = document.getElementById('legend');
    legend.style.display = e.target.checked ? 'block' : 'none';
});

/*--------------------------------------------------------------------
HOVER EFFECTS AND POPUPS
--------------------------------------------------------------------*/

// Assign variables to keep track of the currently hovered neighbourhood, so that we can reset their feature state when the mouse leaves them
let hoveredNeighbourhoodId = null;

// Neighbourhood hover for each layer (neighbourhoods-quantile here). 
map.on('mousemove', 'neighbourhoods-quantile', (e) => {
    if (e.features.length > 0) {
        if (hoveredNeighbourhoodId !== null) {
            map.setFeatureState(
                { source: 'neighbourhoods', id: hoveredNeighbourhoodId },
                { hover: false }
            );
        }
        hoveredNeighbourhoodId = e.features[0].id;
        map.setFeatureState(
            { source: 'neighbourhoods', id: hoveredNeighbourhoodId },
            { hover: true }
        );
    }
});

map.on('mouseleave', 'neighbourhoods-quantile', () => {
    if (hoveredNeighbourhoodId !== null) {
        map.setFeatureState(
            { source: 'neighbourhoods', id: hoveredNeighbourhoodId },
            { hover: false }
        );
    }
    hoveredNeighbourhoodId = null;
});

// Neighbourhood hover for each layer (neighbourhoods-geometric-interval here).
map.on('mousemove', 'neighbourhoods-geometric-interval', (e) => {
    if (e.features.length > 0) {
        if (hoveredNeighbourhoodId !== null) {
            map.setFeatureState(
                { source: 'neighbourhoods', id: hoveredNeighbourhoodId },
                { hover: false }
            );
        }
        hoveredNeighbourhoodId = e.features[0].id;
        map.setFeatureState(
            { source: 'neighbourhoods', id: hoveredNeighbourhoodId },
            { hover: true }
        );
    }
});

map.on('mouseleave', 'neighbourhoods-geometric-interval', () => {
    if (hoveredNeighbourhoodId !== null) {
        map.setFeatureState(
            { source: 'neighbourhoods', id: hoveredNeighbourhoodId },
            { hover: false }
        );
    }
    hoveredNeighbourhoodId = null;
});

// Neighbourhood hover for each layer (neighbourhoods-equal-interval here).
map.on('mousemove', 'neighbourhoods-equal-interval', (e) => {
    if (e.features.length > 0) {
        if (hoveredNeighbourhoodId !== null) {
            map.setFeatureState(
                { source: 'neighbourhoods', id: hoveredNeighbourhoodId },
                { hover: false }
            );
        }
        hoveredNeighbourhoodId = e.features[0].id;
        map.setFeatureState(
            { source: 'neighbourhoods', id: hoveredNeighbourhoodId },
            { hover: true }
        );
    }
});

map.on('mouseleave', 'neighbourhoods-equal-interval', () => {
    if (hoveredNeighbourhoodId !== null) {
        map.setFeatureState(
            { source: 'neighbourhoods', id: hoveredNeighbourhoodId },
            { hover: false }
        );
    }
    hoveredNeighbourhoodId = null;
});

// Neighbourhood hover for each layer (unsuitable-quantile here).
map.on('mousemove', 'unsuitable-quantile', (e) => {
    if (e.features.length > 0) {
        if (hoveredNeighbourhoodId !== null) {
            map.setFeatureState(
                { source: 'neighbourhoods', id: hoveredNeighbourhoodId },
                { hover: false }
            );
        }
        hoveredNeighbourhoodId = e.features[0].id;
        map.setFeatureState(
            { source: 'neighbourhoods', id: hoveredNeighbourhoodId },
            { hover: true }
        );
    }
});

map.on('mouseleave', 'unsuitable-quantile', () => {
    if (hoveredNeighbourhoodId !== null) {
        map.setFeatureState(
            { source: 'neighbourhoods', id: hoveredNeighbourhoodId },
            { hover: false }
        );
    }
    hoveredNeighbourhoodId = null;
});

// Neighbourhood hover for each layer (unsuitable-geometric-interval here).
map.on('mousemove', 'unsuitable-geometric-interval', (e) => {
    if (e.features.length > 0) {
        if (hoveredNeighbourhoodId !== null) {
            map.setFeatureState(
                { source: 'neighbourhoods', id: hoveredNeighbourhoodId },
                { hover: false }
            );
        }
        hoveredNeighbourhoodId = e.features[0].id;
        map.setFeatureState(
            { source: 'neighbourhoods', id: hoveredNeighbourhoodId },
            { hover: true }
        );
    }
});

map.on('mouseleave', 'unsuitable-geometric-interval', () => {
    if (hoveredNeighbourhoodId !== null) {
        map.setFeatureState(
            { source: 'neighbourhoods', id: hoveredNeighbourhoodId },
            { hover: false }
        );
    }
    hoveredNeighbourhoodId = null;
});

// Neighbourhood hover for each layer (unsuitable-equal-interval here).
map.on('mousemove', 'unsuitable-equal-interval', (e) => {
    if (e.features.length > 0) {
        if (hoveredNeighbourhoodId !== null) {
            map.setFeatureState(
                { source: 'neighbourhoods', id: hoveredNeighbourhoodId },
                { hover: false }
            );
        }
        hoveredNeighbourhoodId = e.features[0].id;
        map.setFeatureState(
            { source: 'neighbourhoods', id: hoveredNeighbourhoodId },
            { hover: true }
        );
    }
});

map.on('mouseleave', 'unsuitable-equal-interval', () => {
    if (hoveredNeighbourhoodId !== null) {
        map.setFeatureState(
            { source: 'neighbourhoods', id: hoveredNeighbourhoodId },
            { hover: false }
        );
    }
    hoveredNeighbourhoodId = null;
});

// Add click event listeners to the neighbourhood to show popups with information about the clicked neighbourhood.
map.on('click', 'neighbourhoods-quantile', (e) => {
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(
            "<b>Neighbourhood:</b> " + e.features[0].properties.Neighb + "<br>" +
            "<b>Median Income:</b> $" + e.features[0].properties.Med_Inc.toLocaleString() + "<br>" +
            "<b>Persons in Unsuitable Housing:</b> " + e.features[0].properties.Not_suitab.toLocaleString()
        )
        .addTo(map);
});

map.on('click', 'neighbourhoods-geometric-interval', (e) => {
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(
            "<b>Neighbourhood:</b> " + e.features[0].properties.Neighb + "<br>" +
            "<b>Median Income:</b> $" + e.features[0].properties.Med_Inc.toLocaleString() + "<br>" +
            "<b>Persons in Unsuitable Housing:</b> " + e.features[0].properties.Not_suitab.toLocaleString()
        )
        .addTo(map);
});

map.on('click', 'neighbourhoods-equal-interval', (e) => {
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(
            "<b>Neighbourhood:</b> " + e.features[0].properties.Neighb + "<br>" +
            "<b>Median Income:</b> $" + e.features[0].properties.Med_Inc.toLocaleString() + "<br>" +
            "<b>Persons in Unsuitable Housing:</b> " + e.features[0].properties.Not_suitab.toLocaleString()
        )
        .addTo(map);
});

map.on('click', 'unsuitable-quantile', (e) => {
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(
            "<b>Neighbourhood:</b> " + e.features[0].properties.Neighb + "<br>" +
            "<b>Median Income:</b> $" + e.features[0].properties.Med_Inc.toLocaleString() + "<br>" +
            "<b>Persons in Unsuitable Housing:</b> " + e.features[0].properties.Not_suitab.toLocaleString()
        )
        .addTo(map);
});

map.on('click', 'unsuitable-geometric-interval', (e) => {
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(
            "<b>Neighbourhood:</b> " + e.features[0].properties.Neighb + "<br>" +
            "<b>Median Income:</b> $" + e.features[0].properties.Med_Inc.toLocaleString() + "<br>" +
            "<b>Persons in Unsuitable Housing:</b> " + e.features[0].properties.Not_suitab.toLocaleString()
        )
        .addTo(map);
});

map.on('click', 'unsuitable-equal-interval', (e) => {
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(
            "<b>Neighbourhood:</b> " + e.features[0].properties.Neighb + "<br>" +
            "<b>Median Income:</b> $" + e.features[0].properties.Med_Inc.toLocaleString() + "<br>" +
            "<b>Persons in Unsuitable Housing:</b> " + e.features[0].properties.Not_suitab.toLocaleString()
        )
        .addTo(map);
});


/*--------------------------------------------------------------------
DEFINE LEGENDS FOR EACH LAYER AND UPDATE LEGEND BASED ON SELECTED LAYER ID
--------------------------------------------------------------------*/

// Store all legend configurations in one object, keyed by layer ID
const legendData = {
    'neighbourhoods-quantile': {
        title: 'Median Household Income (Quantile)',
        items: [
            { label: 'Under $67,000', colour: '#eff3ff' },
            { label: '$67,000 – $72,000', colour: '#bdd7e7' },
            { label: '$72,000 – $77,500', colour: '#6baed6' },
            { label: '$77,500 – $85,000', colour: '#3182bd' },
            { label: 'Over $85,000', colour: '#08519c' }
        ]
    },
    'neighbourhoods-equal-interval': {
        title: 'Median Household Income (Equal Interval)',
        items: [
            { label: 'Under $74,400', colour: '#eff3ff' },
            { label: '$74,400 – $96,800', colour: '#bdd7e7' },
            { label: '$96,800 – $119,200', colour: '#6baed6' },
            { label: '$119,200 – $141,600', colour: '#3182bd' },
            { label: 'Over $141,600', colour: '#08519c' }
        ]
    },
    'neighbourhoods-geometric-interval': {
        title: 'Median Household Income (Geometric Interval)',
        items: [
            { label: 'Under $65,451', colour: '#eff3ff' },
            { label: '$65,451 – $72,302', colour: '#bdd7e7' },
            { label: '$72,302 – $85,752', colour: '#6baed6' },
            { label: '$85,752 – $112,159', colour: '#3182bd' },
            { label: 'Over $112,159', colour: '#08519c' }
        ]
    },
    'unsuitable-quantile': {
        title: 'Persons in Unsuitable Housing (Quantile)',
        items: [
            { label: 'Under 380', colour: '#eff3ff' },
            { label: '380 – 595', colour: '#bdd7e7' },
            { label: '595 – 980', colour: '#6baed6' },
            { label: '980 – 1,410', colour: '#3182bd' },
            { label: 'Over 1,410', colour: '#08519c' }
        ]
    },
    'unsuitable-equal-interval': {
        title: 'Persons in Unsuitable Housing (Equal Interval)',
        items: [
            { label: 'Under 650', colour: '#eff3ff' },
            { label: '650 – 1,245', colour: '#bdd7e7' },
            { label: '1,245 – 1,840', colour: '#6baed6' },
            { label: '1,840 – 2,435', colour: '#3182bd' },
            { label: 'Over 2,435', colour: '#08519c' }
        ]
    },
    'unsuitable-geometric-interval': {
        title: 'Persons in Unsuitable Housing (Geometric Interval)',
        items: [
            { label: 'Under 412', colour: '#eff3ff' },
            { label: '412 – 594', colour: '#bdd7e7' },
            { label: '594 – 952', colour: '#6baed6' },
            { label: '952 – 1,653', colour: '#3182bd' },
            { label: 'Over 1,653', colour: '#08519c' }
        ]
    }
};

// Update legend based on selected layer ID
function updateLegend(layerId) {
    const legend = document.getElementById('legend');
    const config = legendData[layerId];

    // Clear existing legend contents
    legend.innerHTML = '';

    // Rebuild header
    const title = document.createElement('h4');
    title.textContent = config.title;
    legend.appendChild(title);

    // Rebuild rows using the same structure as your professor's code
    config.items.forEach(({ label, colour }) => {
        const row = document.createElement('div');
        const colcircle = document.createElement('span');

        colcircle.className = 'legend-colcircle';
        colcircle.style.setProperty('--legendcolour', colour);

        const text = document.createElement('span');
        text.textContent = label;

        row.append(colcircle, text);
        legend.appendChild(row);
    });
}