class TaskSerializer < ActiveModel::Serializer
  attributes :id, :title, :story, :status, :priority, :points, :created_at
  has_one :sprint
end
