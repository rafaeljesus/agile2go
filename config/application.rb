require File.expand_path('../boot', __FILE__)
require "action_controller/railtie"
require "action_mailer/railtie"
require "active_model/railtie"
require "action_view/railtie"
require "sprockets/railtie"
require "rails/test_unit/railtie"

Bundler.require(:default, Rails.env)

module Agile2go
  class Application < Rails::Application
    config.autoload_paths += %W(#{config.root}/lib)
    config.middleware.delete Rack::Lock
    config.generators do |g|
      g.orm :mongo_mapper
      g.test_framework :rspec, fixture: true
      g.fixture_replacement :factory_girl, dir: 'spec/factories'
      g.view_specs false
      g.helper_specs false
      g.routing_specs false
      g.request_specs false
      g.stylesheets = false
      g.javascripts = false
      g.helper = false
    end
  end
end
