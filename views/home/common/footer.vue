<template>
    <div>
        <footer class="site-footer">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-3 col-md-3">
                        <div class="footer-widget widget-border ">
                            <figure class="footer-logo">
                                <img src="/images/ysewa.png" alt="footer-logo">
                            </figure>
                        </div>
                    </div>
                    <div class="col-sm-3 col-md-3">
                        <div class="footer-widget widget-border ">
                            <address>
                                Nagarjun-7 Balaju <br />
                                Kathmandu, Nepal
                            </address>
                        </div>
                    </div>
                    <div class="col-sm-3 col-md-3">
                        <div class="footer-widget contact-widget widget-border ">
                            <p>ysewa@gmail.com</p>
                            <p>+977 - 9851012345</p>
                        </div>
                    </div>
                    <div class="col-sm-3 col-md-3">
                        <div class="footer-widget ">
                            <div class="social-widget">
                                <a href="#"><i class="fa fa-youtube"></i></a>
                                <a href="#"><i class="fa fa-facebook-f"></i></a>
                                <a href="#"><i class="fa fa-twitter"></i></a>
                                <a href="#"><i class="fa fa-linkedin"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

        <app-copy-right></app-copy-right>
    </div>
</template>

<script>
    import CopyRight from './copyright';
    export default {
        name: "footer",
        components: {
            'app-copy-right': CopyRight
        }
    }
</script>

<style scoped>

</style>