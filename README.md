Agile2Go
--------

This is a WORK IN PROGRESS

Agile2Go is a well tested single page app, perfect for small agile teams.
Built with Backbone.js and Rails.

Setup
-----

* git clone https://github.com/rafaeljesus/agile2go.git
* cd agile2go
* bundle
* rake db:setup

Deploy
------

Deploy at Heroku:

* heroku create --stack cedar
* git push heroku master
* heroku run rake db:migrate
* heroku restart

Development
-----------

* Template Engine: Handlebars
* Testing Framework: RSpec, Capybara, Factory Girl, Jasmine
* Front-end Framework: Semantic-ui (SASS), Backbone.js
* Authorization: CanCan
* Database: PostgresSQL
* Server: Puma
* Editor: VI - Github theme

Contribute
----------

* See the [style guide](https://github.com/copycopter/style-guide).
* See also [development guide](https://github.com/thoughtbot/guides).

Maintaners
----------

* [Rafael Jesus](https://github.com/rafaeljesus)
