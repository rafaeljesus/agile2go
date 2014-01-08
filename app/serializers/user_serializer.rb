class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email
  has_many :assignments, serializer: AssignmentSerializer, include: true, key: :assignedProjects
end
