# Vaadin Elements application template

Vaadin Elements application is a progressive web application template done with Polymer App Toolbox and [Vaadin components](https://vaadin.com/components).

<img src="https://raw.githubusercontent.com/vaadin/generator-polymer-init-vaadin-elements-app/master/docs/img/generator-polymer-init-vaadin-elements-app-overview.png" width="100%" alt="Screenshot of the Vaadin Elements Application">

## Usage

Follow the steps in the
[Vaadin Elements Application Template](https://github.com/vaadin/generator-polymer-init-vaadin-elements-app/blob/master/app/templates/README.md)
tutorial to create and run your application.

## Development

### Running locally

In order to be able to try the generator from local, clone this
repository and type the following command in the project root directory:

    $ npm link

This will install the dependencies and will create a global link to this module.
Now, when you create a new app using this template by running
`$ polymer init vaadin-elements-app`, your cloned repository will be used.

### Testing the generator

In this project, there are unit tests for the generator part as well as
application tests for the generated application.

The application tests are based on the Web Component Tester. Please make sure that
it is installed and the `wct` command is available in your PATH. Otherwise, run
the following command to install it:

    $ npm install -g web-component-tester

In order to run the tests, type the following command in the project directory:

    $ npm test

This will run the unit tests, as well as generate and test the application in
a temporary path.

You can also run the unit tests and the application tests separately using the
`$ npm run test:unit` and `$ npm run test:e2e` commands respectively.

## Contributing

See the [contribution instructions](https://github.com/vaadin/vaadin-core#contributing) which apply to this project as well.

## License

Apache License 2.0
