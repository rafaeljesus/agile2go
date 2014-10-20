class ProjectCreate

  def initialize(params)
    @project = Project.new(params)
    @dashboard = Dashboard.new(project_name:  @project.name)
  end

  def save
    return unless @project.valid?
    @project.save!
    @dashboard.save
  end

  def self.model_name
    ActiveModel::Name.new(self, nil, 'Project')
  end

end
