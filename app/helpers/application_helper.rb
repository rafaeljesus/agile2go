module ApplicationHelper

  def test?
    ENV['RAILS_ENV'] == 'test'
  end

end
