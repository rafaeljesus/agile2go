require 'spec_helper'

describe User do
  it "should validate presence of first_name" do
    user = FactoryGirl.build(:user, first_name: nil)
    user.save
    expect(user.errors.messages[:first_name]).to eq(["can't be blank"])
  end

  it "should validate presence of last_name" do
    user = FactoryGirl.build(:user, last_name: nil)
    user.save
    expect(user.errors.messages[:last_name]).to eq(["can't be blank"])
  end

  describe "email validations" do
    it "should validate presence of email" do
      user = FactoryGirl.build(:user, email: nil)
      user.save
      expect(user.errors.messages[:email]).to eq(["can't be blank", "is invalid"])
    end

    it "should reject invalid email" do
      emails = %w(user@foo,com user_at_foo.org example.user@foo.)
      emails.each do |email|
        user = FactoryGirl.build(:user, email: email)
        user.save
        expect(user.errors.messages[:email]).to eq(["is invalid"])
      end
    end

    it "should reject duplicate email" do
      user = FactoryGirl.create(:user)
      user_with_duplicate_email = FactoryGirl.build(:user, email: user.email)
      user_with_duplicate_email.save
      expect(user_with_duplicate_email.errors.messages[:email]).to eq(["has already been taken"])
    end
  end

  describe "password validations" do
    it "should reject short passwords" do
      user = FactoryGirl.build(:user, password: 'a' * 7)
      user.save
      expect(user.errors.messages[:password]).to eq(["password must be greather then 8"])
    end
  end

  describe "associations" do
    it "should save a user with embedeed projects" do
      user = FactoryGirl.build(:user)
      user.projects << FactoryGirl.build(:project)
      user.save
      expect(user.projects.length).to eq(1)
    end
  end
end
