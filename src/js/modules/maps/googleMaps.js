(function (window) {

    var styles = [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":60}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","stylers":[{"visibility":"on"},{"lightness":30}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ef8c25"},{"lightness":40}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#b6c54c"},{"lightness":40},{"saturation":-40}]},{}]

    function GoogleMaps(id, lat, lng) {

      console.log("Google Maps");

        var map,
            lat,
            lng,
            latLng;

        $(window).on("debouncedresize", function( event ) {
          map.setCenter(latLng);
        });

        latLng = new google.maps.LatLng(lat,lng);

        // Create a map object and specify the DOM element for display.
        map = new google.maps.Map(document.getElementById(id), {
            center: {lat: lat, lng: lng},
            scrollwheel: false,
            mapTypeControl: false,
            zoom: 14,
            draggable: false,
            styles: styles
        });

        // Create a marker and set its position.
        var marker = new google.maps.Marker({
            map: map,
            position: {lat: lat, lng: lng},
            title: '1st Stratton Scout Group'
        });
    }

    window.GoogleMaps = GoogleMaps;

})(window);