class TaskSerializer < ActiveModel::Serializer
  attributes :id, :title, :story, :status, :priority, :points, :created_at
  has_many :assigned_users, embed_in_root: true, key: :assignedUsers
  has_one :sprint
end
