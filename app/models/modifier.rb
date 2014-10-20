class Modifier

  def initialize(task)
    @task = task
    @old_task = Task.find(task.id)
  end

  def to_increase
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
    incs
  end

  def to_decrease
    decs = {}
    if @old_task.is_todo
      decs[:todo_count] = -1
    elsif @old_task.is_ongoing
      decs[:ongoing_count] = -1
    elsif @old_task.is_test
      decs[:test_count] = -1
    elsif @old_task.is_done
      decs[:done_count] = -1
    end
    decs
  end

end
