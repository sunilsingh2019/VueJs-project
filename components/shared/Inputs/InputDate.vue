<template>
    <date-picker
        v-model="internalValue"
        :value="value"
        :name="name"
        :config="config"
    ></date-picker>
</template>

<script>
    import datePicker from 'vue-bootstrap-datetimepicker';
    // import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css';

    export default {
        mixins: [require('../Mixins/Model')],
        components: {datePicker},
        data() {
            return {
                config: {
                    format: 'MM/DD/YYYY hh:mm A',
                    showClear: true,
                    sideBySide:  true,
                }
            }
        }
    }
</script>
