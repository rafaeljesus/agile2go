require 'spec_helper'

describe Sprint do
  it { should validate_presence_of(:start_date) }
  it { should validate_presence_of(:end_date) }
  it { should validate_presence_of(:project_id) }
  it { should validate_presence_of(:points) }
  it { should ensure_inclusion_of(:points).in_array(Sprint::POINTS) }
  it { should validate_numericality_of(:points) }
  it { should allow_value(Date.today).for(:start_date) }
  it { should allow_value(Date.today).for(:end_date) }
  it { should allow_value(Time.now).for(:daily) }
  it { should belong_to :project }
end
