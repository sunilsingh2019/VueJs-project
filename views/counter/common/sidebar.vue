<template>
    <div>
        <ul class="dashboard-sidebar">
            <li>
                <router-link to="/ticket-counter/dashboard">
                    <i class="material-icons">dashboard</i>Overview
                </router-link>
            </li>
            <li>
                <router-link to="/ticket-counter/vehicle-list">
                    <i class="material-icons">directions_bus</i>Vehicle List
                </router-link>
            </li>
            <li>
                <router-link to="/ticket-counter/route-list">
                    <i class="material-icons">directions</i>Route List
                </router-link>
            </li>
            <li>
                <router-link to="/ticket-counter/booking-list">
                    <i class="material-icons">directions</i>Booking List
                </router-link>
            </li>
            <li>
                <router-link to="/ticket-counter/manage-seat">
                    <i class="material-icons">event_seat</i>Manage Seat
                </router-link>
            </li>
            <li>
                <router-link to="/ticket-counter/schedule">
                    <i class="material-icons">timer</i>Schedule
                </router-link>
            </li>
            <li>
                <a href="#"  @click.prevent="logout">
                    <i class="material-icons">power_settings_new</i>Logout</a>
            </li>
        </ul>
    </div>
</template>

<script>
    const { getToken, removeToken, removeUser } = require('../../../lib/storage');
    import Promise from "../../../lib/Mixins/ExtendedPromises";

    export default {
        name: "sidebar",
        inject: [ 'authRepository', ],
        mixins: [ Promise, ],
        methods: {
            logout() {
                this.$store.dispatch('logout');
                let operation = this.response(this.authRepository.logout());
                operation.then(data => {
                    if (operation.isFulfilled()) {
                        removeToken();
                        removeUser();
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

<style scoped>

</style>