var eventsList = function () {
	window.onload = function(e) {
		mapboxgl.accessToken = 'pk.eyJ1IjoibGl6c3RhcmluIiwiYSI6ImNqcDRjbjA0eDBmenIzanA3Znd5MnBvd3gifQ.feWymrUSbwc9izQhA-HqpQ'; // Public token

		var drawMap = function() {
			return new mapboxgl.Map({
				container: 'map',
				style: 'mapbox://styles/mapbox/streets-v10',
				center: [-95, 37],
				zoom: 3.5
			});
		};

		var buildGeoJson = function(events) {
			var located = events.filter(e => e.location != null);

			var features = []
			located.forEach(function(e) {			// I'm not sure why Array.map didn't work, but it didn't!
				var feature = {
					type: 'Feature',
					geometry: {
						type: 'Point',
						coordinates: [e.location.location.longitude, e.location.location.latitude]
					},
					properties: {
						title: e.title,
						summary: e.summary,
						description: e.description,
						url: e.browser_url,
						id: e.id
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
			  	el.dataset.id = marker.properties.id;

			  	new mapboxgl.Marker(el)
			  		.setLngLat(marker.geometry.coordinates)
			  		.setPopup(new mapboxgl.Popup({ offset: 25 })
	  				.setHTML('<a href="' + marker.properties.url + '"><h3>' + marker.properties.title + '</h3></a><p>' + marker.properties.description + '</p>'))
			  		.addTo(map);
			});	
		};

		var createDivWithText = function(textString, classString) {
			var el = document.createElement('div');
			var text = document.createTextNode(textString);
			el.appendChild(text);
			el.className = classString;
			return el;
		};

		var addList = function(events) {
			events.forEach(function(e) {
				var el = document.createElement('div');
				el.className = 'event-item';

				var eventLink = document.createElement('a')
				eventLink.href = e.url;
				var title = createDivWithText(e.title, 'event-title');
				var summary = createDivWithText(e.summary, 'event-summary');
				eventLink.appendChild(title);
				eventLink.appendChild(summary);

				el.appendChild(eventLink);
				el.dataset.id = e.id;
				document.getElementById('list').appendChild(el);
			});
			map.resize();
		};

		var getData = function() {
			fetch('https://events.mobilizeamerica.io/api/v1/events')
				.then(function(response) {
					if (response.ok) {
			    		return response.json();
					} else {
						response.redirect('error.html');
					}
			  	})
			  	.then(function(eventsJson) {
			  		var events = eventsJson.data
			    	var geojson = buildGeoJson(events);
			    	addMarkers(geojson);
			    	addList(events);
			  	}).catch(function(error) {
			  		console.log('fetch error: ', error.message);
			  		window.location = 'error.html';
			  	});
		};

		var map = drawMap();
		getData();
	}
} ();