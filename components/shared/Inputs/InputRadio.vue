<template>
    <div @click="check" class="hand">
        <icon icon="check-circle" v-if="checked"></icon>
        <icon icon="circle-o" v-else></icon>
        <input type="radio" v-model="internalValue" :name="name" :id="id" class="hide"/>
        <input-label :for="id" class="hand">
            <slot></slot>
        </input-label>
    </div>
</template>

<script>
    export default {
        mixins: [require('../Mixins/Model')],
        props: {
            dfValue: {required: true},
            id: {required: true}
        },
        computed: {
            checked() {
                return this.internalValue === this.dfValue;
            }
        },
        methods: {
            check() {
                this.internalValue = this.dfValue;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .hand {
        cursor: pointer;
    }
    i {
        font-size: 1.3em;
    }
    .control-label {
        font-weight: normal !important;
    }
</style>
