<template>
    <div class="authentication">
        <!-- login info start -->
        <div class="col-md-6 pd-0">
            <div class="auth-form login-info" style="background:url(images/banner-bg.jpg)">
                <div class="overlay"></div>
                <div class="header">
                    <img class="logo" src="/images/ysewa.png" alt="Login">
                </div>
                <div class="login-content">
                    <div class="welcome">
                        <h2><span>Welcome to</span>Y-SEWA</h2>
                        <p>Ysewa – Nepal’s first online realtime bus ticket booking platform powered by Diyalo Technologies Pvt. Ltd. BusSewa came into existence with a vision of innovating business processes of Travel Operators in Nepal to provide quality service to road passengers.</p>
                    </div>
                </div>
                <div class="powered-by">
                    <span>Powered by</span><strong>Ysewa</strong>
                </div>
            </div>
        </div>

        <!-- login form start -->
        <div class="col-md-6">
            <div class="auth-form login-form">

                <div class="login-wrap">
                    <div class="login-header">
                        <h3>sign in</h3>
                        <span>Enter your details below</span>
                    </div>
                    <form v-model="form" @submit.prevent="login">
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input v-model="form.email" id="email" type="email" class="form-control" placeholder="Enter email" required />
                            <div class="invalid-feedback" v-show="form.errors.has('email')">
                                {{ form.errors.get('email') }}
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="password" class="">password</label>
                            <input id="password" v-model="form.password" type="password" class="form-control" placeholder="Enter password" required />
                            <div class="invalid-feedback" v-show="form.errors.has('password')">
                                {{ form.errors.get('password') }}
                            </div>
                        </div>
                        <div class="form-group">
                            <button type="submit" :disabled="form.busy" class="ysewa-button">
                                Sign in <i v-if="form.busy" class="fa fa-spinner fa-spin"/>
                            </button>
                        </div>
                        <div class="forgot-password">
                            <a href="#">Forgot your password ?</a>
                        </div>
                        <div class="forgot-password">
                            <router-link to="/register">Sign Up</router-link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Alert from "../../lib/Mixins/Alert";
    import Promise from "../../lib/Mixins/ExtendedPromises";
    import { COUNTER, COUNTER_REDIRECT_URL, NORMAL_REDIRECT_URL } from "../../lib/constant";

    export default {
        name: "login",
        inject: [ 'authRepository', ],
        mixins: [ Promise, Alert, ],
        data() {
            return {
                title: 'Welcome back!',
                form: this.buildForm(),
            }
        },
        computed:{
            authError(){
                return this.$store.getters.authError;
            },
            registeredUser(){
                return this.$store.getters.registeredUser;
            }
        },
        methods: {
            buildForm(auth) {
                return new GPForm({
                    email: auth ? auth.email : null,
                    password: auth ? auth.password : null,
                    remember_me: auth ? auth.remember_me : false,
                });
            },

            login() {
                let route = '';
                this.form.startProcessing();
                this.$store.dispatch('login');
                let operation = this.response(this.authRepository.login(this.form));
                operation.then(data => {
                    if (operation.isFulfilled()) {
                        this.$store.commit("loginSuccess", data);
                        this.form.finishProcessing();
                        switch (this.$store.getters.getRole) {
                            case COUNTER: {
                                route = COUNTER_REDIRECT_URL;
                                break;
                            }
                            default: {
                                route = NORMAL_REDIRECT_URL;
                                break;
                            }
                        }
                        this.$router.push(route);
                        this.$toastr.s("", 'You are logged in successfully !');
                    }
                }).catch(err => {
                    if (operation.isRejected()) {
                        if (err.status === 417) {
                            this.form.errors.set(err.data.body);
                        }
                        if (err.status === 401) {
                            this.$toastr.e("", err.data.status.message);
                        }
                        this.$store.commit("loginFailed", {err});
                    }
                    this.form.finishProcessing();
                });
            }
        }
    }
</script>

<style scoped>
    .authentication .auth-form.login-info .welcome h2 {
         font-size: 2rem;
        color: #ffffff;
    }

    .authentication .auth-form.login-info .welcome h2 span {
        color: #FFF;
    }

    .authentication .auth-form.login-info .powered-by {
        color: #FFF;
    }
</style>