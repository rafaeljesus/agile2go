require 'spec_helper'

describe TasksController, type: :controller do

  before {
    @task = FactoryGirl.create(:task)
  }

  it "should return a tasks collection" do
    xhr :get, :index
    expect(response).to be_success
  end

  it "should return a task for edit" do
    xhr :get, :edit, id: @task.id
    expect(response).to be_success
  end

  it "should create a new task" do
    task_hash = FactoryGirl.attributes_for(:task, sprint_id: 1)
    xhr :post, :create, { task: task_hash }
    expect(response).to be_success
  end

  it "should update existing task" do
    hash = { id: @task.id, task: { id: @task.id }}
    xhr :put, :update, hash
    expect(response).to be_success
  end

  it "should destroy a existing task" do
    xhr :delete, :destroy, id: @task.id
    expect(response).to be_success
  end
end
