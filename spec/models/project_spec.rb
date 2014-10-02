require 'spec_helper'

describe Project do

  it "should validate presence of name" do
    project = FactoryGirl.build(:project, name: nil)
    project.save
    expect(project.errors.messages[:name]).to eq(["can't be blank"])
  end

  it "should reject duplicate name" do
    project = FactoryGirl.create(:project)
    with_duplicate_name = FactoryGirl.build(:project, name: project.name)
    with_duplicate_name.save
    expect(with_duplicate_name.errors.messages[:name]).to eq(["has already been taken"])
  end

  describe "associations" do
    it "should save a project with sprints" do
      project = FactoryGirl.build(:project)
      project.sprints.push FactoryGirl.build(:sprint)
      project.save
      expect(Project.first.sprints.length).to eq(1)
    end

    it "should save a project with one user" do
      current_user = FactoryGirl.create(:user)
      project = FactoryGirl.build(:project)
      project.user = current_user
      project.save
      expect(User.first.first_name).to eq(project.user.first_name)
    end
  end
end
