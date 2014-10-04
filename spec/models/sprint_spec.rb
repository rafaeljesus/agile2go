require 'spec_helper'

describe Sprint do

  it "should validate presence of name" do
    sprint = FactoryGirl.build(:sprint, name: nil)
    sprint.save
    expect(sprint.valid?).to be_falsy
  end

  it "should validate uniqueness of name" do
    sprint = FactoryGirl.create(:sprint)
    with_duplicate_name = FactoryGirl.build(:sprint, name: sprint.name)
    with_duplicate_name.save
    expect(with_duplicate_name.valid?).to be_falsy
  end

  it "should validate numericality of points" do
    sprint = FactoryGirl.build(:sprint, points: 'wrong points')
    expect(sprint.valid?).to be_falsy
  end

end
