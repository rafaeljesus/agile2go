class TaskObserver < ActiveRecord::Observer
  include BackboneSync::Faye::Observer
end
