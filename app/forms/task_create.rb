class TaskCreate

  def initialize(params)
    @task = Task.new(params)
    @sync_dashboard = SyncDashboard.new(@task, :create)
  end

  def save
    return unless @task.valid?
    @task.save!
    @sync_dashboard
      .publish_event
      .update_dashboard
  end

  def self.model_name
    ActiveModel::Name.new(self, nil, 'Task')
  end

end
