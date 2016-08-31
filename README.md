# Vaadin Elements application template

Vaadin Elements application is a progressive web application template done with Polymer App Toolbox and Vaadin Elements.

## Usage

Install `polymer-cli` and this package globally:

    $ npm install -g polymer-cli generator-polymer-init-vaadin-elements-app

Then you can create a new application with `polymer init`, using `vaadin-elements-app` template:

    $ mkdir my-project
    $ cd my-project
    $ polymer init vaadin-elements-app

### Start the development server

This command serves the app at `http://localhost:8080` and provides basic URL
routing for the app:

    $ polymer serve

### Build

This command performs HTML, CSS, and JS minification on the application
dependencies, and generates Service workers.
The minified files are output to the `build/unbundled` folder, and are suitable
for serving from a HTTP/2+Push compatible server.

The command also creates a `build/bundled` folder,
generated using fragment bundling, suitable for serving from non
H2/push-compatible servers or to clients that do not support H2/Push.

    $ polymer build

### Test the build

    $ polymer serve build/bundled

## Development

### Running locally

In order to be able to try the generator from a local repository, clone this
repository and type the following command in the project directory:

    $ npm link

This will create a global link to this module and install the dependencies.
Next time when you run `$ polymer init vaadin-elements-app`, your cloned
repository will be used.

### Testing the generator

In this generator project, there are unit tests for the generator part,
and the application tests for the generated application.

The application tests are based on Web Component Tester. Please make sure that
it is installed and `wct` command is available. If it is not installed, run
the following command to install it:

    $ npm install -g web-component-tester

In order to run the tests, run the following command in the project directory:

    $ npm test

This will run the unit tests, as well as generate and test the application in
a temporary path.

See also the [development instructions](https://github.com/vaadin/vaadin-core-elements#development) which apply to all Vaadin core elements.

## Contributing

See the [contribution instructions](https://github.com/vaadin/vaadin-core-elements#contributing) which apply to all Vaadin core elements.

## License

Apache License 2.0
