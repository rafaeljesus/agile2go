class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :company, :created_at
  has_many :assigned_users, include: true, key: :assignedUsers
end
