# Vaadin Elements App

### Intro

This template is a starting point for building progressive web applications with
[Vaadin components](https://vaadin.com/components) and [Polymer](https://www.polymer-project.org).

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

This command builds your Polymer application for production and generates service worker, using build configuration options provided by the command line or in your project's `polymer.json` file.

You can configure your `polymer.json` file to create multiple builds. You can define your own named builds, or use presets. See the Polymer's documentation on [building your project for production](https://www.polymer-project.org/2.0/toolbox/build-for-production) for more information.

    $ polymer build

### Run tests

This command will run [Web Component Tester](https://github.com/Polymer/web-component-tester)
against the browsers currently installed on your machine:

    polymer test

### Adding a new view

You can extend the app by adding more views that will be demand-loaded
e.g. based on the route, or to progressively render non-critical sections of the
application. Each new demand-loaded fragment should be added to the list of
`fragments` in the included `polymer.json` file. This will ensure those
components and their dependencies are added to the list of pre-cached components
and will be included in the build.
