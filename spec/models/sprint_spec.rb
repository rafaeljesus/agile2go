require 'spec_helper'

describe Sprint do

  let(:project) { FactoryGirl.create(:project) }

  it "should validate presence of name" do
    sprint = FactoryGirl.build(:sprint, name: nil)
    project.sprints.push sprint
    project.save
    expect(project.sprint_name_blank?).to eq(true)
  end

  it "should reject duplicate name" do
    sprint = FactoryGirl.create(:sprint)
    with_duplicate_name = FactoryGirl.build(:sprint, name: sprint.name)
    project.sprints.push with_duplicate_name
    project.save
    expect(project.sprint_name_uniq?(with_duplicate_name.name)).to eq(false)
  end

end
