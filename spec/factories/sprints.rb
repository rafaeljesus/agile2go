FactoryGirl.define do
  factory :sprint do
    name 'SprintFake'
    daily '10:00'
    points 300
    start_date Date.new(2014, 01, 01).to_s
    end_date Date.new(2014, 01, 01).to_s
    association :project
  end
end
