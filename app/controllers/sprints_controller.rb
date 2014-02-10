class SprintsController < ApplicationController
  before_action :set_sprint, only: [:show, :edit, :update, :destroy]

  # GET /sprints
  def index
    @sprints = Sprint.all
  end

  # GET /sprints/1
  def show
  end

  # GET /sprints/new
  def new
    @sprint = Sprint.new
  end

  # GET /sprints/1/edit
  def edit
  end

  # POST /sprints
  def create
    @sprint = Sprint.new(sprint_params)

    if @sprint.save
      redirect_to @sprint, notice: 'Sprint was successfully created.'
    else
      render action: 'new'
    end
  end

  # PATCH/PUT /sprints/1
  def update
    if @sprint.update(sprint_params)
      redirect_to @sprint, notice: 'Sprint was successfully updated.'
    else
      render action: 'edit'
    end
  end

  # DELETE /sprints/1
  def destroy
    @sprint.destroy
    redirect_to sprints_url, notice: 'Sprint was successfully destroyed.'
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_sprint
      @sprint = Sprint.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def sprint_params
      params.require(:sprint).permit(:daily, :points, :start_date, :end_date, :project_id)
    end
end
