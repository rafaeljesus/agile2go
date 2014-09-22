class DashboardQuery

  def initialize(relation = Project.all.load)
    @relation = relation
  end

  def to_json
    {
      series: series,
      categories: @relation.project_names
    }
  end

  private
  def series
    all_series = []
    Task::STATUSES.each do |status|
      series = {}
      series[:name] = status
      series[:data] = total_tasks_with(status)
      all_series << series
    end
    all_series
  end

  def total_tasks_with(status)
    result = []
    @relation.project_names.each do |project_name|
      result <<  @relation.joins(sprints: :tasks).where(projects: { name: project_name }, tasks: { status: status }).count
    end
    result
  end

end
