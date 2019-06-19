import '@vaadin/vaadin-lumo-styles/color.js';
import '@vaadin/vaadin-lumo-styles/sizing.js';
import '@vaadin/vaadin-lumo-styles/spacing.js';
import '@vaadin/vaadin-lumo-styles/style.js';
import '@vaadin/vaadin-lumo-styles/typography.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

const $template = html`
  <dom-module id="shared-styles">
    <template>
      <style include="lumo-color lumo-typography">
        h2 {
          margin: var(--lumo-space-m) 0;
        }
        .card {
          margin: var(--lumo-space-m);
          padding: var(--lumo-space-m);
          border-radius: var(--lumo-border-radius);
          background: var(--lumo-base-color);
          box-shadow: var(--lumo-box-shadow-s);
        }
      </style>
    </template>
  </dom-module>
`;

document.head.appendChild($template.content);

const $layout = html`
  <dom-module id="layout-styles" theme-for="vaadin-app-layout">
    <template>
      <style>
        [part='drawer'] {
          background: var(--lumo-base-color);
        }

        [part='navbar'] {
          align-items: center;
          color: var(--lumo-base-color);
          background: var(--lumo-primary-color);
        }
      </style>
    </template>
  </dom-module>
`;

document.head.appendChild($layout.content);

const $drawer = html`
  <dom-module id="drawer-styles" theme-for="vaadin-drawer-toggle">
    <template>
      <style>
        :host {
          width: var(--lumo-size-l);
          height: var(--lumo-size-l);
          margin: 0 var(--lumo-space-m);
          padding: 0;
          background: transparent;
          color: currentColor;
        }
      </style>
    </template>
  </dom-module>
`;

document.head.appendChild($drawer.content);
