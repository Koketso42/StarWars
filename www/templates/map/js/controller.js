/**
 *  @author: Koketso Gift Matlhatsi
 *  @technical-support:
 *      email: Koketso42@gmail.com
 *      phone: 071 530 2436
 *
 *  @page-info:
 *
 *
 */

rootController.controller('MapController', function($state, $scope, $timeout, $http, $ionicLoading, $cordovaGeolocation) {

    var options = { enableHighAccuracy: true, maximumAge: 30000, timeout: 27000 };

    function geocodeAddress(geocoder, resultsMap, place) {

        var address = place;

        // retrieves address list containing all the necessary information [results parameter]
        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status === 'OK') {

                resultsMap.setCenter(results[0].geometry.location);

                var message = "";

                message += results[0].types[0];

                for (var i = 0; i < results[0].address_components.length; i++) {

                    message += "\n" + results[0].address_components[i].long_name;
                    message += "\n" + results[0].address_components[i].types[0];
                }

                message += "\n" + results[0].place_id;
                message += "\n" + results[0].geometry.location.lng();
                message += "\n" + results[0].geometry.location.lat();

                toLatitude = results[0].geometry.location.lat();
                toLongitude = results[0].geometry.location.lng();

                showToast("Address found, please verify the location on the map");

                var marker = new google.maps.Marker({
                    map: resultsMap,
                    position: results[0].geometry.location
                });
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    }

    $scope.searchPlace = function (place) {

        $cordovaGeolocation.getCurrentPosition(options).then(function (position) {

            showLoading($ionicLoading);

            var geocoder = new google.maps.Geocoder();

            var map = new google.maps.Map(document.getElementById('map'), {
                zoom:7,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });

            geocodeAddress(geocoder, map, place);
            var directionsService = new google.maps.DirectionsService();
            var directionsDisplay = new google.maps.DirectionsRenderer();
                        
            directionsDisplay.setMap(map);
            document.getElementById("panel").innerHTML = "";
            directionsDisplay.setPanel(document.getElementById('panel'));

            hideLoading($ionicLoading);

        }, function (error) {
        
            alert("Could not get location");
        });
    };

    $scope.searchPlace("Comic Stores")
});
