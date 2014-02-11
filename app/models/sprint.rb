class Sprint < ActiveRecord::Base
  POINTS = [ 1, 2, 3, 5, 8, 13, 20, 40, 100 ]

  belongs_to :project

  validates :points, presence: true, numericality: { only_integer: true }, inclusion: { in: POINTS }
  validates :start_date, presence: true
  validates :end_date, presence: true
  validates :project_id, presence: true
end
