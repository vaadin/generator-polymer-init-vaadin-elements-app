var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var fs = require('fs');
var path = require('path');

describe('vaadin-elements-app', function() {
  before(function() {
    return helpers
      .run(path.join(__dirname, '../app'))
      .withPrompts({
        name: 'test',
        elementName: 'test-app',
        description: 'Test app'
      })
      .toPromise()
      .then(function(dir) {
        console.log(fs.readdirSync(dir));
      });
  });
});
