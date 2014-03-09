class DashboardController < ApplicationController
  respond_to :json

  def index
    project_names = Project.pluck(:name)
    dashboard = {};
    dashboard[:series] = []
    dashboard[:categories] = project_names
    project_names.each do |name|
      %w(Todo Ongoing Test Done).each do |status|
        series = {}
        series[:name] = status
        series[:data] = Project.count_all_tasks_of(name, status).map { |data| data.qty }
        dashboard[:series] << series
      end
    end
    respond_with dashboard
  end

end
