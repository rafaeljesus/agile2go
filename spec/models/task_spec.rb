require 'spec_helper'

describe Task do

  let(:project) { FactoryGirl.create(:project) }

  it "should validate presence of name" do
    sprint = FactoryGirl.build(:sprint)
    task = FactoryGirl.build(:task, title: nil)
    sprint.tasks.push task
    project.sprints.push sprint
    project.save
    expect(project.task_title_blank?).to eq(true)
  end
end
