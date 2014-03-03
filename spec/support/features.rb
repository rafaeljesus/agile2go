RSpec.configure do |config|
  config.include Features::SessionHelpers, type: :feature
  config.include Features::ProjectHelpers, type: :feature
  config.include Features::SprintHelpers, type: :feature
  config.include Features::TaskHelpers, type: :feature
end
