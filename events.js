window.onload = function(e) {
	mapboxgl.accessToken = 'pk.eyJ1IjoibGl6c3RhcmluIiwiYSI6ImNqcDRjbjA0eDBmenIzanA3Znd5MnBvd3gifQ.feWymrUSbwc9izQhA-HqpQ'; // Public token

	var map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/streets-v10',
		center: [-95, 39],
		zoom: 3.5
	});

	var buildGeoJson = function(json) {
		var events = json.data;
		var located = events.filter(e => e.location != null);

		var features = []
		located.forEach(function(e) {
			var feature = {
				type: 'Feature',
				geometry: {
					type: 'Point',
					coordinates: [e.location.location.longitude, e.location.location.latitude]
				},
				properties: {
					title: e.title,
					description: e.description
				}
			};

			features.push(feature);
		});

		return {
			type: 'FeatureCollection',
			features: features
		};
	};

	var addMarkers = function(geojson) {
		geojson.features.forEach(function(marker) {

		  var el = document.createElement('div');
		  el.className = 'marker';

		  new mapboxgl.Marker(el)
		  .setLngLat(marker.geometry.coordinates)
		  .addTo(map);
		});	
	};

	fetch('https://events.mobilizeamerica.io/api/v1/events')
	  .then(function(response) {
	    return response.json();
	  })
	  .then(function(eventsJson) {
	    var geojson = buildGeoJson(eventsJson);
	    addMarkers(geojson);
	  });

}