<template>
    <div class="wrapper wrapper-content">
        <div :class="{'container': isTopNav}">
            <div class="row">
                <div class="col-md-12 mb20">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {

        computed: {
            isTopNav() {
                return this.$root.isTopNav;
            }
        }
    }
</script>

<style>
    .mb20 {
        margin-bottom: 20px;
    }
</style>
