class CurrentUserSerializer < ActiveModel::Serializer
  attributes :name, :email, :signed_in
end
