class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :company, :created_at
  has_many :assigned_users, embed_in_root: true, key: :assignedUsers
end
