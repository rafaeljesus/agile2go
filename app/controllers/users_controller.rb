class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]
  respond_to :json

  def index
    @users = User.all
    respond_with @users
  end

  def show
  end

  def new
    @user = User.new
  end

  def edit
  end

  def create
    @user = User.new(user_params)
    flash[:notice] = 'User was successfully created' if @user.save
    respond_with @user, location: users_path
  end

  def update
    flash[:notice] = 'User was successfully updated' if @user.update(user_params)
    respond_with @user, location: edit_user_path
  end

  def destroy
    @user.destroy
    flash[:notice] = 'User was successfully destroyed.'
    respond_with @user
  end

  private
  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:name, :email, :password)
  end
end
