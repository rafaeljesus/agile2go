require 'spec_helper'

describe Task do
  it { should validate_presence_of(:title) }
  it { should validate_presence_of(:story) }
  it { should allow_value(10).for(:priority) }
  it { should belong_to(:sprint) }
  it { should have_db_index(:sprint_id) }
end
