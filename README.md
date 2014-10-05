Agile2Go [![Build Status](https://travis-ci.org/rafaeljesus/agile2go.svg?branch=master)](https://travis-ci.org/rafaeljesus/agile2go) [![Test Coverage](https://codeclimate.com/github/rafaeljesus/agile2go/badges/coverage.svg)](https://codeclimate.com/github/rafaeljesus/agile2go) [![Code Climate](https://codeclimate.com/github/rafaeljesus/agile2go/badges/gpa.svg)](https://codeclimate.com/github/rafaeljesus/agile2go)
===============

This is app is for my portfolio

Agile2Go is a well tested app, running on AWS, built with backbone.js, Rails as API and mongodb as database

Setup
-----

* git clone https://github.com/rafaeljesus/agile2go.git
* cd agile2go
* bundle
* rake db:setup

Run locally:

```
$ foreman start -f Profile.development
```

Or see other available options here instead of Puma https://github.com/faye/faye-websocket-ruby

Development
-----------

* Testing: RSpec, Jasmine
* Front-end: Semantic-ui, Backbone.js, Handlebars
* Database: Mongodb
* Server: Puma

Tests
------
* bundle exec rake
* bundle exec rake jasmine

Contribute
----------

* See the [style guide](https://github.com/copycopter/style-guide).
* See also [development guide](https://github.com/thoughtbot/guides).

Maintaners
----------

* [Rafael Jesus](https://github.com/rafaeljesus)
