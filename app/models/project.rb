class Project
  include MongoMapper::Document

  key :name, String, required: true, unique: true
  key :company, String
  timestamps!
  many :sprints
  many :users

end
