(function (window) {

  function ArticleController() {
    console.log("[ArticleController]");

    this.canLoadMap = false;
    this.isMapReady = false;
    this.loadMap = function () {
      loadmap(appData.posts.location.lat, appData.posts.location.lng);
    };

    var context = this;

    var appData = {
      apiKey: 'AIzaSyB2DQ50rxa7WdUI7NnIYX-ehXyo111sq9w',
      blogId: '1573811613523717560',
      baseUrl: 'https://www.googleapis.com/blogger/v3/',
      pageToken: null,
      posts: [],
      labels: [],
      pageSize: 5,
      previewCharLimit: 250,
      rendered: 0,
      img: null
    };

    var requests = {
      blog: appData.baseUrl + 'blogs/' + appData.blogId + '?key=' + appData.apiKey,
      posts: function (token) {
        var url = appData.baseUrl + 'blogs/' + appData.blogId + '/posts/?pageToken=' + token + '&maxResults=' + appData.pageSize + '&key=' + appData.apiKey;
        if (token === null || token === undefined) {
          url = appData.baseUrl + 'blogs/' + appData.blogId + '/posts/?maxResults=' + appData.pageSize + '&key=' + appData.apiKey;
        }
        return url;
      },
      post: function (id) {
        return appData.baseUrl + 'blogs/' + appData.blogId + '/posts/' + id + '?key=' + appData.apiKey + '&fetchImages=true'
      },
      labels: function (labels, token) {
        var url = appData.baseUrl + 'blogs/' + appData.blogId + '/posts/?labels=' + labels + '&maxResults=' + appData.pageSize + '&key=' + appData.apiKey;
        if (token != null || token != undefined) {
          url += '&pageToken=' + token
        }
        return url;
      },
      search: function (search, token) {
        var url = appData.baseUrl + 'blogs/' + appData.blogId + '/posts/search/?q=' + search + '&maxResults=' + appData.pageSize + '&key=' + appData.apiKey;
        if (token != null || token != undefined) {
          url += '&pageToken=' + token
        }
        return url;
      }
    };

    var serviceController = new ServiceController();
    var helpers = new Helpers();

    var postId = helpers.getUrlParameter('postId');
    var label = helpers.getUrlParameter('label');
    var search = helpers.getUrlParameter('search');

    $('.searchBox').val(search)

    if (search === '') {
      search = undefined;
    }

    var template = $('#articleTpl').html();
    Mustache.parse(template);

    if (postId !== undefined) {
      getPostData(postId)
    } else {
      getPostsData(renderPosts);
    }

    $('.postControls .button').click(function (e) {
      e.preventDefault();
      $('.spinner').show();
      getPostsData(renderPosts);
    });

    $('.postFilters .search').click(function (e) {
      e.preventDefault();
      var searchTerm = $('.searchBox').val();

      if (searchTerm !== '') {
        var url = 'articles.html?search=' + searchTerm;
        window.location = url;
      }
    });

    $('.postFilters .reset').click(function (e) {
      e.preventDefault();
      var url = 'articles.html';
      window.location = url;
    });

    function getPostData(postId) {
      serviceController.call('GET', requests.post(postId), {}, function (data) {
        renderPost(data, false);

        if (data.images !== undefined) {

          $('.articleAside').show();

          appData.posts = data;

          appData.img = new Image();
          appData.img.onload = function () {
            $('.articleAside__map').height(appData.img.height);
          };

          appData.img.src = data.images[0].url;
          $('.articleAside__image').html(appData.img);

          if (context.canLoadMap) {
            loadmap(data.location.lat, data.location.lng);
          } else {
            context.isMapReady = true;
          }
        }
        $('.spinner').hide();
      });
    }

    function loadmap(lat, lng) {
      var googleMaps = new GoogleMaps('map', lat, lng);

      $('.articleAside__map').height(appData.img.height);

      $(window).on("debouncedresize", function (event) {
        $('.articleAside__map').height(appData.img.height);
      });
    }

    function getPostsData(callback) {
      var url;
      if (label !== undefined) {
        url = requests.labels(label, appData.pageToken);
      } else if (search !== undefined) {
        url = requests.search(search, appData.pageToken);
      } else {
        url = requests.posts(appData.pageToken);
      }

      serviceController.call('GET', url, {}, function (data) {

        if (data.items !== undefined) {
          appData.posts = appData.posts.concat(data.items);
        }

        if (data.nextPageToken !== undefined) {
          appData.pageToken = data.nextPageToken;
        } else {
          appData.pageToken = null;
        }

        callback();
      });
    }

    function renderPosts() {
      $('.spinner').hide();

      if (appData.posts.length === 0) {
        $('.posts').append('<div class="post">Sorry, no results were found.</div>');
      }

      for (var i = appData.rendered; i < appData.posts.length; i++) {
        renderPost(appData.posts[i], true);
        appData.rendered++;
      }

      $('.post__button button').click(function () {
        var id = $(this).parents('.post').data('postId')
        var url = 'articles.html?postId=' + id;
        window.location = url;
      })

      if (search !== undefined) {
        $('.postControls').hide();
        return;
      }

      if (appData.pageToken === null || appData.pageToken === undefined) {
        $('.postControls').hide();
      } else {
        $('.postControls').show();
      }
    }

    function renderPost(data, restricted) {

      data.updated = dateFormat(new Date(data.updated), "dS mmmm yyyy");
      data.content = helpers.stripHtml(data.content)

      if (restricted) {
        data.content = data.content.substring(0, appData.previewCharLimit) + '...';
        data.restricted = true;
      }

      var rendered = Mustache.render(template, data);
      $('.posts').append(rendered);
    }
  }

  window.ArticleController = ArticleController;

})(window);