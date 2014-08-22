module Sync
  module Faye

    def self.to_host
      return ENV['FAYE_REMOTE'] if ENV['RAILS_ENV'] == 'production' || ENV['TRAVIS']
      ENV['FAYE_LOCAL']
    end

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
  end
end
