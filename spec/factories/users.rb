FactoryGirl.define do
  factory :user do
    sequence(:name) { |i| "Fake #{i}" }
    sequence(:email) { |i| "fake#{i}@example.com" }
    password "fake1234"
    password_confirmation "fake1234"
  end
end
