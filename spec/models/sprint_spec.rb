require 'spec_helper'

describe Sprint do

  let(:project) { FactoryGirl.create(:project) }

  it "should validate presence of name" do
    sprint = FactoryGirl.build(:sprint, name: nil)
    project.sprints << sprint
    project.save
    expect(project.valid?).to be_falsy
  end

  it "should validate presence of points" do
    sprint = FactoryGirl.build(:sprint, points: nil)
    project.sprints << sprint
    project.save
    expect(project.valid?).to be_falsy
  end

  it "should reject duplicate name" do
    sprint = FactoryGirl.create(:sprint)
    with_duplicate_name = FactoryGirl.build(:sprint, name: sprint.name)
    project.sprints.push with_duplicate_name
    project.save
    expect(project.sprint_name_uniq?(with_duplicate_name.name)).to be_falsy
  end

end
