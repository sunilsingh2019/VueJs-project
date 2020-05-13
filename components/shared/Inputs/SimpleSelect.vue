<template>
    <multiselect
        v-model="internalValue"
        :options="options"
        :internal-search="true"
        select-label=""
        deselect-label=""
        placeholder=""
        :show-labels="false"
    ></multiselect>
</template>

<script>
    import Multiselect from 'vue-multiselect';

    export default {
        mixins: [require('../Mixins/Model')],
        components: {
            Multiselect
        },

        props: {
            options: {
                type: Array,
                required: true
            }
        }

    }
</script>
