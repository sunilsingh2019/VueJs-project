<template>
    <input />
</template>

<script>
    export default {
        name: "x-editable",
        props: {
            x_type: { required: true },
            x_title: { required: true },
            x_placement: { required: false, default: 'top'},
            x_selected: { required: false, default: 1 },
            x_url: { required: true },
            x_source: { required: true },
        },
        mounted: function () {
            $(this.$el).editable({
                type: this.x_type,
                url: this.x_url,
                pk: this.x_selected,
                placement: this.x_placement,
                title: this.x_title,
                source: this.x_source
            });
        }
    }
</script>

