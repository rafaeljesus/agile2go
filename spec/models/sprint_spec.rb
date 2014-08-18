require 'spec_helper'

describe Sprint do
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:project_id) }
  it { should validate_presence_of(:points) }
  it { should allow_value(Date.today).for(:start_date) }
  it { should allow_value(Date.today).for(:end_date) }
  it { should belong_to :project }
  it { should have_db_index(:project_id) }
end
