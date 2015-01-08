Agile2Go [![Circle CI](https://circleci.com/gh/rafaeljesus/agile2go.svg?style=svg)](https://circleci.com/gh/rafaeljesus/agile2go) [![Test Coverage](https://codeclimate.com/github/rafaeljesus/agile2go/badges/coverage.svg)](https://codeclimate.com/github/rafaeljesus/agile2go) [![Code Climate](https://codeclimate.com/github/rafaeljesus/agile2go/badges/gpa.svg)](https://codeclimate.com/github/rafaeljesus/agile2go)
===============

This is app is for my portfolio

Agile2Go is a well tested app, running on Elastic Beanstalk, built with backbone.js, Rails as API, Firebase for realtime and Mongolab as DaaS

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

Development
-----------

* Testing: RSpec, Jasmine
* Front-end: Semantic-ui, Backbone.js, Handlebars
* Database: Mongodb, Firebase
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
