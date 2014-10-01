require 'spec_helper'

describe Sprint do

  before do
    @user = FactoryGirl.create(:user)
    project = FactoryGirl.build(:project)
    @sprint = FactoryGirl.build(:sprint)
    project.sprints.push(@sprint)
    @user.projects.push(project)
    @user.save
  end

  it "should reject duplicate name" do
    sprint_with_duplicate_name = FactoryGirl.build(:sprint, name: @sprint.name)
    @user.sprint_name_uniq?(sprint_with_duplicate_name.name)
    expect(@user.errors.messages[:sprint_name]).to eq(["sprint name has already been taken"])
  end

end
