App.Views.SprintEdit = Support.CompositeView.extend({
  initialize: function(options){
    _.bindAll(this, 'render', 'saved', 'onModelError');
    this.model = options.model;
    this.projects = options.projects;
    this.model.on('error', this.onModelError);
  },

  events: {
    'click .submit' : 'update'
  },

  render: function(){
    this.renderTemplate();
    this.select2();
    this.renderAssignedProject();
    return this;
  },

  renderTemplate: function(){
    this.$el.html(JST['sprints/form']({ model: this.model.toJSON(), projects: this.projects.toJSON() }));
  },

  renderAssignedProject: function(){
    this.$('select').val(this.model.project.id).trigger('change');
  },

  update: function(e){
    e.preventDefault();
    this.commit();
    this.model.save({}, { success: this.saved });
    return false;
  },

  commit: function(){
    var name = this.$('#name').val()
    , start_date = this.$('#start-date').val()
    , end_date = this.$('#end-date').val()
    , daily = this.$('#daily').val()
    , points = this.$('#points').val();
    this.model.set({ name: name, start_date: start_date, end_date: end_date, daily: daily, points: points });
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

  sprintsPath: function(){
    window.location.href = '#sprints';
  },

  savedMsg: function(){
     var message = I18n.t('flash.actions.update.notice', { model: 'Sprint' });
     new FlashMessages({ message: message }).success();
  },

  select2: function(){
    this.$('select').select2({ placeholder: 'Select a User' });
  }

});
