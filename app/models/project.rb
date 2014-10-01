class Project
  include MongoMapper::EmbeddedDocument

  key :name, String, required: true
  key :company, String
  timestamps!

  many :sprints
end
