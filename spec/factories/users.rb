FactoryGirl.define do
  factory :user do
    sequence(:name) { |i| "User Fake #{i}" }
    sequence(:email) { |i| "fake#{i}@fake.com" }
    password "fake1234"
    password_confirmation "fake1234"
  end
end
