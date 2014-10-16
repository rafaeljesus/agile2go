class Dashboard
  include MongoMapper::Document

  key :project_name, String
  key :todo_count, Integer, default: 0
  key :ongoing_count, Integer, default: 0
  key :test_count, Integer, default: 0
  key :done_count, Integer, default: 0

end
