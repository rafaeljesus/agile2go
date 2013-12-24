require "action_controller"
require "responders/flash"

module Responders
  class Agile2goResponder < ActionController::Responder
    include Flash
  end

  module Flash
    def to_html
      set_flash_message! unless get?
      super
    end

    private
    def set_flash_message!
      status = has_errors? ? :alert : :notice
      return if controller.flash[status].present?
      message = i18n_lookup status
      controller.flash[status] = message if message.present?
    end

    def i18n_lookup(status)
      namespace = controller.controller_path.gsub("/", ".")
      action = controller.action_name
      lookup = [namespace, action, status].join(".").to_sym
      default = ["actions", action, status].join(".").to_sym
      I18n.t(lookup, scope: :flash, default: default, resource_name: resource.class.model_name.human)
    end
  end
end

ActionController::Base.responder = Responders::Agile2goResponder
require "active_support/i18n"
I18n.load_path << File.expand_path("../responders/locales/en.yml", __FILE__)
