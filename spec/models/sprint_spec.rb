require 'spec_helper'

describe Sprint do
  it { should validate_presence_of(:start_date) }
  it { should validate_presence_of(:end_date) }
  it { should validate_presence_of(:project_id) }
  it { should validate_presence_of(:points) }
  it { should ensure_inclusion_of(:points).in_array(Sprint::POINTS) }
  it { validates_numericality_of :points, only_integer: true }
  it { should allow_value(Date.today).for(:start_date) }
  it { should allow_value(Date.today).for(:end_date) }
  it { should allow_value(Time.now).for(:daily) }
  it { should allow_value('2014-01-01').for(:start_date) }
  it { should allow_value('2014-01-01').for(:end_date) }

end
