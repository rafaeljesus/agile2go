require 'spec_helper'

describe User do
  it 'should be master' do
    user = FactoryGirl.build :user
    user.add_role :master
    ability = Ability.new user
    is_master = ability.can? :manage, :all
    expect(is_master).to be true
  end
end

describe User do
  context '#name' do
    it { should validate_presence_of(:name) }
    it { should ensure_length_of(:name)
      .is_at_least(4)
      .is_at_most(100)
      .with_short_message(/4 is the minimum allowed/)
      .with_long_message(/maximum/) }
  end

  context '#email' do
    it { should validate_presence_of(:email) }
    it { should allow_value("a@b.com").for(:email) }
    it { should allow_value("A@B.com").for(:email) }
    it { should_not allow_value("blah").for(:email) }
    it { should_not allow_value("blah@blah,com").for(:email) }
    it { should_not allow_value("blah_blah.com").for(:email) }
    it { should_not allow_value("blah.user@bla.").for(:email) }

    it 'should validate uniqueness of email' do
      old_user = FactoryGirl.create :user
      new_user = FactoryGirl.build :user, email: old_user.email
      new_user.valid?
      expect(new_user.errors.messages[:email]).to eq ['has already been taken']
    end
  end

  context '#password' do
    it { should validate_presence_of(:password) }
    it { should validate_confirmation_of(:password) }
    it { should have_secure_password }
    it { should ensure_length_of(:password).is_at_least(8).with_short_message(/8 is the minimum allowed/) }
  end
end
