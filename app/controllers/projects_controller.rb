class ProjectsController < ApplicationController
  before_action :set_project, only: [:show, :edit, :update, :destroy]
  respond_to :json

  def index
    @projects = Project.all
    respond_with @projects
  end

  def edit
    @users = User.all
    respond_with [@project, @users]
  end

  def create
    @project = Project.new project_params
    @project.save
    respond_with @project
  end

  def update
    @project.update project_params
    respond_with @project
  end

  def destroy
    @project.destroy
    respond_with @project
  end

  private
  def set_project
    @project = Project.find(params[:id])
  end

  def project_params
    params.require(:project)
      .permit(:name, :description, :company, user_ids: [])
  end
end
