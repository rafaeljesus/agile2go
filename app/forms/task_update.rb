class TaskUpdate

  def initialize(task, params)
    @task = task
    @params = params
    @sync_dashboard = SyncDashboard.new(@task, :update)
  end

  def save
    return unless @task.valid?
    @task.update_attributes(@params)
    @sync_dashboard.update_dashboard
  end

  def self.model_name
    ActiveModel::Name.new(self, nil, 'Task')
  end

end
