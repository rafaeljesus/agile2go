class Task
  include MongoMapper::EmbeddedDocument
  # include Sync::Faye::Observer

  STATUSES = %w(todo ongoing test done)

  key :title, String, required: true
  key :story, String, required: true
  key :status, String, inclusion: { in: STATUSES }
  key :priority, Integer, in: 1..5
  key :points, Integer, numeric: true
  timestamps!

  # after_update :publish_update
  # after_create :publish_create
  # after_destroy :publish_destroy
end
