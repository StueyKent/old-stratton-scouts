(function (window) {
        
    var styles = [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":60}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","stylers":[{"visibility":"on"},{"lightness":30}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ef8c25"},{"lightness":40}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#b6c54c"},{"lightness":40},{"saturation":-40}]},{}]
    
    function GoogleMaps() {    
        
      console.log("Google Maps");
      
        var map, 
            lat = 51.59021,
            lng = -1.752424,
            latLng;
        
        $(window).on("debouncedresize", function( event ) {
            map.setCenter(latLng);
        });
        
        this.getLat = function() { return lat};
        this.getLng = function() { return lng};
        this.getStyles = function() { return styles};
        this.setMap = function(m) { map = m};
        this.setLatlng = function(l) { latLng = l};
        
    }
    
    GoogleMaps.prototype.init = function() {
        
        var styles = this.getStyles();
        var latLng = new google.maps.LatLng(this.getLat(),this.getLng());
        
        // Create a map object and specify the DOM element for display.
        var map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 51.59021, lng: -1.752424},
            scrollwheel: false,
            zoom: 14,
            draggable: false,
            styles: styles
        });
        
       this.setMap(map),
       this.setLatlng(latLng);

        // Create a marker and set its position.
        var marker = new google.maps.Marker({
            map: map,
            position: {lat: 51.59021, lng: -1.752424},
            title: '1st Stratton Scout Group'
        });
    }
    
    window.GoogleMaps = GoogleMaps;

})(window);