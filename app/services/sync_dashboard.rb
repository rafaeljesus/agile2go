class SyncDashboard

  def initialize(task, event)
    @task = task
    @event = event
    @modifier = Modifier.new(task)
  end

  def publish_event
    # Event.new(@task, @event).broadcast
    self
  end

  def update_dashboard
    dashboard = Dashboard.find_by_project_name(project_name)
    dashboard.increment(@modifier.to_increase)
    binding.pry
    dashboard.decrement(@modifier.to_decrease) unless on_create
    self
  end

  private
  def project_name
    sprint = Sprint.find(@task.sprint_id)
    project = Project.find(sprint.project_id)
    project.name
  end

  def on_create
    @event == :create
  end

end
