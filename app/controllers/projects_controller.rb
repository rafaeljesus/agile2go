class ProjectsController < ApplicationController
  before_action :set_project, only: [:show, :edit, :update, :destroy]
  respond_to :json, :html

  def index
    @projects = Project.all
    respond_with @projects
  end

  def show
  end

  def new
    @project = Project.new
  end

  def edit
  end

  def create
    @project = Project.new project_params
    flash[:notice] = 'Project was successfully created' if @project.save
    respond_with @project
  end

  def update
    flash[:notice] = 'Project was successfully updated' if @project.update project_params
    respond_with @project
  end

  def destroy
    flash[:notice] = 'Project was successfully destroyed' if @project.destroy
    respond_with @project
  end

  private
  def set_project
    @project = Project.find(params[:id])
  end

  def project_params
    params.require(:project).permit(:name, :description, :company, :user_id)
  end
end
