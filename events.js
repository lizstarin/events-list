window.onload = function(e) {
	mapboxgl.accessToken = 'pk.eyJ1IjoibGl6c3RhcmluIiwiYSI6ImNqcDRjbjA0eDBmenIzanA3Znd5MnBvd3gifQ.feWymrUSbwc9izQhA-HqpQ'; // Public token

	var map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/streets-v10',
		center: [-73.95, 40.65],
		zoom: 10
	});

	fetch('https://events.mobilizeamerica.io/api/v1/events')
	  .then(function(response) {
	    return response.json();
	  })
	  .then(function(eventsJson) {
	    console.log(JSON.stringify(eventsJson));
	  });
	
}