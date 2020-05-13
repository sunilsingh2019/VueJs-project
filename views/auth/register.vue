<template>
    <div class="authentication">
        <!-- login info start -->
        <div class="col-md-6 pd-0">
            <div class="auth-form login-info" style="background:url(images/banner-bg.jpg)">
                <div class="overlay"></div>
                <div class="header">
                    <img class="logo" src="http://ysewa.np/images/ysewa.png" alt="">
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
                        <h3>Create Account</h3>
                        <span>Enter your details below</span>
                    </div>
                    <form v-model="form" @submit.prevent="register">

                        <div class="row">
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label for="email">Username</label>
                                    <input v-model="form.username" id="username" type="text" class="form-control" placeholder="Enter username" required />
                                    <div class="invalid-feedback" v-show="form.errors.has('username')">
                                        {{ form.errors.get('username') }}
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label for="email">Email</label>
                                    <input v-model="form.email" id="email" type="email" class="form-control" placeholder="Enter email" required />
                                    <div class="invalid-feedback" v-show="form.errors.has('email')">
                                        {{ form.errors.get('email') }}
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label for="email">Phone Number</label>
                                    <input v-model="form.phone_number" id="phone_number" type="text" class="form-control" placeholder="Enter phone number" required />
                                    <div class="invalid-feedback" v-show="form.errors.has('phone_number')">
                                        {{ form.errors.get('phone_number') }}
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label for="password" class="">password</label>
                                    <input id="password" v-model="form.password" type="password" class="form-control" placeholder="Enter password" required />
                                    <div class="invalid-feedback" v-show="form.errors.has('password')">
                                        {{ form.errors.get('password') }}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <button type="submit" :disabled="form.busy" class="ysewa-button">
                                Sign Up <i v-if="form.busy" class="fa fa-spinner fa-spin"/>
                            </button>
                        </div>
                        <div class="forgot-password">
                            <router-link to="/login">Already have an account? Sign In !</router-link>
                        </div>
                        <div class="forgot-password">
                            <a href="#">Forgot your password ?</a>
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
    export default {
        name: "register",
        inject: [ 'authRepository', ],
        mixins: [ Promise, Alert, ],
        data() {
            return {
                title: 'Welcome back!',
                form: this.buildForm(),
            }
        },
        methods: {
            buildForm(auth) {
                return new GPForm({
                    username: auth ? auth.username : null,
                    phone_number: auth ? auth.phone_number : null,
                    email: auth ? auth.email : null,
                    password: auth ? auth.password : null,
                });
            },

            register() {
                this.form.startProcessing();
                this.$store.dispatch('login');
                let operation = this.response(this.authRepository.register(this.form));
                operation.then(data => {
                    if (operation.isFulfilled()) {
                        this.form.finishProcessing();
                        this.$router.push('/');
                        this.$toastr.s("", data.status.message);
                    }
                }).catch(err => {
                    if (operation.isRejected()) {
                        if (err.status === 417) {
                            this.form.errors.set(err.data.body);
                        }
                        if (err.status === 500) {
                            this.$toastr.e("", err.data.status.message);
                        }
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