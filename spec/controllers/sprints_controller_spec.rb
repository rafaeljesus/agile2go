require 'spec_helper'

describe SprintsController, type: :controller do

  it "should return a sprints collection" do
    xhr :get, :index
    expect(response).to be_success
  end

  it "should return a sprint for edit" do
    sprint = FactoryGirl.create(:sprint)
    xhr :get, :edit, id: sprint.id
    expect(response).to be_success
  end

  it "should create a new sprint" do
    project = FactoryGirl.create(:project)
    sprint_hash = FactoryGirl.attributes_for(:sprint, project_id: project.id)
    xhr :post, :create, { sprint: sprint_hash }
    expect(response).to be_success
  end

  it "should update existing sprint" do
    sprint = FactoryGirl.create(:sprint)
    hash = { id: sprint.id, sprint: { id: sprint.id }}
    xhr :put, :update, hash
    expect(response).to be_success
  end

  it "should destroy a existing sprint" do
    sprint = FactoryGirl.create(:sprint)
    xhr :delete, :destroy, id: sprint.id
    expect(response).to be_success
  end
end
