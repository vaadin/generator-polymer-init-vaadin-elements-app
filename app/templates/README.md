# <%= name %>

### Intro

This template is a starting point for building progressive web apps with
[Vaadin Elements](https://vaadin.com/elements) and [Polymer](https://www.polymer-project.org).

### Setup

##### Prerequisites

Install [polymer-cli](https://github.com/Polymer/polymer-cli)
and [generator-polymer-init-vaadin-elements-app](https://github.com/vaadin/generator-polymer-init-vaadin-elements-app) globally:

    $ npm install -g polymer-cli generator-polymer-init-vaadin-elements-app

##### Initialize project from template

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
