class Project
  include MongoMapper::Document

  key :name, String, required: true, unique: true
  key :company, String
  timestamps!
  many :sprints
  belongs_to :user

  validates_associated :sprints

  def self.task_search(query)
    collection
      .find('sprints.tasks' => { '$or' => [{'title' => query}, {'story' => query}, {'status' => query}] })
      .sort(created_at: :desc)
      .to_a
  end

  def sprint_name_uniq?(name)
    is_uniq = collection.find('sprints.name' => name).count == 0
    unless is_uniq
      errors.add(:sprint_name, 'sprint name has already been taken')
    end
    is_uniq
  end

end
