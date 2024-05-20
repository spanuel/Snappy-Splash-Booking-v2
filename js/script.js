function initMap() {
    // The location of the center point
    var centerPoint = {lat: -33.933248, lng: 18.460797};
    // The map, centered at the center point
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: centerPoint
    });

    var service = new google.maps.places.PlacesService(map);
    var infowindow = new google.maps.InfoWindow();

    // Search function
    document.getElementById('search-btn').addEventListener('click', function() {
        var location = document.getElementById('location-search').value;
        if (location) {
            var request = {
                query: location + ' car wash',
                fields: ['name', 'geometry'],
            };

            service.findPlaceFromQuery(request, function(results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    for (var i = 0; i < results.length; i++) {
                        createMarker(results[i]);
                    }
                    map.setCenter(results[0].geometry.location);
                }
            });
        }
    });

    // Create a marker for each place found
    function createMarker(place) {
        if (!place.geometry || !place.geometry.location) return;

        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(place.name);
            infowindow.open(map, marker);
        });
    }
}

// Initialize the map when the window has finished loading
google.maps.event.addDomListener(window, 'load', initMap);


document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');
    const signupMessage = document.getElementById('signup-message');

    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();
        console.log('Form submitted');

        // Get form values
        const name = document.getElementById('name').value.trim();
        const surname = document.getElementById('surname').value.trim();
        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const cell = document.getElementById('cell').value.trim();
        const newPassword = document.getElementById('new-password').value.trim();
        const confirmPassword = document.getElementById('confirm-password').value.trim();

        // Validate form fields
        if (!name || !surname || !username || !email || !cell || !newPassword || !confirmPassword) {
            showMessage('All fields are required.', 'error');
            return;
        }

        if (newPassword !== confirmPassword) {
            showMessage('Passwords do not match.', 'error');
            return;
        }

        // Save user data to local storage
        const userData = {
            name,
            surname,
            username,
            email,
            cell,
            password: newPassword
        };

        localStorage.setItem('userData', JSON.stringify(userData));
        showMessage('Account successfully created.', 'success');

        // Redirect to booking history section after 2 seconds
        setTimeout(() => {
            document.querySelector('signup').classList.add('hidden');
            const bookingHistorySection = document.querySelector('booking-history');
            if (bookingHistorySection) {
                bookingHistorySection.classList.remove('hidden');
            }
        }, 2000);
    });

    function showMessage(message, type) {
        signupMessage.textContent = message;
        signupMessage.className = type === 'success' ? 'success' : 'error';
        signupMessage.classList.remove('hidden');
    }
});
