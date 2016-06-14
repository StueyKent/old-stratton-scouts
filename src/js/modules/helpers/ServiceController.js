(function (window) {

  function ServiceController() {}

  ServiceController.prototype.call = function (method, url, data, callback) {

    var request = new XMLHttpRequest();
    request.open(method, url, true);

    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
        var data = JSON.parse(request.responseText);
        callback(data);
      } else {
        console.error("server Error");
      }
    };

    request.onerror = function () {
      console.error("connection Error");
    };

    request.setRequestHeader('Content-Type', "application/json; charset=utf-8");
    request.send(JSON.stringify(data));
  }


  window.ServiceController = ServiceController;

})(window);