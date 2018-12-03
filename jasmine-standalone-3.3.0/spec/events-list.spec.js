describe('EventsList', function() {
	var eventsList;

	beforeEach(function() {
		eventsList = new EventsList();
		spyOn(eventsList, 'Mapper');
	});

	it('downloads data from MobilizeAmerica API', function() {
		// eventsList.getData();
		// expect(eventsList.getData).toHaveBeenCalled();
	});

	it('handles network errors', function() {

	});


	it('creates and appends an events list', function() {

	});

	// These will be tests for Mapper:

	// it('creates a map', function() {

	// });

	// it('creates and appends map markers', function() {

	// });

});