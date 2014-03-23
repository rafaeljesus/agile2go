# This file is used by Rack-based servers to start the application.
# require 'faye'
require ::File.expand_path('../config/environment',  __FILE__)

run Rails.application

# bayeux = Faye::RackAdapter.new(mount: '/faye', timeout: 25)
# run bayeux
