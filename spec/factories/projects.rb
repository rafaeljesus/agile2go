FactoryGirl.define do
  factory :project do
    sequence(:name) { |i| "Project Fake#{i}" }
    sequence(:company) { |i| "Company Fake#{i}" }
  end
end
