<template>
    <div>
        <section class="about-section pd-7">
            <div class="container">
                <div class="row">
                    <div class="col-lg-5">
                        <figure>
                            <img src="/images/about.jpg" alt="about" />
                        </figure>
                    </div>
                    <div class="col-lg-7">
                        <div class="about-content">
                            <h4>Welcome to YSEWA</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et magna aliqua.
                                Ut enim ad minim veniam, nostrud exercitation.</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et magna aliqua.
                                Ut enim ad minim veniam, nostrud exercitation.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <app-testimonial></app-testimonial>
        <app-stat></app-stat>
        <app-download></app-download>
        <app-client></app-client>
    </div>
</template>

<script>
    import Testimonial from './includes/testimonial';
    import Stat from './includes/statistics';
    import Download from './includes/download';
    import Client from './includes/client';

    export default {
        name: "about-us",
        components: {
            'app-testimonial': Testimonial,
            'app-stat': Stat,
            'app-download': Download,
            'app-client': Client
        }
    }
</script>

<style scoped>

</style>