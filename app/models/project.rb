class Project
  include MongoMapper::EmbeddedDocument

  key :name, String
  key :company, String
  key :description, String
  timestamps!

  def self.exists?(name)
    where(name: name).count == 0
  end

  def self.project_names
    @@cached_names ||= Project.pluck(:name)
  end
end
