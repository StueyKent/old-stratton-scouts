(function (window) {

  if(document.querySelector('section#map') !== null){
    var googleMaps = new GoogleMaps();
  }

  if(document.querySelector('article#articles') !== null){
    var articlesController = new ArticleController();
  }

  window.initMap = function () {
    googleMaps.init();
  }

})(window);