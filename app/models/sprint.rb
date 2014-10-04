class Sprint
  include MongoMapper::EmbeddedDocument

  key :name, String, required: true
  key :points, Integer, required: true, numeric: true
  key :daily, Time
  key :start_date, Date
  key :end_date, Date
  timestamps!
  many :tasks
end
