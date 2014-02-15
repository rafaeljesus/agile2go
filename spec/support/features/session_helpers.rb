module Features
  module SessionHelpers

    def sign_in
      user = sign_in_as FactoryGirl.create :user
      user
    end

    def sign_up
      user = sign_up_as FactoryGirl.build :user
      user
    end

    private
    def sign_in_as user
      visit '#sessions/new'
      fill_in 'email', with: user.email
      fill_in 'password', with: user.password
      find("[type='submit']").click
      user
    end

    def sign_up_as user
      visit '#users/new'
      fill_in 'name', with: user.name
      fill_in 'email', with: user.email
      fill_in 'password', with: user.password
      fill_in 'password-confirmation', with: user.password_confirmation
      click_button I18n.t('.sign_up')
      user
    end
  end
end
