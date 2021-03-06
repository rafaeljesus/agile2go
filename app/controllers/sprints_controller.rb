class SprintsController < ApplicationController
  before_action :set_sprint, only: [:show, :edit, :update, :destroy]
  respond_to :json

  def index
    @sprints = Sprint.all
    respond_with @sprints
  end

  def edit
    respond_with @sprint
  end

  def create
    @sprint = Sprint.new sprint_params
    @sprint.save
    respond_with @sprint
  end

  def update
    @sprint.update_attributes sprint_params
    respond_with @sprint
  end

  def destroy
    @sprint.destroy
    respond_with @sprint
  end

  private
  def set_sprint
    @sprint = Sprint.find params[:id]
  end

  def sprint_params
    params
      .require(:sprint)
      .permit(:name, :daily, :points, :start_date, :end_date, :project_id)
  end
end
