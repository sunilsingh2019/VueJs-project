<template>
    <div class="form-group" :class="groupClass">
        <slot></slot>
        <span class="help-block" v-show="form.errors.has( field )">
            {{ form.errors.get(field) }}
        </span>
    </div>
</template>

<script>
    export default {
        name: "FormGroup",

        props: {
            form: {
                type: Object,
                required: true
            },
            field: {
                type: String,
                required: true
            },
            cls: { required: false, type: String }
        },

        computed: {
            groupClass() {
                let cls = this.cls;
                if( this.form.errors.has( this.field ) ) cls += ` has-error `;
                return cls;
            }
        }
    }
</script>

<style scoped>
    .has-error > div > input {
        border: 1px solid red;
    }
    .help-block {
        color: red;
        margin-top: 5px;
        margin-left: 35%;
    }
</style>
