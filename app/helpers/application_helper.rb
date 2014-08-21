module ApplicationHelper

  def fayejs_path
    if ENV['RAILS_ENV'] == 'production' || ENV['TRAVIS']
      'https://faye-ruby-server.herokuapp.com'
    else
      'http://localhost:9292'
    end
  end

end
