ENV["RAILS_ENV"] ||= 'test'

require 'codeclimate-test-reporter'
require File.expand_path("../../config/environment", __FILE__)
require 'rspec/rails'

Dir[Rails.root.join("spec/support/**/*.rb")].each { |f| require f }

CodeClimate::TestReporter.start

ActiveRecord::Migration.check_pending! if defined?(ActiveRecord::Migration)

RSpec.configure do |config|
  config.use_transactional_fixtures = false
  config.infer_base_class_for_anonymous_controllers = true
  config.order = "random"
  config.mock_framework = :mocha
  config.before(:all) { FactoryGirl.reload }
end
