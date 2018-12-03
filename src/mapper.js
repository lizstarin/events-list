var Mapper = function() {
	mapboxgl.accessToken = 'pk.eyJ1IjoibGl6c3RhcmluIiwiYSI6ImNqcDRjbjA0eDBmenIzanA3Znd5MnBvd3gifQ.feWymrUSbwc9izQhA-HqpQ'; // Public token

	var drawMap = function() {
		return new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/mapbox/streets-v10',
			center: [-95, 37],
			zoom: 3.5
		});
	};

	var addMarkers = function(geojson, map) {
		geojson.features.forEach(function(marker) {

			var el = document.createElement('div');
		  	el.className = 'marker';
		  	el.dataset.id = marker.properties.id;

		  	new mapboxgl.Marker(el)
		  		.setLngLat(marker.geometry.coordinates)
		  		.setPopup(new mapboxgl.Popup({ offset: 25 })
					.setHTML('<a href="' + marker.properties.url + '"><h3>' + marker.properties.title + '</h3></a><p>' + marker.properties.description + '</p>'))
		  		.addTo(map);
		});	

	};

	return {
		drawMap: drawMap,
		addMarkers: addMarkers
	};
} ();