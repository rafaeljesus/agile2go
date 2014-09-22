class ProjectSave
  include Virtus.model

  attribute :name, String
  attribute :company, String
  attribute :description, String
  attribute :assignments, Array[Integer]

  validate :project_name_is_uniq
  validates :name, presence: true
  validates_presence_of :company, :description

  def save
    return false unless valid?
    persist!
    true
  end

  private
  def persist!
    user = User.find(id: :user_id)
    project = Project.create! @params
    # project.assignments.create !
    # Assignment.create! project: project, user: user
  end

  def project_name_is_uniq
    unless Project.exists?(:name)
      errors.add(:base, 'Project name is taken')
    end
  end

end
