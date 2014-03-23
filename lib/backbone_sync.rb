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
  end
end
