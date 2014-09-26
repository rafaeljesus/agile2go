# Capybara.register_driver :selenium_with_long_timeout do |app|
#   client = Selenium::WebDriver::Remote::Http::Default.new
#   client.timeout = 120
#   Capybara::Selenium::Driver.new(app, browser: :firefox, http_client: client)
# end

# Capybara.javascript_driver = :selenium_with_long_timeout
Capybara.javascript_driver = :webkit
