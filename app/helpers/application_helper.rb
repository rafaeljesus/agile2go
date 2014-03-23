module ApplicationHelper

  def fayejs_path
    if ENV['RAILS_ENV'] == 'production'
      'agile2go-faye-server.herokuapp.com'
    else
      'localhost:9292'
    end
  end

end
