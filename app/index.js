var generators = require('yeoman-generator');
var chalk = require('chalk');
var path = require('path');
var fs = require('fs');

module.exports = class VaadinElementsApplicationGenerator extends generators.Base {
  constructor(args, options) {
    super(args, options);
    this.properties = {};
  }

  initializing() {
    // Dashify appname
    this.appname = this.appname.replace(/\s+/g, '-');
  }

  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Application name',
        default: this.appname
      }, {
        type: 'input',
        name: 'elementName',
        message: 'Main element name',
        default: this.appname + '-app',
        validate: (name) => {
          if (!name.includes('-')) {
            this.log('Custom element name must contain a hyphen. Please try again.')
            return false;
          }
          return true;
        }
      }, {
        type: 'input',
        name: 'description',
        message: 'Brief description of the application' }
    ]).then((answers) => this.properties = answers);
  }

  writing() {
    // Can not copy .gitignore because of npm, see: https://github.com/yeoman/generator/issues/812
    this.fs.write(
      this.destinationPath('.gitignore'),
      fs.readFileSync(this.templatePath('.gitignore'))
    );

    var staticFilesGlob = '*.png|*.ico';

    this.fs.copyTpl(
      path.join(this.templatePath(), '**', `!(_*|${staticFilesGlob})`),
      this.destinationPath(),
      this.properties
    );

    this.fs.copy(
      path.join(this.templatePath(), '**', staticFilesGlob),
      this.destinationPath()
    );
  }

  install() {
    this.log(chalk.bold('\nProject generated!'));
    this.log('Installing dependencies...');
    this.installDependencies({npm: false});
  }

  end() {
    this.log(chalk.bold('\nSetup complete!'));
  }
}
