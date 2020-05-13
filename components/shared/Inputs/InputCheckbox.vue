<template>
    <label class="gp-checkbox">
        <slot></slot>
        <input type="checkbox" :value="value" v-model="internalValue" :name="name" :id="id_name" style="margin: 5px;cursor: pointer;" />
        <span class="check-mark"></span>
    </label>
</template>

<script>
    export default {
        mixins: [require('../Mixins/Model')],
        props: {
            id_name: {required: true},
            is_checked: {required: false, default: false},
            value: {required: true}
        },
        data() {
            return {
                internalValue: false
            }
        },
        mounted() {},
        methods: {
        }
    }
</script>

<style>
    .gp-checkbox {
        display: block;
        position: relative;
        padding-left: 35px;
        margin-bottom: 12px;
        cursor: pointer;
        font-size: 16px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        padding-right: 12px;
    }

    /* Hide the browser's default checkbox */
    .gp-checkbox input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }

    /* Create a custom checkbox */
    .check-mark {
        position: absolute;
        top: 0;
        left: 0;
        height: 25px;
        width: 25px;
        background-color: #eee;
    }

    /* On mouse-over, add a grey background color */
    .gp-checkbox:hover input ~ .check-mark {
        background-color: #1ab394;
    }

    /* When the checkbox is checked, add a blue background */
    .gp-checkbox input:checked ~ .check-mark {
        background-color: #1ab394;
    }

    /* Create the check-mark/indicator (hidden when not checked) */
    .check-mark:after {
        content: "";
        position: absolute;
        display: none;
    }

    /* Show the check-mark when checked */
    .gp-checkbox input:checked ~ .check-mark:after {
        display: block;
    }

    /* Style the check-mark/indicator */
    .gp-checkbox .check-mark:after {
        left: 9px;
        top: 5px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }
</style>
