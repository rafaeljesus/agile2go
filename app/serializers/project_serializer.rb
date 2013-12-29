class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :company, :created_at
  has_one :user
end
