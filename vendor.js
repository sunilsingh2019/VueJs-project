window._ = require('lodash');

try {
    window.Popper = require('popper.js').default;
    window.$ = window.jQuery = require('jquery');

    require('bootstrap');
} catch (e) {}

window.axios = require('axios');
//
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// // window.axios.defaults.headers.common['X-CSRF-TOKEN'] = document.head.querySelector('meta[name="csrf-token"]').content;
window.axios.defaults.baseURL = document.head.querySelector('meta[name="api-base-url"]').content;

// window._translations = document.head.querySelector('meta[name="app-translations"]').content;

import VueToastr from "vue-toastr";
// use plugin
Vue.use(VueToastr, {
    defaultTimeout: 3000,
    defaultProgressBar: false,
    defaultProgressBarValue: 0,
    defaultType: "error",
    defaultPosition: "toast-bottom-left",
    defaultCloseOnHover: false,
    defaultStyle: { "background-color": "red" },
    defaultClassNames: ["animated", "zoomInUp"],
    preventDuplicates: true,
});

window.toastr = VueToastr;

window.moment = require('moment');

import VueSweetalert2 from 'vue-sweetalert2';

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2);

import { Form, HasError, AlertError } from 'vform'

window.form = Form;
Vue.component(HasError.name, HasError);
Vue.component(AlertError.name, HasError);

import 'vue-material-design-icons/styles.css';

// Vue.component('vue-datetime-picker', require('vue-datetime-picker').default);


// window.xEditable = require('x-editable.js');
