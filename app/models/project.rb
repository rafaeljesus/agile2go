class Project < ActiveRecord::Base
  has_many :assignments
  has_many :users, through: :assignments
  has_many :assigned_users, through: :assignments, class_name: "User", source: :user
  has_many :sprints
  has_many :tasks, through: :sprints

  accepts_nested_attributes_for :assignments

  validates :name, presence: true, uniqueness: true
  validates_presence_of :company, :description

  def self.find_by_user(current_user)
    where(user_id: current_user.id).limit(10)
  end

  def self.exists?(name)
    where(name: name).count == 0
  end

  def self.project_names
    @@cached_names ||= Project.pluck(:name)
  end
end
