import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';
import '@vaadin/vaadin-app-layout/vaadin-app-layout.js';
import '@vaadin/vaadin-app-layout/vaadin-drawer-toggle.js';
import '@vaadin/vaadin-lumo-styles/color.js';
import '@vaadin/vaadin-lumo-styles/spacing.js';
import '@vaadin/vaadin-lumo-styles/typography.js';
import '@vaadin/vaadin-tabs/vaadin-tabs.js';
import '../styles/shared-styles.js';
import { EMPLOYEE_LIST, NEW_EMPLOYEE } from '../routes/urls.js';

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
      <style include="lumo-typography">
        :host {
          display: block;
        }
        [main-title] {
          padding: var(--lumo-space-m) 0;
          font-size: var(--lumo-font-size-xl);
          line-height: var(--lumo-line-height-m);
          font-weight: 400;
        }
      </style>

      <vaadin-app-layout>
        <!-- Navbar content -->
        <vaadin-drawer-toggle slot="navbar"></vaadin-drawer-toggle>
        <div main-title slot="navbar"><%= elementName %></div>

        <!-- Drawer content -->
        <section slot="drawer">
          <vaadin-tabs selected="{{selected}}" orientation="vertical">
            <vaadin-tab>
              <a href="/employee-list">Employee list</a>
            </vaadin-tab>
            <vaadin-tab>
              <a href="/employee-new">New employee</a>
            </vaadin-tab>
          </vaadin-tabs>
        </section>

        <!-- Main content -->
        <main>
          <!-- view content -->
        </main>
      </vaadin-app-layout>
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
    import('../routes/app-routing.js').then(routing => {
      routing.init(this.shadowRoot.querySelector('main'));
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
