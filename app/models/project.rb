class Project
  include MongoMapper::Document

  key :name, String, required: true, unique: true
  key :company, String
  key :user_ids, Array
  many :users, in: :user_ids
  timestamps!

end
