require 'spec_helper'

describe Project do

  let(:user) { @user = FactoryGirl.create(:user) }

  it "should reject duplicate name" do
    project = FactoryGirl.build(:project)
    user.projects << project
    user.save
    project_with_duplicate_name = FactoryGirl.build(:project, name: project.name)
    user.project_name_uniq?(project_with_duplicate_name.name)
    expect(user.errors.messages[:project_name]).to eq(["project name has already been taken"])
  end

  it "should has many sprints" do
    sprint = FactoryGirl.build(:sprint)
    project = FactoryGirl.build(:project)
    project.sprints.push(sprint)
    user.projects.push(project)
    user.save
    user.projects.each { |p|
      expect(p.sprints.size).to eq(1)
    }
  end
end
