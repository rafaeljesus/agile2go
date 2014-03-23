# This file is used by Rack-based servers to start the application.
require ::File.expand_path('../config/environment',  __FILE__)
run Rails.application

# thin start -R config.ru -p 9292

# require 'faye'
# Faye::WebSocket.load_adapter('thin')
# bayeux = Faye::RackAdapter.new(mount: '/faye', timeout: 25)
# run bayeux
