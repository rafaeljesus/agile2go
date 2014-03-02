class Sprint < ActiveRecord::Base
  belongs_to :project
  has_many :tasks
  accepts_nested_attributes_for :tasks

  validates :name, presence: true
  validates :points, presence: true
  validates :start_date, presence: true
  validates :end_date, presence: true
  validates :project_id, presence: true
end
