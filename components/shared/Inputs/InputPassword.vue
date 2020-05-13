<template>
    <input type="password" class="form-control" v-model="internalValue" :name="name"/>
</template>

<script>
    export default {
        mixins: [require('../Mixins/Model')]
    }
</script>
