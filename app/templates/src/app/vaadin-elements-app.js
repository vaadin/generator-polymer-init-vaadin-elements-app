import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@vaadin/vaadin-button/vaadin-button.js';
import '@vaadin/vaadin-item/vaadin-item.js';
import '@vaadin/vaadin-list-box/vaadin-list-box.js';
import '@vaadin/vaadin-lumo-styles/icons.js';
import '../styles/shared-styles.js';
import { EMPLOYEE_LIST, NEW_EMPLOYEE } from '../routes/pages';

setRootPath(<%= elementClass %>Globals.rootPath);

/**
 * Starter application shell.
 *
 * @class StarterApp
 * @extends {PolymerElement}
 */
class <%= elementClass %> extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }
        app-header {
          color: var(--lumo-base-color);
          background: var(--lumo-primary-color);
        }
        vaadin-button {
          margin-right: var(--lumo-space-m);
          background: var(--lumo-tint);
        }
        vaadin-item {
          padding: 0;
        }
        a {
          display: block;
          color: inherit;
          outline: none;
          line-height: 36px;
        }
        a:hover {
          text-decoration: none;
        }
      </style>

      <app-drawer-layout fullbleed narrow="{{narrow}}">
        <!-- Drawer content -->
        <app-drawer slot="drawer" swipe-open="[[narrow]]">
          <app-toolbar>Menu</app-toolbar>
          <vaadin-list-box selected="{{selected}}">
            <vaadin-item>
              <a href="/employee-list">Employee list</a>
            </vaadin-item>
            <vaadin-item>
              <a href="/employee-new">New employee</a>
            </vaadin-item>
          </vaadin-list-box>
        </app-drawer>

        <!-- Main content -->
        <app-header-layout>
          <app-header slot="header">
            <app-toolbar>
              <vaadin-button theme="icon" hidden$="[[!narrow]]" aria-label="Toggle menu" drawer-toggle>
                <iron-icon icon="lumo:menu"></iron-icon>
              </vaadin-button>
              <div main-title><%= elementName %></div>
            </app-toolbar>
          </app-header>
          <main>
            <!-- view content -->
          </main>
        </app-header-layout>
      </app-drawer-layout>
    `;
  }

  static get is() {
    return '<%= elementName %>';
  }

  static get properties() {
    return {
      selected: Number
    };
  }

  constructor() {
    super();
    // To force all event listeners for gestures to be passive.
    // See https://www.polymer-project.org/2.0/docs/devguide/gesture-events#use-passive-gesture-listeners
    setPassiveTouchGestures(true);
  }

  ready() {
    super.ready();

    this.removeAttribute('unresolved');

    window.addEventListener(
      'vaadin-router-location-changed',
      this.__onRouteChanged.bind(this)
    );

    // Keeping the routing code in a separate module and dynamically importing
    // it _after_ the app shell is ready improves the first page render performance.
    import('../routes/config.js').then(config => {
      const setupRouter = config.default;
      setupRouter(this.shadowRoot.querySelector('main'));
    });
  }

  __onRouteChanged(e) {
    switch (e.detail.location.pathname) {
      case EMPLOYEE_LIST:
        this.selected = 0;
        break;
      case NEW_EMPLOYEE:
        this.selected = 1;
        break;
      default:
        this.selected = null;
    }
  }
}

customElements.define(<%= elementClass %>.is, <%= elementClass %>);
