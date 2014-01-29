FactoryGirl.define do
  factory :project do
    sequence(:name) { |i| "Project #{i}" }
    sequence(:company) { |i| "MyString #{i}" }
    description "blablabla"
  end
end
