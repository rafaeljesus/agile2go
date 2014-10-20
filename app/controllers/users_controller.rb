class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]
  respond_to :json

  def index
    @users = User.all
    respond_with @users
  end

  def edit
    respond_with @user
  end

  def create
    @user = User.new user_params
    @user.save
    respond_with @user
  end

  def update
    @user.update_attributes user_params
    respond_with @user
  end

  def destroy
    @user.destroy
    respond_with @user
  end

  private
  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params
      .require(:user)
      .permit(:first_name, :last_name, :email)
      .merge(password: params[:password])
  end
end
