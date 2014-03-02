class TaskSerializer < ActiveModel::Serializer
  attributes :title, :story, :status, :priority, :created_at, :id
  has_one :sprint
end
