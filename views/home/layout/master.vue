<template>

    <div>
        <app-header></app-header>

        <!-- main content start -->
        <main class="main-content">
            <router-view></router-view>
        </main>

        <app-footer></app-footer>
    </div>

</template>

<script>

    export default {
        name: "master",
    }
</script>

<style scoped>

</style>