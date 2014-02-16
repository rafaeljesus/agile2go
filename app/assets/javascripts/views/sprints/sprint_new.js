App.Views.SprintNew = Support.CompositeView.extend({
  initialize: function(options){
    _.bindAll(this, 'render', 'saved', 'onModelError');
    this.projects = options.projects;
    this.newProject();
    this.bindTo(this.projects, 'add', this.render);
    this.model.on('error', this.onModelError);
  },

  events: {
    'click .submit': 'save'
  },

  render: function(){
    this.$el.html(JST['sprints/form']({ model: this.model.toJSON(), projects: this.projects.toJSON() }));
    this.select2();
    return this;
  },

  save: function(e){
    e.preventDefault();
    this.commit();
    if(!this.model.isValid()) this.model.trigger('error');
    else this.model.save({}, { success: this.saved });
    return false;
  },

  commit: function(){
    var start_date = this.$('#start-date').val()
    , end_date = this.$('#end-date').val()
    , daily = this.$('#daily').val()
    , points = this.$('#points').val();
    this.model.set({ start_date: start_date, end_date: end_date, daily: daily, points: points });
    this.model.project = this.assignedProject();
  },

  assignedProject: function(){
    var self = this;
    return _.first(_.map(this.assigneeId(), function(id){
      return self.projects.get({ id: id });
    }));
  },

  assigneeId: function(){
    return this.$('select').find('option:selected').map(function(n, select){
      return $(select).val();
    });
  },

  saved: function(model, response, options) {
     this.sprintsPath();
     this.savedMsg();
  },

  onModelError: function(model, response, options){
    var attributesWithErrors = response ? JSON.parse(response.responseText).errors : this.model.validationError;
    new ErrorView({ el: $('form'), attributesWithErrors: attributesWithErrors }).render();
  },

  newProject: function(){
    this.model = new App.Models.Sprint({});
  },

  sprintsPath: function(){
    window.location.hash = '#sprints';
  },

  savedMsg: function(){
     var message = I18n.t('flash.actions.create.notice', { model: 'Sprint' });
     new FlashMessages({ message: message }).success();
  },

  select2: function(){
    this.$('select').select2({ placeholder: 'Select a Project' });
  }

});
