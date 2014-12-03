class Task
  include MongoMapper::Document

  STATUSES = %w(todo ongoing test done)

  key :title, String, required: true
  key :story, String, required: true
  key :status, String, in: STATUSES
  key :priority, Integer, in: 1..5
  key :points, Integer, numeric: true
  key :user_ids, Array
  many :users, in: :user_ids
  timestamps!
  belongs_to :sprint

  scope :ordered, -> { sort(created_at: :desc) }

  def self.search(query)
    collection.find('$or' => [
        { title: query },
        { story: query },
        { status: query },
        { points: query },
        { priority: query },
        { sprint_id: query }
      ]).sort(created_at: :desc).to_a
  end

  def increment
    modify(1)
  end

  def decrement
    modify(-1)
  end

  private
  def modify(qty)
    incs = {}
    if is_todo
      incs[:todo_count] = qty
    elsif is_ongoing
      incs[:ongoing_count] = qty
    elsif is_test
      incs[:test_count] = qty
    elsif is_done
      incs[:done_count] = qty
    end
    incs
  end

  def is_todo
    status == 'todo'
  end

  def is_ongoing
    status == 'ongoing'
  end

  def is_test
    status == 'test'
  end

  def is_done
    status == 'done'
  end
end
