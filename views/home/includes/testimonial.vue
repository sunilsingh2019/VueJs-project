<template>
    <section class="testi-section pd-7">
        <div class="container">
            <div class="ysewa-title">
                <h3>What People say</h3>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et magna aliqua. Ut enim ad minim veniam, nostrud exercitation.
                </p>
            </div>
            <div class="testi-slider" ref="slider">

                <div class="testi-wrapper" v-for="(testimonial, index) in testimonials" v-for-callback="{key: index, array: testimonials, callback: lastLoop}">
                    <div class="testi-item">
                        <figure :style="{ 'background': 'url(' + testimonial.image + ')' }"></figure>
                        <p>{{ testimonial.description }}</p>
                        <div class="testi-footer">
                            <h5>{{ testimonial.name }}</h5>
                            <h6>{{ testimonial.title }}</h6>
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
        name: "testimonial",
        inject: [ 'homeRepository', ],
        mixins: [ Promise, ],
        data() {
            return {
                testimonials: []
            }
        },
        mounted() {
            this.getTestimonials();
        },
        methods: {
            getTestimonials() {
                let operation = this.response(this.homeRepository.getTestimonials());
                operation.then(data => {
                    if (operation.isFulfilled()) {
                        this.testimonials = data;
                    }
                }).catch(err => {
                    if (operation.isRejected()) {
                        if (err.status === 417) {
                            this.form.errors.set(err.data.body);
                        }
                    }
                });
            },
            initTestimonialSlider() {
                $('.testi-slider').not('.slick-initialized').slick({
                    slidesToShow: 3,
                    centerMode: true,
                    responsive: [
                        {
                            breakpoint: 992,
                            settings: {
                                arrows: false,

                                slidesToShow: 2
                            }
                        },
                        {
                            breakpoint: 600,
                            settings: {
                                arrows: false,
                                centerMode: true,
                                slidesToShow: 1
                            }
                        }
                    ]
                });
            },
            lastLoop(key) {
                this.$nextTick(function () {
                    this.initTestimonialSlider();
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