LAstronaut.Views.RSSFeeds = Backbone.View.extend({
template: _.template($('#tpl-rssfeeds').html()),

renderOne: function(rssfeed) {
  var itemView = new LAstronaut.Views.RSSFeed({model: rssfeed});
  this.$('.rssfeeds-container').append(itemView.render().$el);
},

render: function() {
  var html = this.template();
  this.$el.html(html);

  this.collection.each(this.renderOne, this);

  return this;
}
});
