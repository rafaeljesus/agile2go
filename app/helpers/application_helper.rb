module ApplicationHelper

  def firebase_url
    ENV['FIREBASE_URL']
  end

  def test?
    ENV['RAILS_ENV'] == 'test'
  end

end
