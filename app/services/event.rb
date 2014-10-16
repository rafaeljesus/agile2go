require 'net/http'

class Event
  def initialize(model, event)
    base_uri = 'scorching-heat-1523.firebaseio.com'
    @ferebase = Firebase::Client.new(base_uri)
    @model = model
    @event = event
  end

  def broadcast
    @firebase.push(data)
  end

  private
  def data
    { @event => { @model.id => @model.as_json } }
  end
end
