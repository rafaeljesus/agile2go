require 'spec_helper'

describe Project do
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:company) }
  it { should validate_presence_of(:description) }

  it { should validate_uniqueness_of(:name) }

  it { should have_many(:assignments) }
  it { should have_many(:users).through(:assignments) }
  it { should have_many(:assigned_users).through(:assignments) }

  it { should accept_nested_attributes_for(:assignments) }
end
