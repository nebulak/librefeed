LAstronaut.Views.AddFeed = Backbone.View.extend({
  template: _.template($('#tpl-new-feed').html()),

  events: {
    'submit .contract-form': 'onFormSubmit'
  },

  render: function() {
    var html = this.template();
    this.$el.append(html);
    return this;
  },
  onFormSubmit: function(e) {
    e.preventDefault();
    this.trigger('form:submitted', {
      name: this.$('.feed-name-input').val(),
      title: this.$('.feed-name-input').val(),
      url: this.$('.feed-url-input').val()
    });
  }
});
