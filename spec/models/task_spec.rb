require 'spec_helper'

describe Task do

  it "should validate presence of title" do
    task = FactoryGirl.build(:task, title: nil)
    expect(task.valid?).to be_falsy
  end

  it "should validate presence of story" do
    task = FactoryGirl.build(:task, story: nil)
    expect(task.valid?).to be_falsy
  end

  it "should validate inclusion of status in Task::STATUSES" do
    task = FactoryGirl.build(:task, status: 'unknown status')
    expect(task.valid?).to be_falsy
  end

  it "should validate inclusion of priority in 1..5" do
    task = FactoryGirl.build(:task, priority: 6)
    expect(task.valid?).to be_falsy
  end

  it "should validate numericality of points" do
    task = FactoryGirl.build(:task, points: 'wrong points')
    expect(task.valid?).to be_falsy
  end
end
