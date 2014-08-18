class DashboardController < ApplicationController
  respond_to :json

  def index
    project_names = Project.pluck(:name)
    dashboard = { series: [], categories: project_names }
    %w(todo ongoing test done).each do |status|
      series = {
        name: status,
        data: Project.count_all_tasks_with(project_names, status)
      }
      dashboard[:series] << series
    end
    respond_with dashboard
  end

end
