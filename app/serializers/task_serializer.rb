class TaskSerializer < ActiveModel::Serializer
  attributes :id, :title, :story, :status, :priority, :points, :created_at
  has_many :assigned_users, include: true, key: :assignedUsers
  has_one :sprint
end
