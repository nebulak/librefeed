LAstronaut.Models.RSSFeed = Backbone.Model.extend({
  defaults: {
    id: null,
    name: null,
    title: null,
    url: null,
    avatar: null
  },
  initialize: function() {
    this.set('avatar', _.random(1, 15) + '.jpg');
  }
});
