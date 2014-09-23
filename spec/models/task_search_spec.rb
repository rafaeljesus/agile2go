require 'spec_helper'

describe TaskSearch do

  after(:each) { FactoryGirl.reload }

  it 'should return all tasks by story' do
    task = FactoryGirl.create :task
    tasks = TaskSearch.search(task.story)
    expect(tasks.length).to be(1)
  end

  it 'should return all tasks by title' do
    task = FactoryGirl.create :task
    tasks = TaskSearch.search(task.title)
    expect(tasks.length).to be(1)
  end

  it 'should return all tasks by status' do
    task = FactoryGirl.create :task
    tasks = TaskSearch.search(task.status)
    expect(tasks.length).to be(1)
  end
end
