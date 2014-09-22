require 'spec_helper'

describe Task do
  it { should validate_presence_of(:title) }
  it { should validate_presence_of(:story) }
  it { should validate_inclusion_of(:status).in_array(Task::STATUSES) }
  it { should allow_value(10).for(:priority) }
  it { should belong_to(:sprint) }
  it { should have_db_index(:sprint_id) }
end
