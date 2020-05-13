<template>
    <header class="site-header">
        <div class="container-fluid">
            <div class="headerWrap">
                <div class="headLeft">
                    <div class="logo">
                        <router-link to="/"><img src="/images/ysewa.png" alt="logo"></router-link>
                    </div>
                </div>

                <div class="headRight">
                    <nav id="site-navigation" class="main-navigation" role="navigation">
                        <div class="toggle-button">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <div class="menu-primary-container">
                            <ul id="primary-menu" class="menu nav-menu">
                                <li class="menu-item menu-item-has-current">
                                    <router-link to="/">Home</router-link>
                                </li>
                                <li class="menu-item">
                                    <router-link to="/about-us">About Us</router-link>
                                </li>
                                <li class="menu-item">
                                    <router-link to="/how-it-works">How it works</router-link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <div class="header-btns flex-end">
                        <router-link class="btn ysewa-button border-button" to="/login"><i>settings_phone</i>9856012345</router-link>
                        <router-link class="btn ysewa-button sm-button" to="/login" v-if="showLogin">Sign In</router-link>

                        <div class="dropdown" v-if="!showLogin">
                            <button class="btn ysewa-button sm-button dropdown-toggle btn-user" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false">
                                {{ currentUser.username }}
                            </button>
                            <div class="dropdown-menu dropdown-animation" aria-labelledby="dropdownMenuButton">
                                <router-link to="/bookings" class="dropdown-item">
                                    <i class="material-icons">account_circle</i> <span>My Profile</span>
                                </router-link>
                                <a class="dropdown-item" href="#" @click.prevent="logout">
                                    <i class="material-icons">power_settings_new</i> <span>Logout</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
    const { getToken, removeToken, removeUser } = require('../../../lib/storage');
    import Promise from "../../../lib/Mixins/ExtendedPromises";

    export default {
        name: "header",
        inject: [ 'authRepository', ],
        mixins: [ Promise, ],
        computed: {
            showLogin() {
                return !this.$store.getters.isLoggedIn;
            },
            currentUser(){
                return this.$store.getters.currentUser;
            }
        },
        methods: {
            logout() {
                let operation = this.response(this.authRepository.logout());
                operation.then(data => {
                    if (operation.isFulfilled()) {
                        this.$store.dispatch('logout');
                        this.$store.commit("logout");

                        const path = `/`;
                        if (this.$route.path !== path) this.$router.push(path);
                        this.$toastr.s("", `You are logged out successfully !`);
                    }
                }).catch(err => {
                    if (operation.isRejected()) {
                        if (err.status === 417) {
                            this.form.errors.set(err.data.body);
                        }
                        if (err.status === 401) {
                            this.$toastr.i("", err.data.message);
                        }
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .btn-user { text-transform: capitalize!important; }
</style>