class TaskDestroy

  def initialize(task)
    @task = task
    @sync_dashboard = SyncDashboard.new(task, :destroy)
  end

  def destroy
    @task.destroy
    @sync_dashboard.update_dashboard
  end

  def self.model_name
    ActiveModel::Name.new(self, nil, 'Task')
  end

end
