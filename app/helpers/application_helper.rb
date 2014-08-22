module ApplicationHelper
  def fayejs_path
    Sync::Faye.to_host
  end
end
