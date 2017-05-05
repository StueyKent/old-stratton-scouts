(function (window) {

  window.initMap = function () {
    if(document.querySelector('section#map') !== null){
      var googleMaps = new GoogleMaps('map', 51.59021, -1.752424);
    }
  }

})(window);