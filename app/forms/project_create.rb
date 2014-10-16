class ProjectCreate

  def initialize(params)
    @project = Project.new(params)
  end

  def save
    return false unless @project.valid?
    @project.save!
    save_dashboard
    true
  end

  def self.model_name
    ActiveModel::Name.new(self, nil, 'Project')
  end

  private
  def save_dashboard
    dashboard = Dashboard.new(project_name:  @project.name)
    dashboard.save
  end

end
