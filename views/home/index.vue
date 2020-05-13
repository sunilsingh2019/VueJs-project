<template>

    <div>
        <app-banner></app-banner>
        <app-search-bar></app-search-bar>
        <app-feature></app-feature>
        <app-testimonial></app-testimonial>
        <app-stat></app-stat>
        <app-download></app-download>
        <app-client></app-client>
    </div>

</template>

<script>
    import Banner from './includes/banner';
    import SearchForm from './includes/search-form';
    import Feature from './includes/feature';
    import Testimonial from './includes/testimonial';
    import Stat from './includes/statistics';
    import Download from './includes/download';
    import Client from './includes/client';
    import Promise from "../../lib/Mixins/ExtendedPromises";

    export default {
        name: "index",
        mixins: [ Promise, ],
        components: {
            'app-banner': Banner,
            'app-search-bar': SearchForm,
            'app-feature': Feature,
            'app-testimonial': Testimonial,
            'app-stat': Stat,
            'app-download': Download,
            'app-client': Client
        }
    }
</script>

<style scoped>

</style>