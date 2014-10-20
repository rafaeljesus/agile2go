# require 'spec_helper'
#
# describe Dashboard do
#
#   it 'should check if status count is changed' do
#     dashboard = Dashboard.new(project_name: 'fake name')
#     expect(dashboard.changed?(changed_increments)).to be_truthy
#   end
#
#   it 'should check if status count  unchanged' do
#     dashboard = Dashboard.new(project_name: 'fake name', todo_count: 0)
#     expect(dashboard.changed?(unchanged_increments)).to be_falsy
#   end
#
#   def changed_increments
#     incs = {}
#     incs[:todo_count] = 1
#     incs[:done_count] = 1
#     incs[:done_count] = 1
#     incs[:done_count] = 1
#     incs
#   end
#
#   def unchanged_increments
#     incs = {}
#     incs[:todo_count] = 0
#     incs
#   end
# end
