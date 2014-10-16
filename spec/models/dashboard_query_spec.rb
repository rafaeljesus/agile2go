require 'spec_helper'

describe DashboardQuery do

  # after { FactoryGirl.reload }

  it 'should update a dashboard' do
    # project = FactoryGirl.create(:project)
    # task = FactoryGirl.create(:task)
    # Dashboard.update task
  end

  it 'should count all tasks done of a given project' do
    # task = FactoryGirl.create :task
    # json = DashboardQuery.new.to_json
    # expect(json).to include(
    #   {
    #     series: [
    #       {name: "todo", data: [1]},
    #       {name: "ongoing", data: [0]},
    #       {name: "test", data: [0]},
    #       {name: "done", data: [0]}],
    #     categories: ["Project Fake1"]
    #   }
    # )
  end

  it 'should count all ongoing tasks of a given project' do
  #   task = FactoryGirl.create :task, status: 'ongoing'
  #   json = DashboardQuery.new.to_json
  #   expect(json).to include(
  #     {
  #       series: [
  #         {name: "todo", data: [0]},
  #         {name: "ongoing", data: [1]},
  #         {name: "test", data: [0]},
  #         {name: "done", data: [0]}],
  #       categories: ["Project Fake1"]
  #     }
  #   )
  end

  it 'should count all test tasks of a given project' do
    # task = FactoryGirl.create :task, status: 'test'
    # json = DashboardQuery.new.to_json
    # expect(json).to include(
    #   {
    #     series: [
    #       {name: "todo", data: [0]},
    #       {name: "ongoing", data: [0]},
    #       {name: "test", data: [1]},
    #       {name: "done", data: [0]}],
    #     categories: ["Project Fake1"]
    #   }
    # )
  end

  it 'should count all done tasks of a given project' do
    # task = FactoryGirl.create :task, status: 'done'
    # json = DashboardQuery.new.to_json
    # expect(json).to include(
    #   {
    #     series: [
    #       {name: "todo", data: [0]},
    #       {name: "ongoing", data: [0]},
    #       {name: "test", data: [0]},
    #       {name: "done", data: [1]}],
    #     categories: ["Project Fake1"]
    #   }
    # )
  end

end
