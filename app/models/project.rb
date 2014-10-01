class Project
  include MongoMapper::EmbeddedDocument

  key :name, String
  key :company, String
  timestamps!

  many :sprints
end
