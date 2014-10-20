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
    query = { project_name: project_name }
    Dashboard.increment(query, @modifier.to_increase)
    Dashboard.decrement(query, @modifier.to_decrease) unless on_create
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
