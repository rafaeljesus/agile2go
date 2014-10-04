require 'spec_helper'

describe TaskSearch do

  after(:each) { FactoryGirl.reload }

  pending 'should return all tasks'

  it 'should return all tasks by status' do
    task = FactoryGirl.build(:task)
    sprint = FactoryGirl.build(:sprint)
    project = FactoryGirl.build(:project)
    sprint.tasks << task
    project.sprints << sprint
    project.save
    tasks = Project.task_search(task.status)
    expect(tasks.length).to be(1)
  end

  pending 'should return all tasks by title' do
    # task = FactoryGirl.create :task
    # tasks = TaskSearch.search(task.title)
    # expect(tasks.length).to be(1)
  end

  pending 'should return all tasks by story' do
    # task = FactoryGirl.create :task
    # tasks = TaskSearch.search(task.status)
    # expect(tasks.length).to be(1)
  end
end
