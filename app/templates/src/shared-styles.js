import '@polymer/polymer/polymer-element.js';
import '@vaadin/vaadin-lumo-styles/color.js';
import '@vaadin/vaadin-lumo-styles/sizing.js';
import '@vaadin/vaadin-lumo-styles/spacing.js';
import '@vaadin/vaadin-lumo-styles/style.js';
import '@vaadin/vaadin-lumo-styles/typography.js';
const $_documentContainer = document.createElement('div');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<dom-module id="shared-styles">
  <template>
    <style include="lumo-color lumo-typography">
      .card {
        margin: var(--lumo-space-m);
        padding: var(--lumo-space-m);
        border-radius: var(--lumo-border-radius);
        background-color: var(--lumo-base-color);
        box-shadow: var(--lumo-box-shadow-s);
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer);

/* shared styles for all views */
;
