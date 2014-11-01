class SyncDashboard

  def initialize(task, event)
    @task =  task
    @old_task = Task.find(task.id)
    @event = event
  end

  def update_dashboard
    query = { project_name: project_name }
    return unless status_changed?
    Dashboard.increment(query, @task.increment) if increment?
    Dashboard.decrement(query, @old_task.decrement) if decrement?
  end

  private
  def project_name
    sprint = Sprint.find(@task.sprint_id)
    project = Project.find(sprint.project_id)
    project.name
  end

  def decrement?
    @event != :create
  end

  def increment?
    @event != :destroy
  end

  def status_changed?
    return true if @old_task.nil?
    @task.status != @old_task.status
  end
end
