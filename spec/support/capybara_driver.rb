Capybara.javascript_driver = :poltergeist

Capybara.register_driver :poltergeist do |app|
  options = {
    phantomjs_options: ['--load-images=no', '--ignore-ssl-errors=yes'],
    phantomjs_logger: Puma::NullIO.new,
    logger: nil,
    js_errors: true,
    debug: true,
    timeout: 60
  }
  Capybara::Poltergeist::Driver.new(app, options)
end
