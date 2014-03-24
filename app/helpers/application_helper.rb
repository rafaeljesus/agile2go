module ApplicationHelper

  def fayejs_path
    if ENV['RAILS_ENV'] == 'production'
      'https://faye-ruby-server.herokuapp.com'
    else
      'http://localhost:9292'
    end
  end

end
