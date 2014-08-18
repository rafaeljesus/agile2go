class Sprint < ActiveRecord::Base
  belongs_to :project
  has_many :tasks
  accepts_nested_attributes_for :tasks

  validates :name, :points, :project_id, presence: true
end
