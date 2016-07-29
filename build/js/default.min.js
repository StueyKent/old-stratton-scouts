(function (window) {

  if(document.querySelector('article#articles') !== null){
    var articlesController = new ArticleController();
  }

  if(document.querySelector('article#calendar') !== null){
    var calendarController = new CalendarController();
  }

  window.initMap = function () {
    if(document.querySelector('section#map') !== null){
      var googleMaps = new GoogleMaps('map', 51.59021, -1.752424);
    }

    if(document.querySelector('article#articles') !== null){
      
      if(articlesController.isMapReady){
        articlesController.loadMap();
      }else {
        articlesController.canLoadMap = true;
      }
    }
  }

})(window);
