require 'spec_helper'

describe ProjectsController, type: :controller do

  it "should return a projects collection" do
    xhr :get, :index
    expect(response).to be_success
  end

  it "should return a project for edit" do
    project = FactoryGirl.create(:project)
    xhr :get, :edit, id: project.id
    expect(response).to be_success
  end

  it "should create a new project" do
    project_hash = FactoryGirl.attributes_for(:project)
    xhr :post, :create, { project: project_hash }
    expect(response).to be_success
  end

  it "should update existing project" do
    project = FactoryGirl.create(:project)
    hash = { id: project.id, project: { id: project.id }}
    xhr :put, :update, hash
    expect(response).to be_success
  end

  it "should destroy a existing project" do
    project = FactoryGirl.create(:project)
    xhr :delete, :destroy, id: project.id
    expect(response).to be_success
  end
end
