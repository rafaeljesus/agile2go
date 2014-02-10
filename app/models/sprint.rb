class Sprint < ActiveRecord::Base
  DATE_REGEX = /$\d{4}-\d{2}-\d{2}/
  POINTS = [ 1, 2, 3, 5, 8, 13, 20, 40, 100]

  belongs_to :project

  validates :points, numericality: true, inclusion: { in: POINTS }
  validates :start_date, presence: true , format: DATE_REGEX
  validates :end_date, presence: true, format: DATE_REGEX
  validates :project_id, presence: true
end
