class TasksController < ApplicationController
  before_action :set_task, only: [:show, :edit, :update, :destroy]
  respond_to :json

  def index
    @tasks = Task.ordered
    respond_with @tasks
  end

  def edit
    respond_with @task
  end

  def create
    task_form = TaskCreate.new(task_params)
    task_form.save
    respond_with task_form
  end

  def update
    task_form = TaskUpdate.new(@task, task_params)
    task_form.save
    respond_with task_form
  end

  def destroy
    task_form = TaskDestroy.new(@task)
    task_form.destroy
    respond_with task_form
  end

  def search
    tasks = TaskSearch.search(params[:query])
    respond_with tasks
  end

  private
  def set_task
    @task = Task.find(params[:id])
  end

  def task_params
    params
      .require(:task)
      .permit(:title, :story, :status, :priority, :points, :sprint_id, user_ids: [])
  end
end
