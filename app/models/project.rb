class Project < ActiveRecord::Base
  has_many :assignments
  has_many :users, through: :assignments
  has_many :assigned_users, through: :assignments, class_name: "User", source: :user
  accepts_nested_attributes_for :assignments

  validates :name, presence: true, uniqueness: true
  validates_presence_of :company, :description

  def self.find_by_user(current_user)
    where(user_id: current_user.id).limit(10)
  end
end
