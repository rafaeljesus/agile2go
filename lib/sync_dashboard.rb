module SyncDashboard

  private_class_method
  def publish_event
    # Event.new(@task, @event).broadcast
  end

  def update_dashboard
    sprint = Sprint.find(@task.sprint_id)
    project = Project.find(sprint.project_id)
    incs = {}
    if @task.is_todo
      incs[:todo_count] = 1
    elsif @task.is_ongoing
      incs[:ongoing_count] = 1
    elsif @task.is_test
      incs[:test_count] = 1
    elsif @task.is_done
      incs[:done_count] = 1
    end
    Dashboard.increment({ project_name: project.name }, incs)
  end

end
