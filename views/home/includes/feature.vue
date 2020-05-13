<template>
    <section class="feature-section pd-7">
        <div class="container">
            <div class="ysewa-title is-white center">
                <h3>why book with us</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et magna aliqua. Ut enim ad minim veniam, nostrud exercitation.</p>
            </div>
            <div class="row">
                <div class="col-lg-4" v-for="feature in features">
                    <div class="feature-item">
                        <figure>
                            <img :src="feature.image" :alt="feature.title" />
                        </figure>
                        <div class="feature-content">
                            <h4>{{ feature.title }}</h4>
                            <p>{{ feature.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import Promise from "../../../lib/Mixins/ExtendedPromises";

    export default {
        name: "feature",
        inject: [ 'homeRepository', ],
        mixins: [ Promise, ],
        data() {
            return {
                features: []
            }
        },
        mounted() {
            this.getFeatures();
        },

        methods: {
            getFeatures() {
                let operation = this.response(this.homeRepository.getFeatures());
                operation.then(data => {
                    if (operation.isFulfilled()) {
                        this.features = data;
                    }
                }).catch(err => {
                    if (operation.isRejected()) {
                        if (err.status === 417) {
                            this.form.errors.set(err.data.body);
                        }
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>