require 'spec_helper'

describe User do
  it 'should be master' do
    user = FactoryGirl.build :user
    user.add_role :master
    ability = Ability.new user
    is_master = ability.can? :manage, :all
    expect(is_master).to be_truthy
  end

  it { should validate_presence_of(:name) }
  it { should ensure_length_of(:name).is_at_least(4).is_at_most(100) }
  it { should have_secure_password }
  it { should have_many :assignments }
  it { should have_many :projects }
  it { should have_many(:assigned_projects).through(:assignments) }
end

