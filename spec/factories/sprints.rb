FactoryGirl.define do
  factory :sprint do
    daily '10:00'
    points 300
    start_date '2014/02/09'.to_date
    end_date '2014/02/09'.to_date
    association :project
  end
end
