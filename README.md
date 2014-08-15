Agile2Go [![Build Status](https://travis-ci.org/rafaeljesus/agile2go.svg?branch=master)](https://travis-ci.org/rafaeljesus/agile2go) [![Coverage Status](https://img.shields.io/coveralls/rafaeljesus/agile2go.svg)](https://coveralls.io/r/rafaeljesus/agile2go)
===============

This is a WORK IN PROGRESS

Agile2Go is a well tested real time single page app, perfect for small agile teams.
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

* heroku create
* git push heroku master
* heroku run rake db:migrate
* heroku restart
* heroku run RACK_ENV=production foreman start

Run Faye in Heroku:

* see https://github.com/rafaeljesus/faye-ruby-server

Run Faye locally:

Running the app with Puma

```
$ puma faye/config.ru -p 9292
```

Or see other available options here https://github.com/faye/faye-websocket-ruby

Development
-----------

* Template Engine: Handlebars
* Testing Framework: RSpec, Capybara, Factory Girl, Jasmine
* Front-end Framework: Semantic-ui (SASS), Backbone.js
* Authorization: CanCan
* Database: PostgresSQL
* Server: Puma with 2 worker in cluster mode
* Editor: VI - Github theme

Tests
------
* bundle exec rake jasmine

Contribute
----------

* See the [style guide](https://github.com/copycopter/style-guide).
* See also [development guide](https://github.com/thoughtbot/guides).

Maintaners
----------

* [Rafael Jesus](https://github.com/rafaeljesus)
