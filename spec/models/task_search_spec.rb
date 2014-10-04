require 'spec_helper'

describe Task do

  it 'should return all tasks by status' do
    task = FactoryGirl.create(:task, sprint_id: 1)
    tasks = Task.search(task.status)
    expect(tasks.length).to be(1)
  end

  it 'should return all tasks by title' do
    task = FactoryGirl.create(:task)
    tasks = Task.search(task.title)
    expect(tasks.length).to be(1)
  end

  it 'should return all tasks by story' do
    task = FactoryGirl.create(:task)
    tasks = Task.search(task.story)
    expect(tasks.length).to be(1)
  end

  it 'should return all tasks by points' do
    task = FactoryGirl.create(:task)
    tasks = Task.search(task.points)
    expect(tasks.length).to be(1)
  end

  it 'should return all tasks by priority' do
    task = FactoryGirl.create(:task)
    tasks = Task.search(task.priority)
    expect(tasks.length).to be(1)
  end

  it 'should return all tasks by sprint_id' do
    task1 = FactoryGirl.create(:task, sprint_id: 1)
    task2 = FactoryGirl.create(:task, sprint_id: 1)
    tasks = Task.search(1)
    expect(tasks.length).to be(2)
  end

  it 'should return empty when query does not match' do
    task = FactoryGirl.create(:task)
    tasks = Task.search('unknown query')
    expect(tasks.length).to be(0)
  end

end
