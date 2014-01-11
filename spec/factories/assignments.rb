FactoryGirl.define do
  factory :assignment do
    association :project, factory: :project, strategy: :build
    association :user, factory: :user, strategy: :build
  end
end
