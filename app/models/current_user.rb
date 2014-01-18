class CurrentUser
  attr_reader :name, :email, :signed_in

  def initialize(current_user, user_signed_in)
    @name = current_user.name if current_user
    @email = current_user.email if current_user
    @signed_in = user_signed_in
  end
end
