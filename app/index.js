'use strict';
var generators = require('yeoman-generator');
var chalk = require('chalk');
var path = require('path');
var fs = require('fs');

module.exports = class VaadinElementsApplicationGenerator extends generators.Base {
  constructor(args, options) {
    super(args, options);
    this.option('defaults');
    this.properties = {};
  }

  initializing() {
    // Dashify appname
    this.appname = this.appname.replace(/\s+/g, '-');
  }

  prompting() {
    var defaultProperties = {
      name: this.appname,
      elementName: this.appname + '-app',
      description: ''
    };

    if (this.options.defaults) {
      this.properties = defaultProperties;
      return;
    }

    return this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Application name',
        default: defaultProperties.name
      }, {
        type: 'input',
        name: 'elementName',
        message: 'Main element name',
        default: defaultProperties.elementName,
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
    var staticFilesGlob = '*.png|*.ico';

    this.properties.elementClass = this.properties.elementName
      .replace(/-([a-z])/g, g => g[1].toUpperCase())
      .replace(/[a-z]/, g => g.toUpperCase());

    this.fs.copyTpl(
      path.join(this.templatePath(), '**', `!(_*|${staticFilesGlob})`),
      this.destinationPath(),
      this.properties
    );

    this.fs.copy(
      path.join(this.templatePath(), 'images', '**'),
      path.join(this.destinationPath(), 'images')
    );

    this.fs.copy(
      path.join(this.templatePath(), '.eslintrc.json'),
      path.join(this.destinationPath(), '.eslintrc.json')
    );

    this.fs.copy(
      path.join(this.templatePath(), 'test', '.eslintrc.json'),
      path.join(this.destinationPath(), 'test', '.eslintrc.json')
    );

    // Rename .gitignore file name
    this.fs.move(
      path.join(this.destinationPath(), 'gitignore'),
      path.join(this.destinationPath(), '.gitignore')
    );

    // Rename main element's file name
    if (this.properties.elementName !== 'vaadin-elements-app') {
      this.fs.move(
        path.join(this.destinationPath(), 'src', 'vaadin-elements-app.html'),
        path.join(this.destinationPath(), 'src', this.properties.elementName + '.html')
      );
    }
  }

  install() {
    this.log(chalk.bold('\nProject generated!'));
    this.log('Installing dependencies...');
    this.installDependencies();
  }

  end() {
    this.log(chalk.bold('\nSetup complete!'));
  }
}
