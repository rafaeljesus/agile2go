require 'spec_helper'

describe Modifier do

  describe 'when increase' do

    it 'should return todo_count increased' do
      task = FactoryGirl.build(:task)
      modifier = Modifier.new(task)
      expect(modifier.to_increase[:todo_count]).to eq(1)
    end

    it 'should return ongoing_count increased' do
      task = FactoryGirl.build(:task, status: 'ongoing')
      modifier = Modifier.new(task)
      expect(modifier.to_increase[:ongoing_count]).to eq(1)
    end

    it 'should return test_count increased' do
      task = FactoryGirl.build(:task, status: 'test')
      modifier = Modifier.new(task)
      expect(modifier.to_increase[:test_count]).to eq(1)
    end

    it 'should return done_count increased' do
      task = FactoryGirl.build(:task, status: 'done')
      modifier = Modifier.new(task)
      expect(modifier.to_increase[:done_count]).to eq(1)
    end
  end

  describe 'when decrease' do

    it 'should return todo_count decreased' do
      task = FactoryGirl.create(:task)
      modifier = Modifier.new(task)
      expect(modifier.to_decrease[:todo_count]).to eq(-1)
    end

    it 'should return ongoing_count decreased' do
      task = FactoryGirl.create(:task, status: 'ongoing')
      modifier = Modifier.new(task)
      expect(modifier.to_decrease[:ongoing_count]).to eq(-1)
    end

    it 'should return test_count decreased' do
      task = FactoryGirl.create(:task, status: 'test')
      modifier = Modifier.new(task)
      expect(modifier.to_decrease[:test_count]).to eq(-1)
    end

    it 'should return done_count decreased' do
      task = FactoryGirl.create(:task, status: 'done')
      modifier = Modifier.new(task)
      expect(modifier.to_decrease[:done_count]).to eq(-1)
    end
  end

end
