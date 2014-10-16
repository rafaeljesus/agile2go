class TaskUpdate
  include SyncDashboard

  def initialize(task, params)
    @task = task
    @params = params
    @event = :update
  end

  def save
    return false unless @task.valid?
    @task.update_attributes(@params)
    publish_event
    update_dashboard
    true
  end

  def self.model_name
    ActiveModel::Name.new(self, nil, 'Task')
  end

end
