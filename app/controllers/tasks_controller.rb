class TasksController < ApplicationController
  before_action :set_task, only: [:show, :edit, :update, :destroy]
  respond_to :json

  def index
    respond_with Task.all
  end

  def edit
    @sprints = Sprint.all
    respond_with [@task, @sprints], root: false
  end

  def create
    @task = Task.new task_params
    @task.save
    respond_with @task
  end

  def update
    @task.update task_params
    respond_with @task
  end

  def destroy
    @task.destroy
    respond_with @task
  end

  private
  def set_task
    @task = Task.find params[:id]
  end

  def task_params
    params.require(:task)
      .permit(:title, :story, :status, :priority, :points, :sprint_id)
      .merge(user_assignments_attributes: params[:user_assignments_attributes] || [])
  end
end
