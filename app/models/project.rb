class Project
  include MongoMapper::Document

  key :name, String, required: true, unique: true
  key :company, String
  timestamps!

  belongs_to :user
  many :sprints

  def sprint_name_uniq?(name)
    is_uniq = collection.find('sprints.name' => name).count == 0
    unless is_uniq
      errors.add(:sprint_name, 'sprint name has already been taken')
    end
    is_uniq
  end

  def sprint_name_blank?
    sprints.each do |s|
      if s.name.nil?
        errors.add(:sprint_name, "can't be blank")
        return true
      end
    end
    return false
  end

  def task_title_blank?
    sprints.each do |s_doc|
      s_doc.tasks.each do |t_doc|
        if t_doc.title.nil?
          errors.add(:task_title, "can't be blank")
          return true
        end
      end
    end
    return false
  end
end
