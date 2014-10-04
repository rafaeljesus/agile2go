require 'spec_helper'

describe Project do

  it "should validate presence of name" do
    project = FactoryGirl.build(:project, name: nil)
    project.save
    expect(project.valid?).to be_falsy
  end

  it "should reject duplicate name" do
    project = FactoryGirl.create(:project)
    with_duplicate_name = FactoryGirl.build(:project, name: project.name)
    with_duplicate_name.save
    expect(with_duplicate_name.valid?).to be_falsy
  end

  describe "associations" do
    it "should save a project with sprints" do
      project = FactoryGirl.build(:project)
      project.sprints << FactoryGirl.build(:sprint)
      project.save
      expect(Project.first.sprints.length).to be 1
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
