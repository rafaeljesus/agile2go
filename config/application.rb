require File.expand_path('../boot', __FILE__)

require 'rails/all'

Bundler.require(:default, Rails.env)

module Agile2go
  class Application < Rails::Application
    config.generators do |g|
      g.test_framework :rspec, fixture: true
      g.fixture_replacement :factory_girl, dir: 'spec/factories'
      g.view_specs false
      g.helper_specs false
      g.controller_specs false
      g.routing_specs false
      g.stylesheets = false
      g.javascripts = false
      g.helper = false
    end
    config.assets.initialize_on_precompile = true
    config.autoload_paths += %W(#{config.root}/lib)
  end
end
