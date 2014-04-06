class DashboardController < ApplicationController
  respond_to :json

  def index
    project_names = Project.pluck(:name)
    dashboard = { series: [] }
    dashboard[:categories] = project_names
    %w(Todo Ongoing Test Done).each do |status|
      series = {}
      series[:name] = status
      series[:data] = count_all_tasks_with(status, project_names)
      dashboard[:series] << series
    end
    respond_with dashboard
  end

  def count_all_tasks_with(status, project_names)
    result = []
    project_names.each do |name|
      result << Array.wrap(Project.count_all_tasks_with(name, status))
    end
    result
  end

end
