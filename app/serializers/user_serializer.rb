class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email
  has_many :assignments, serializer: AssignmentSerializer, embed_in_root: true, key: :assignedProjects
end
