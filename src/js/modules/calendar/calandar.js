(function (window) {


  function CalendarController() {
    console.log("Calendar");

    $('#calendar__graphic').fullCalendar({

      googleCalendarApiKey: 'AIzaSyCumdFvfGytMfpdxl-4Zn5B9jHff2s0u4Q',
      events: {
        googleCalendarId: 'stuey192@googlemail.com',
        className: 'gcal-event'
      },

      /*eventClick: function (event) {
        // opens events in a popup window
        window.open(event.url, 'gcalevent', 'width=700,height=600');
        return false;
      },*/

      loading: function (bool) {
        if (!bool) {
          $('.spinner').hide();
        }
      }

    });

  }

  window.CalendarController = CalendarController;

})(window);
