require 'spec_helper'

describe User do
  it 'should be master' do
    user = FactoryGirl.build :user
    user.add_role :master
    ability = Ability.new user
    is_master = ability.can? :manage, :all
    expect(is_master).to be true
  end

  it 'should be a po' do
    pending
  end

  it 'should be a team' do
    pending
  end
end

describe User do
  context 'name' do
    it { should validate_uniqueness_of(:name) }
    it { should validate_presence_of(:name) }
    it { should ensure_length_of(:name)
      .is_at_least(4)
      .is_at_most(30)
      .with_short_message(/4 is the minimum allowed/)
      .with_long_message(/maximum/) }
  end

  context 'email' do
    it { should validate_uniqueness_of(:email) }
    it { should validate_presence_of(:email) }
    it { should allow_value("a@b.com").for(:email) }
    it { should allow_value("A@B.com").for(:email) }
    it { should_not allow_value("blah").for(:email) }
    it { should_not allow_value("blah@blah,com").for(:email) }
    it { should_not allow_value("blah_blah.com").for(:email) }
    it { should_not allow_value("blah.user@bla.").for(:email) }
  end

  context 'password' do
    it { should validate_presence_of(:password) }
    it { should validate_confirmation_of(:password) }
    it { should ensure_length_of(:password).is_at_least(8).with_short_message(/8 is the minimum allowed/) }
  end
end
