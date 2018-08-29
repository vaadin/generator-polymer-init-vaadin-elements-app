import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-form/iron-form.js';
import '@vaadin/vaadin-button/vaadin-button.js';
import '@vaadin/vaadin-dialog/vaadin-dialog.js';
import '@vaadin/vaadin-checkbox/vaadin-checkbox.js';
import '@vaadin/vaadin-form-layout/vaadin-form-layout.js';
import '@vaadin/vaadin-form-layout/vaadin-form-item.js';
import '@vaadin/vaadin-text-field/vaadin-text-area.js';
import '@vaadin/vaadin-radio-button/vaadin-radio-group.js';
import '@vaadin/vaadin-radio-button/vaadin-radio-button.js';
import '@vaadin/vaadin-list-box/vaadin-list-box.js';
import '@vaadin/vaadin-date-picker/vaadin-date-picker.js';
import '@vaadin/vaadin-dropdown-menu/vaadin-dropdown-menu.js';
import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import '@vaadin/vaadin-upload/vaadin-upload.js';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout.js';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout.js';
import '@vaadin/vaadin-notification/vaadin-notification.js';
import '@vaadin/vaadin-time-picker/vaadin-time-picker.js';
import './shared-styles.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
class EmployeeNew extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles">
      :host {
        display: block;
        background: transparent;
      }
    </style>

    <div class="card">
      <iron-form id="form">
        <form>
          <vaadin-vertical-layout>
            <h2>Register a new employee</h2>
            <vaadin-form-layout>
              <vaadin-form-item>
                <label slot="label">Title</label>
                <vaadin-dropdown-menu class="full-width">
                  <template>
                    <vaadin-list-box>
                      <vaadin-item>Mr</vaadin-item>
                      <vaadin-item>Mrs</vaadin-item>
                      <vaadin-item>Ms</vaadin-item>
                      <vaadin-item>Miss</vaadin-item>
                      <vaadin-item>Other</vaadin-item>
                    </vaadin-list-box>
                  </template>
                </vaadin-dropdown-menu>
              </vaadin-form-item>

              <vaadin-form-item>
                <label slot="label">First Name</label>
                <vaadin-text-field required="" error-message="Please enter first name" class="full-width"></vaadin-text-field>
              </vaadin-form-item>

              <vaadin-form-item>
                <label slot="label">Last Name</label>
                <vaadin-text-field required="" error-message="Please enter last name" class="full-width"></vaadin-text-field>
              </vaadin-form-item>

              <vaadin-form-item>
                <label slot="label">Email</label>
                <vaadin-text-field required="" error-message="Please enter email" class="full-width"></vaadin-text-field>
              </vaadin-form-item>

              <vaadin-form-item>
                <label slot="label">Birth date</label>
                <vaadin-date-picker class="full-width"></vaadin-date-picker>
              </vaadin-form-item>

              <vaadin-form-item>
                <label slot="label">Dietary Restrictions</label>
                <vaadin-combo-box class="full-width" items="[[dietarys]]"></vaadin-combo-box>
              </vaadin-form-item>

              <vaadin-form-item>
                <label slot="label">Add profile picture</label>
                <vaadin-upload class="full-width" max-files="1"></vaadin-upload>
              </vaadin-form-item>

              <vaadin-form-item>
                <label slot="label">Preferred language</label>
                <vaadin-radio-group value="{{radioValue}}">
                  <vaadin-radio-button value="en">English</vaadin-radio-button>
                  <vaadin-radio-button value="fr">Français</vaadin-radio-button>
                  <vaadin-radio-button value="de">Deutsch</vaadin-radio-button>
                </vaadin-radio-group>
              </vaadin-form-item>

              <vaadin-form-item>
                <label slot="label">Arrival hour</label>
                <vaadin-time-picker class="full-width"></vaadin-time-picker>
              </vaadin-form-item>

              <vaadin-form-item>
                <label slot="label">Departure</label>
                <vaadin-time-picker class="full-width"></vaadin-time-picker>
              </vaadin-form-item>

              <vaadin-form-item colspan="2">
                <label slot="label">Free word (allergies)</label>
                <vaadin-text-area class="full-width"></vaadin-text-area>
              </vaadin-form-item>

              <vaadin-form-item colspan="2">
                <vaadin-checkbox checked="{{_canSubmit}}">I have read the <a href="" on-click="toggleDialog">terms and conditions</a></vaadin-checkbox>
              </vaadin-form-item>

              <vaadin-form-item colspan="2">
                <vaadin-button disabled\$="[[!_canSubmit]]" on-click="_submitForm">Submit</vaadin-button>
              </vaadin-form-item>

            </vaadin-form-layout>
          </vaadin-vertical-layout>
        </form>
      </iron-form>
    </div>

    <vaadin-notification opened="{{formSubmittedOpen}}" duration="4000">
      <template>
        <h3>Submitted</h3>
        Your registration was successful
      </template>
    </vaadin-notification>

    <vaadin-notification opened="{{formInvalidOpen}}" duration="4000">
      <template>
        <h3>Some fields invalid</h3>
        Please fill all the required fields and try again
      </template>
    </vaadin-notification>

    <vaadin-dialog id="dialog" no-close-on-esc="" no-close-on-outside-click="" opened="{{dialogOpen}}">
      <template>
        <vaadin-vertical-layout theme="spacing">
          <div>
            <h1>The content of dialog</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin maximus magna et orci lacinia maximus. Fusce ut tincidunt ex. Morbi sed vehicula metus. Phasellus vel leo a elit viverra congue. Donec finibus iaculis eros vel vestibulum. Cras vehicula neque enim, eget faucibus ligula tempus vel. Integer felis nisi, sollicitudin at lectus at, bibendum vulputate risus. In ut massa et massa scelerisque viverra.</p>
          </div>
          <vaadin-button on-click="toggleDialog">Ok</vaadin-button>
        </vaadin-vertical-layout>
      </template>
    </vaadin-dialog>
  `;
  }

  static get is() {
    return 'employee-new';
  }
  static get properties() {
    return {
      dietarys: {
        type: Array,
        value: () =>
          [
            'Ovo-Vegetarian',
            'Lacto-Vegetarian',
            'Lacto-Ovo Vegetarians',
            'Pescetarians',
            'Other'
          ]
      },
      dialogOpen: Boolean,
      formSubmittedOpen: Boolean,
      formInvalidOpen: Boolean,
      radioValue: String
    };
  }

  toggleDialog(e) {
    e.stopPropagation();
    e.preventDefault();
    this.dialogOpen = !this.dialogOpen;
  }

  _submitForm() {
    if (this.$.form.validate()) {
      this.formSubmittedOpen = true;
    } else {
      this.formInvalidOpen = true;
    }
  }
}
window.customElements.define(EmployeeNew.is, EmployeeNew);
