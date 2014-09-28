RSpec.configure do |config|
  config.before :suite do
    DatabaseCleaner.clean_with :truncation
  end

  config.before :each, type: :feature do
    config.verbose_retry = true
    config.default_retry_count = 3
  end

  config.before :each do
    DatabaseCleaner.start
    DatabaseCleaner.strategy = :transaction
  end

  config.after :each do
    DatabaseCleaner.clean
  end

  config.before :each, js: true do
    DatabaseCleaner.strategy = :truncation
    FactoryGirl.reload
  end

  config.after :each, :js do
    Capybara.reset_sessions!
  end

end
