FactoryGirl.define do
  factory :sprint do
    name 'Name Fake'
    points 300
    daily Time.new
    start_date Date.new(2014, 01, 01).to_s
    end_date Date.new(2014, 01, 01).to_s
  end
end
