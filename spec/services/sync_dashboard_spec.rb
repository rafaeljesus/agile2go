require 'spec_helper'

describe SyncDashboard do

  before do
    project = FactoryGirl.create(:project)
    @dashboard = Dashboard.create(project_name: project.name)
    sprint = FactoryGirl.create(:sprint, project_id: project.id)
    @task = FactoryGirl.create(:task, sprint_id: sprint.id)
  end

  it 'when create event and unless status_changed? then return' do
    sync = SyncDashboard.new(@task, :create)
    sync.update_dashboard
    dashboard = Dashboard.find(@dashboard.id)
    expect(dashboard.todo_count).to eq(0)
  end

  it 'when create event and status_changed? then increase status in dashboard' do
    @task.status = 'ongoing'
    sync = SyncDashboard.new(@task, :create)
    sync.update_dashboard
    dashboard = Dashboard.find(@dashboard.id)
    expect(dashboard.ongoing_count).to eq(1)
  end

  it 'when update event and unless status_changed? then increase status in dashboard' do
    sync = SyncDashboard.new(@task, :update)
    sync.update_dashboard
    dashboard = Dashboard.find(@dashboard.id)
    expect(dashboard.todo_count).to eq(0)
  end

  it 'when update event and status_changed? then increase status in dashboard' do
    @task.status = 'done'
    sync = SyncDashboard.new(@task, :update)
    sync.update_dashboard
    dashboard = Dashboard.find(@dashboard.id)
    expect(dashboard.done_count).to eq(1)
  end

  it 'when destroy event then decrease status in dashboard' do
    sync = SyncDashboard.new(@task, :destroy)
    sync.update_dashboard
    dashboard = Dashboard.find(@dashboard.id)
    expect(dashboard.todo_count).to eq(0)
  end

end
