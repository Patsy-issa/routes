import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('collections', { path: '/collections' } , function() {
    this.route('collection', { path: '/collection_slug' }, function() {
      this.route('articles', { path: '/articles/' }, function() {
        this.route('article', { path: '/article_slug'});
      });
    });
  });
});

export default Router;
