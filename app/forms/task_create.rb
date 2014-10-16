class TaskCreate
  include SyncDashboard

  def initialize(params)
    @task = Task.new(params)
    @event = :update
  end

  def save
    return false unless @task.valid?
    @task.save!
    publish_event
    update_dashboard
    true
  end

  def self.model_name
    ActiveModel::Name.new(self, nil, 'Task')
  end

end
