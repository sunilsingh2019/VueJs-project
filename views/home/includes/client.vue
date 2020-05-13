<template>
    <section class="client-section">
        <div class="container">
            <div class="client-slider">
                <div class="client-item" v-for="(client, index) in clients" v-for-callback="{key: index, array: clients, callback: lastLoop}">
                    <figure>
                        <img :src="client.image" :alt="client.name" />
                    </figure>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import Promise from "../../../lib/Mixins/ExtendedPromises";

    export default {
        name: "client",
        inject: [ 'homeRepository', ],
        mixins: [ Promise, ],
        data() {
            return {
                clients: []
            }
        },
        mounted() {
            this.getClients();
        },
        methods: {
            getClients() {
                let operation = this.response(this.homeRepository.getClients());
                operation.then(data => {
                    if (operation.isFulfilled()) {
                        this.clients = data;
                    }
                }).catch(err => {
                    if (operation.isRejected()) {
                        if (err.status === 417) {
                            this.form.errors.set(err.data.body);
                        }
                    }
                });
            },
            initClientSlider() {
                $('.client-slider').not('.slick-initialized').slick({
                    slidesToShow: 6,
                    autoplay: true,
                    autoplaySpeed: 2000,

                    responsive: [
                        {
                            breakpoint: 768,
                            settings: {
                                arrows: false,
                                slidesToShow: 4
                            }
                        },
                        {
                            breakpoint: 480,
                            settings: {
                                arrows: false,
                                slidesToShow: 2
                            }
                        }
                    ]
                });
            },
            lastLoop(key) {
                this.$nextTick(function () {
                    this.initClientSlider();
                });
            }
        },
        directives: {
            forCallback(el, binding) {
                let element = binding.value;
                if (element.key == element.array.length - 1) {
                    if (typeof element.callback === 'function') {
                        element.callback(element.key);
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>