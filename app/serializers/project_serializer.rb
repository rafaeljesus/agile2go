class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :company, :created_at
  has_many :assignments, serializer: AssignmentSerializer, include: true, key: :assignedUsers
end
