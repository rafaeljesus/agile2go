class Project < ActiveRecord::Base
  has_many :assignments
  has_many :users, through: :assignments
  has_many :assigned_users, through: :assignments, class_name: "User", source: :user
  has_many :sprints
  has_many :tasks, through: :sprints

  accepts_nested_attributes_for :assignments

  validates :name, presence: true, uniqueness: true
  validates_presence_of :company, :description

  def self.count_all_tasks_with(project_name, status)
    count('tasks.id', joins: 'INNER JOIN sprints ON sprints.project_id = projects.id INNER JOIN tasks ON tasks.sprint_id = sprints.id', conditions: "projects.name = '#{project_name}' AND tasks.status = '#{status}'" )
  end

  def self.find_by_user(current_user)
    where(user_id: current_user.id).limit(10)
  end
end
