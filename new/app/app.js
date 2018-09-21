
window.LAstronaut = {
  Models: {},
  Collections: {},
  Views: {},
  start: function(data) {
    var rssfeeds = new LAstronaut.Collections.RSSFeeds(data.rssfeeds);
    var router = new LAstronaut.Router();

    router.on('route:home', function() {
      router.navigate('feeds', {
        trigger: true,
        replace: true
      });
    });

    router.on('route:showFeeds', function() {
      var feedsView = new LAstronaut.Views.RSSFeeds({
        collection: rssfeeds
      });

      $('.main-container').html(feedsView.render().$el);
    });

    router.on('route:newFeed', function() {
      var newFeed = new LAstronaut.Views.AddFeed();
      console.log("created new feed view");
      newFeed.on('form:submitted', function(attrs) {
        console.log("submit clicked");
        attrs.id = rssfeeds.isEmpty() ? 1 : (_.max(rssfeeds.pluck('id')) + 1);
        rssfeeds.add(attrs);
        router.navigate('feeds', true);
      });
      $('.main-container').html(newFeed.render().$el);
    });

    router.on('route:editFeed', function(id) {
      console.log('Edit contact');
    });

    Backbone.history.start();
  }
};
