<template>
    <section class="banner bg-image" data-background="/images/banner-bg.jpg">
        <div class="overlay"></div>
        <div class="container">
            <div class="banner-content">
                <h1>We are assist anytime anywhere To Deliver</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et magna aliqua. Ut enim ad minim veniam, nostrud exercitation.</p>
            </div>
        </div>
        <div class="road">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"
                 id="Layer_1" x="0px" y="0px" viewBox="0 0 1920 70" style="enable-background:new 0 0 1920 70;"
                 xml:space="preserve">
                    <g>
                        <rect x="1.1" class="st0" width="1920" height="70"></rect>
                        <g>
                            <g>
                                <line class="st74" x1="1920" y1="35" x2="1912" y2="35"></line>
                                <line class="st75" x1="1920" y1="35" x2="11.9" y2="35"></line>
                                <line class="st74" x1="6" y1="35" x2="0" y2="35"></line>
                            </g>
                        </g>
                        <g>
                            <g>
                                <line class="st74" x1="1920" y1="35" x2="1912" y2="35"></line>
                                <line class="st76" x1="1920" y1="35" x2="1912" y2="35"></line>
                                <line class="st74" x1="7" y1="35" x2="1" y2="35"></line>
                            </g>
                        </g>
                    </g>
                </svg>
            <span class="taxi mini-van">
                    <img src="/images/mini-van.png" alt="mini-van bus" />
                </span>
            <span class="taxi van">
                    <img src="/images/van.png" alt="van bus" />
                </span>


        </div>
    </section>
</template>

<script>
    export default {
        name: "banner",
        mounted() {
            var winHeight = $(window).innerHeight();
            var headerHeight = $('.site-header').innerHeight();
            var bannerHeight = winHeight - headerHeight;
            var winWidth = $( window ).width();
            var mobileHeight = $('.app-section .mobile-app').innerHeight();
            $('.banner, .banner-content').css({ 'height': bannerHeight - 50 });
            $('.app-section .app-content').css({ 'min-height': mobileHeight });
            if(winWidth <= 767){
                $('.app-section .app-content').css({'min-height': 'auto'});
            }

            $(".bg-image").each(function () {
                if ($(this).attr("data-background")) {
                    $(this).css("background-image", `url(${window.location.href}/images/banner-bg.jpg)`);
                }
            })
        }
    }
</script>

<style scoped>

</style>