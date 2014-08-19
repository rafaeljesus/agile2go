FactoryGirl.define do
  factory :sprint do
    name 'SprintFake'
    daily '10:00'
    points 300
    start_date '2014/02/09'
    end_date '2014/02/09'
    association :project
  end
end
