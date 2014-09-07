class Sprint < ActiveRecord::Base
  belongs_to :project
  has_many :tasks

  validates :name, :points, :project_id, presence: true
end
