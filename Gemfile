ruby '2.0.0'
source 'https://rubygems.org'

gem 'rails', '4.0.0'
gem 'sass-rails', '~> 4.0.0'
gem 'handlebars_assets'
gem 'backbone-on-rails'
gem 'backbone-support'
gem 'uglifier', '>= 1.3.0'
gem 'jquery-rails'
gem 'select2-rails'
gem 'semantic-ui-sass', github: 'doabit/semantic-ui-sass'
gem 'active_model_serializers'
gem 'bcrypt-ruby', '~> 3.0.0'
gem 'puma'
gem 'foreman'
gem 'rolify'
gem 'cancan'
gem 'i18n-js'
gem 'i18n-js-pika', require: 'i18n-js'
gem 'faye'
gem 'thin'
gem 'omniauth'
gem 'omniauth-oauth2', '1.0.2'
gem 'omniauth-twitter'
gem 'omniauth-github'
gem 'omniauth-facebook', '1.4.0'
gem 'omniauth-google'
gem "codeclimate-test-reporter", group: :test, require: nil
gem 'virtus'

group :production do
  gem 'pg'
  gem 'rails_12factor'
end

group :test do
  gem 'shoulda-matchers'
  gem 'database_cleaner'
end

group :development, :test do
  gem 'capybara', '>= 2.0.2'
  gem 'selenium-webdriver'
  gem 'rspec-rails', '~> 3.0.0.beta'
  gem 'factory_girl_rails', '~> 4.0'
  gem 'sqlite3'
  gem 'jasmine'
  gem 'jasmine-jquery-rails'
  gem 'launchy'
end
