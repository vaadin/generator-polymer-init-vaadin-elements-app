var os = require('os');
var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');
var childProcess = require('child_process');
var yeoman  = require('yeoman-environment');

var generatorPath = require.resolve('../../app');
var appPath = fs.mkdtempSync(path.join(os.tmpdir(), 'vaadin-elements-'));
process.chdir(appPath);

function cleanUp() {
  rimraf.sync(appPath);
}

function generateApp(callback) {
  console.log('Running application generator...');
  var env = yeoman.createEnv([]);
  env.register(generatorPath, 'vaadin-elements:app');
  env.run('vaadin-elements:app', {defaults: true}, callback);
}

function runWct(callback) {
  console.log('Running WCT ...');
  var wctProcess = childProcess.exec(require.resolve('web-component-tester/bin/wct'), {}, callback);
  wctProcess.stdout.pipe(process.stdout);
  wctProcess.stderr.pipe(process.stderr);
}

generateApp(function(err) {
  if (err) {
    cleanUp();
    throw err;
  }

  runWct(function(err) {
    cleanUp();

    if (err) {
      throw err;
    }

    console.log('E2E test completed successfully!');
  });
});
