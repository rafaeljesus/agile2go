class SprintSerializer < ActiveModel::Serializer
  attributes :id, :name, :daily, :points, :start_date, :end_date
  has_one :project
end
