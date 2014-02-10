class SprintSerializer < ActiveModel::Serializer
  attributes :id, :daily, :points, :start_date, :end_date
  has_one :project
end
