class TaskDestroy
  include SyncDashboard

  def initialize(task)
    @task = task
    @event = :destroy
  end

  def destroy
    @task.destroy
    publish_event
    update_dashboard
    true
  end

  def self.model_name
    ActiveModel::Name.new(self, nil, 'Task')
  end

end
