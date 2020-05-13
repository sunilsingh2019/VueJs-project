<template>
    <label class="col-form-label" :class="cls">
        <slot></slot>
        <span class="is_required" v-if="isRequired">*</span>
    </label>
</template>

<script>
    export default {
        name: "InputLabel",
        props: {
            cls: { required: false, type: String },
            isRequired: { required: false, type: Boolean }
        },

        computed: {
            labelClass() {
                let cls = this.cls;
                if( this.form.errors.has( this.field ) ) cl += `has-error `;
                return cls;
            }
        }
    }
</script>
