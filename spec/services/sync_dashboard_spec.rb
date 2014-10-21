require 'spec_helper'

describe SyncDashboard do

  before do
    project = FactoryGirl.create(:project)
    @dashboard = Dashboard.create(project_name: project.name)
    sprint = FactoryGirl.create(:sprint, project_id: project.id)
    @task = FactoryGirl.create(:task, sprint_id: sprint.id)
  end

  it 'when create event then increase status in dashboard' do
    sync = SyncDashboard.new(@task, :create)
    sync.update_dashboard
    dashboard = Dashboard.find(@dashboard.id)
    expect(dashboard.todo_count).to eq(1)
  end

  it 'when update event then increase status in dashboard' do
    sync = SyncDashboard.new(@task, :create)
    sync.update_dashboard
    dashboard = Dashboard.find(@dashboard.id)
    expect(dashboard.todo_count).to eq(1)
  end

  it 'when destroy event then increase status in dashboard' do
    sync = SyncDashboard.new(@task, :destroy)
    sync.update_dashboard
    dashboard = Dashboard.find(@dashboard.id)
    expect(dashboard.todo_count).to eq(0)
  end

end
