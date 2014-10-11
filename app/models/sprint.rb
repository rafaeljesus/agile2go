class Sprint
  include MongoMapper::Document

  key :name, String, required: true, unique: true
  key :points, Integer, required: true, numeric: true
  key :daily, String
  key :start_date, Date
  key :end_date, Date
  timestamps!
  many :tasks
  belongs_to :project
end
