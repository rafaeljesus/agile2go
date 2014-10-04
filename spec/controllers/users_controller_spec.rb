require 'spec_helper'

describe UsersController, type: :controller do

  it "should return a users collection" do
    xhr :get, :index
    expect(response).to be_success
  end

  it "should return a user for edit" do
    user = FactoryGirl.create(:user)
    xhr :get, :edit, id: user.id
    expect(response).to be_success
  end

  it "should create a new user" do
    new_user = FactoryGirl.attributes_for(:user)
    hash = {
      user: new_user,
      password: new_user[:password],
      password_confirmation: new_user[:password_confirmation]
    }
    xhr :post, :create, hash
    expect(response).to be_success
  end

  it "should update a password from existing user" do
    user = FactoryGirl.create(:user)
    hash = {
      id: user.id,
      password: 'new_password',
      password_confirmation: 'new_password',
      user: {
        id: user.id
      }
    }
    xhr :put, :update, hash
    expect(response).to be_success
  end

  it "should destroy a existing user" do
    user = FactoryGirl.create(:user)
    xhr :delete, :destroy, id: user.id
    expect(response).to be_success
  end
end
