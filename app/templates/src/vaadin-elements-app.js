import { PolymerElement } from '../node_modules/@polymer/polymer/polymer-element.js';
import '../node_modules/@polymer/app-layout/app-drawer/app-drawer.js';
import '../node_modules/@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '../node_modules/@polymer/app-layout/app-header/app-header.js';
import '../node_modules/@polymer/app-layout/app-header-layout/app-header-layout.js';
import '../node_modules/@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '../node_modules/@polymer/app-layout/app-toolbar/app-toolbar.js';
import '../node_modules/@polymer/app-route/app-location.js';
import '../node_modules/@polymer/app-route/app-route.js';
import '../node_modules/@polymer/iron-pages/iron-pages.js';
import '../node_modules/@polymer/iron-selector/iron-selector.js';
import '../node_modules/@polymer/iron-icon/iron-icon.js';
import '../node_modules/@vaadin/vaadin-lumo-styles/icons.js';
import '../node_modules/@vaadin/vaadin-button/vaadin-button.js';
import './shared-styles.js';
import './employee-list.js';
import './employee-new.js';
import './404.js';

import { setPassiveTouchGestures, setRootPath } from '../node_modules/@polymer/polymer/lib/utils/settings.js';
import { html } from '../node_modules/@polymer/polymer/lib/utils/html-tag.js';
// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);
setRootPath(Polymer.rootPath);

class <%= elementClass %> extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles">
      :host {
        display: block;
      }
      app-drawer-layout:not([narrow]) [drawer-toggle] {
        display: none;
      }
      app-header {
        color: var(--lumo-base-color);
        background-color: var(--lumo-primary-color);
      }
      app-header vaadin-button {
        color: var(--lumo-base-color);
      }
      .drawer-list {
        margin: var(--lumo-space-tall-m);
      }
      .drawer-list a {
        display: block;
        padding: 0 var(--lumo-space-m);
        color: var(--lumo-secondary-text-color);
        line-height: var(--lumo-size-m);
        text-decoration: none;
      }
      .drawer-list a.iron-selected {
        color: var(--lumo-body-text-color);
        font-weight: bold;
      }
    </style>

    <app-location route="{{route}}" url-space-regex="^[[rootPath]]">
    </app-location>

    <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}">
    </app-route>

    <app-drawer-layout fullbleed="" narrow="{{narrow}}">
      <!-- Drawer content -->
      <app-drawer id="drawer" slot="drawer" swipe-open="[[narrow]]">
        <app-toolbar>Menu</app-toolbar>
        <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
          <a name="employee-list" href="employee-list">Employee list</a>
          <a name="employee-new" href="employee-new">New employee</a>
        </iron-selector>
      </app-drawer>

      <!-- Main content -->
      <app-header-layout has-scrolling-region="">

        <app-header slot="header" condenses="" reveals="" effects="waterfall">
          <app-toolbar>
            <vaadin-button theme="icon" aria-label="Toggle menu" drawer-toggle="">
              <iron-icon icon="lumo:menu"></iron-icon>
            </vaadin-button>
            <div main-title=""><%= elementName %></div>
          </app-toolbar>
        </app-header>

        <iron-pages selected="[[page]]" attr-for-selected="name" fallback-selection="404" role="main">
          <employee-list name="employee-list"></employee-list>
          <employee-new name="employee-new"></employee-new>
          <app-404 name="404"></app-404>
        </iron-pages>
      </app-header-layout>
    </app-drawer-layout>
`;
  }

  static get is() {
    return '<%= elementName %>';
  }

  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged',
      },
      routeData: Object,
      subroute: String,
      // This shouldn't be neccessary, but the Analyzer isn't picking up
      // Polymer.Element#rootPath
      rootPath: String,
    };
  }

  static get observers() {
    return [
      '_routePageChanged(routeData.page)',
    ];
  }

  _routePageChanged(page) {
    // If no page was found in the route data, page will be an empty string.
    // Default to 'employee-list' in that case.
    this.page = page || 'employee-list';
    // Close a non-persistent drawer when the page & route are changed.
    if (!this.$.drawer.persistent) {
      this.$.drawer.close();
    }
  }

  _pageChanged(page) {
    // Load page import on demand. Show 404 page if fails
    import(`./${page}.js`).then((LazyElement) => {
      console.log("LazyElement loaded");
    }).catch((reason) => {
      this._showPage404.bind(this);
      console.log("LazyElement failed to load", reason);
    });
  }

  _pageChanged(page) {
    // Load page import on demand. Show 404 page if fails
    // Note: `polymer build` doesn't like string concatenation in
    // the import statement, so break it up.
    let loaded;
    switch(page) {
      case 'employee-list':
        loaded = import('./employee-list.js');
        break;
      case 'employee-new':
        loaded = import('./employee-new.js');
        break;
      case '404':
        loaded = import('./404.js');
        break;
      default:
        loaded = Promise.reject();
    }

    loaded.catch(() => this._showPage404.bind(this));
  }

  _showPage404() {
    this.page = '404';
  }

  _drawerToggle() {
    this.$.drawer.toggle();
  }
}
window.customElements.define(<%= elementClass %>.is, <%= elementClass %>);
