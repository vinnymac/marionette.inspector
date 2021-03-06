define([
  'backbone',
  'marionette',
  'text!templates/devTools/components/tree/tree.html',
], function(Backbone, Marionette, tpl) {

  var Tree = Backbone.Marionette.CompositeView.extend({
    tagName: 'ul',

    className: function() {
      var collapsedClass = this.model.isCollapsed ? 'is-collapsed' : 'is-expanded';
      return 'tree-group ' + collapsedClass;
    },

    ui: {
      toggleBtn: '[data-action="toggle"]'
    },

    events: {
      'click @ui.toggleBtn': 'onClickToggle'
    },

    modelEvents: {
      'expand': 'expandNode',
      'collapse': 'collapseNode'
    },

    template: tpl,

    constructor: function(options) {
      this.collection = options.model.nodes;
      this.ui = _.extend(Tree.prototype.ui, this.ui || {});
      this.events = _.extend(Tree.prototype.events, this.events || {});
      this.modelEvents = _.extend(Tree.prototype.modelEvents, this.modelEvents || {});
      Backbone.Marionette.CompositeView.prototype.constructor.apply(this, arguments);
    },

    initialize: function() {
    },

    onClickToggle: function() {
      this.model.isCollapsed = !this.model.isCollapsed;
      this.render();
      return false;
    },

    expandNode: function() {
      this.model.isCollapsed = false;
      this.render();
    },

    collapseNode: function() {
      this.model.isCollapsed = true;
      this.render();
    },

    onRender: function() {
      this.$el.attr('class', this.className());
    },

    serializeData: function() {
      var data = Backbone.Marionette.CompositeView.prototype.serializeData.apply(this, this.model);
      data.level = "level-"+this.model.level;
      data.collapseClass = this.model.isCollapsed ? 'glyphicon-chevron-up' : 'glyphicon-chevron-down'
      data.hasNodes = this.model.hasNodes();
      data.leafClass = this.model.hasNodes() ? 'is-parent' : 'is-leaf';

      return data;
    }
  });

  return Tree;
})