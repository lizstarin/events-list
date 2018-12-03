var EventsList = function () {
	window.onload = function(e) {

		var map = Mapper.drawMap();

		var buildGeoJson = function(events) {
			var located = events.filter(function(e) {
				return e.location != null;
			});

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
				eventLink.href = e.browser_url;
				var title = createDivWithText(e.title, 'event-title');
				var summary = createDivWithText(e.summary, 'event-summary');
				eventLink.appendChild(title);
				eventLink.appendChild(summary);

				el.appendChild(eventLink);
				el.dataset.id = e.id;
				document.getElementById('list').appendChild(el);
			});
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
			    	Mapper.addMarkers(geojson, map);
			    	addList(events);
			    	map.resize();
			  	}).catch(function(error) {
			  		console.log('error: ', error.message);
			  		window.location = 'error.html';
			  	});
		};

		getData();
	}
} ();
