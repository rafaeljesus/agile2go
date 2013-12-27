class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :company
  has_one :user
end
