module ApplicationHelper

  def fayejs_path
    Sync::Faye.to_host
  end

  def test?
    ENV['RAILS_ENV'] == 'test'
  end

end
