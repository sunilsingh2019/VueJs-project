let Vue = window.Vue = require("vue");
import serviceContainer from "./service-container";

require('./bootstrap');

Vue.use('compiler');

import router from './router';

import store from './store'

const { getToken } = require('./lib/storage');

const app = new Vue({
    provide: serviceContainer,
    el: '#root',
    router,
    store,
    // watch: {
    //     $route (to, from){
    //         //
    //     }
    // },
    mounted() {
        window.toastr = this.$toastr;
        this.$toastr.preventDuplicates = true;
    },

    methods: {
        // initDom: function () {
        //     $('#nepaliDateD').nepaliDatePicker({
        //         dateFormat: "%D, %M %d, %y",
        //         closeOnDateSelect: true
        //     });
        // }
        // ,
        // dropdownListener: function (event) {
        //     $('.dropdown-ul-actions').each (function() {
        //         let el = $(this);
        //         if (el.is(':visible')) {
        //             el.hide(1000);
        //         } else {
        //             el.show(1000);
        //         }
        //     });
        // }
    },
    // created: function () {
    //     document.addEventListener('DOMContentLoaded', this.initDom);
    //     // document.addEventListener('click', this.dropdownListener);
    // },
    // destroyed: function () {
    //     // document.removeEventListener('unload', this.dropdownListener);
    //     // document.removeEventListener('click', this.dropdownListener);
    // }
});
