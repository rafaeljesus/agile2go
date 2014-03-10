require 'spec_helper'

describe Project do
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:company) }
  it { should validate_presence_of(:description) }
  it { should validate_uniqueness_of(:name) }

  it { should have_many(:assignments) }
  it { should have_many(:users).through(:assignments) }
  it { should have_many(:assigned_users).through(:assignments) }
  it { should have_many(:sprints) }
  it { should have_many(:tasks).through(:sprints) }
  it { should accept_nested_attributes_for(:assignments) }

  it 'should count all tasks of a given project and status' do
    task = FactoryGirl.create :task
    qty = Project.count_all_tasks_of(task.sprint.project.name, task.status).map { |data| data.qty }
    expect(qty).to eq([1])
  end

end
