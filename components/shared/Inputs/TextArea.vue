<template>
    <textarea class="form-control" v-model="internalValue" :name="name"></textarea>
</template>

<script>
    export default {
        mixins: [require('../Mixins/Model')]
    }
</script>
