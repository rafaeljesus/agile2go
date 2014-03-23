module BackboneSync
  module Faye
    module Observer
      def publish_update
        Event.new(self, :update).broadcast
      end

      def publish_create
        Event.new(self, :create).broadcast
      end

      def publish_destroy
        Event.new(self, :destroy).broadcast
      end
    end

    class Event
      def initialize(model, event)
        @model = model
        @event = event
      end

      def broadcast
        Net::HTTP.post_form(uri, message: message)
      end

      private

      def uri
        URI.parse("#{host}/faye")
      end

      def host
        if ENV['RAILS_ENV'] == 'production'
          'http://agile2go.herokuapp.com:9292'
        else
          'http://localhost:9292'
        end
      end

      def message
        { channel: channel, data: data }.to_json
      end

      def channel
        "/sync/#{@model.class.table_name}"
      end

      def data
        { @event => { @model.id => @model.as_json } }
      end
    end
  end
end
