class Task < ActiveRecord::Base
  belongs_to :sprint

  validates :title, presence: true
  validates :story, presence: true
end
