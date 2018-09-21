LAstronaut.Router = Backbone.Router.extend({
routes: {
  '': 'home',
  'feeds': 'showFeeds',
  'feeds/new': 'newFeed',
  'feeds/edit/:id': 'editFeed'
}
});
