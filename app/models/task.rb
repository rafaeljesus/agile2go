class Task
  include MongoMapper::Document
  STATUSES = %w(todo ongoing test done)

  key :title, String, required: true
  key :story, String, required: true
  key :status, String, in: STATUSES
  key :priority, Integer, in: 1..5
  key :points, Integer, numeric: true
  timestamps!
  belongs_to :sprint

  scope :ordered, -> { sort(created_at: :desc)  }

  def self.search(query)
    collection
      .find('$or' => [
        {title: query},
        {story: query},
        {status: query},
        {points: query},
        {priority: query},
        {sprint_id: query}
      ])
      .sort(created_at: :desc)
      .to_a
  end

end
