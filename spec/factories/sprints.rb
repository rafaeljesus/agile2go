FactoryGirl.define do
  factory :sprint do
    daily Time.now
    points 3
    start_date '2014-02-09'.to_date
    end_date '2014-02-09'.to_date
    project
  end
end
