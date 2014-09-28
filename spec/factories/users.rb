FactoryGirl.define do
  factory :user do
    sequence(:first_name) { |i| "Fake first #{i}" }
    sequence(:last_name) { |i| "Fake last #{i}" }
    sequence(:email) { |i| "fake#{i}@example.com" }
    password "fake1234"
    # password_confirmation "fake1234"
  end
end
