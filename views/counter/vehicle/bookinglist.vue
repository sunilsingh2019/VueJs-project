<template>
    <div class="container-fluid">
        <div class="dashboard-wrapper mt-5">
            <div class="row">
                <div class="col-lg-3 col-md-4">
                    <counter-sidebar></counter-sidebar>
                </div>
                <div class="col-lg-9 col-md-8">
                    <div class="card ">
                        <div class="card-header flex-between">
                            <h5>{{ `${title} List` }}</h5>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="ysewa-table counter-table table">
                                    <thead>
                                    <tr>
                                        <th>orderID</th>
                                        <th>Vehicle</th>
                                        <th>User</th>
                                        <th>Phone</th>
                                        <th>travel date</th>
                                        <th>Chair</th>
                                        <th>status</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody name="fade" tag="tbody">
                                        <tr :class="`default tr-list-${row.id}`"  class="default" v-for="row in rows" :key="row.id">
                                            <td>
                                                <a href="#" class="businfo-td flex-start">
                                                    <h6><span>{{ row.ticket_id }}</span></h6>
                                                </a>
                                            </td>
                                            <td>
                                                <span class="bus-type">{{ row.vehicle_name }}</span><br>
                                                <span class="bus-type">{{ row.vehicle_number }}</span>
                                            </td>
                                            <td>
                                                <span class="total-seat">{{ row.passenger_name }}</span>
                                            </td>
                                            <td>
                                                <div class="driver-info">
                                                    <strong>{{ row.passenger_phone_no }}</strong>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="driver-info">
                                                    <strong>{{ row.travel_date }}</strong>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="driver-info">
                                                    <strong>{{ row.booking_chairs }}</strong>
                                                    <span>RS. {{ row.booking_item_price }}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="action">
                                                <span :class="isNotRed(row.status)">{{ row.status }}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="action">
                                                    <router-link :to="'/ticket-counter/get-ticket/'+row.booking_id">
                                                    <span class="print-icon">
                                                        <i class="material-icons">print</i>
                                                    </span>
                                                    </router-link>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>

                                    <tbody v-if="!rows.length || loader">
                                    <tr v-if="!rows.length">
                                        <td colspan="9" class="text-center"><b>No Vehicle !</b></td>
                                    </tr>

                                    <tr v-if="loader">
                                        <td colspan="9">
                                            <div class="loading-spinner"></div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import Alert from "../../../lib/Mixins/Alert";
    import Error from "../../../lib/Mixins/Error";
    import Utils from "../../../lib/Mixins/Utils";
    import Promise from "../../../lib/Mixins/ExtendedPromises";
    import SeatLayout from "./partials/layout";

    export default {
        name: "booking-list",
        inject: [ "vehicleRepository","bookingRepository" ],
        mixins: [ Error, Promise, Alert, Utils ],
        components: {
            SeatLayout
        },
        data() {
            return {
                title: 'Booking',
                rows: [],
                loader: false,
                editIndex: null,
            }
        },
        async created() {
            this.rows = await this.bookingRepository.getBookingForCounter();
        },

        methods: {
            isNotRed(status) {
                return (status) === 'pending' ? 'status red' : 'status green' ;
            },
        }

    }
</script>

<style lang="scss" scoped>
    @mixin loading-spinner($activeColor: #1ab394, $selector: "&::before", $time: 1.5s) {
        @keyframes spinner {
            0% {
                transform: translate3d(-50%, -50%, 0) rotate(0deg);
            }

            100% {
                transform: translate3d(-50%, -50%, 0) rotate(360deg);
            }
        }

        animation-play-state: running;
        opacity: 1;
        position: relative;

        &.-paused {
            animation-play-state: paused;
            opacity: 0.2;
            transition: opacity linear 0.1s;
        }

        #{$selector} {
            animation: $time linear infinite spinner;
            animation-play-state: inherit;
            border: solid 3px #ffffff;
            border-bottom-color: #{$activeColor};
            border-radius: 50%;
            content: "";
            height: 40px;
            left: 50%;
            opacity: inherit;
            position: absolute;
            top: 50%;
            transform: translate3d(-50%, -50%, 0);
            width: 40px;
            will-change: transform;
        }
    }

    .loading-spinner {
        @include loading-spinner;
        height: 12vh;
    }

    @media (min-width: 576px) {
        .modal-dialog {
            max-width: 1140px !important;
            margin: 1.75rem auto;
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: all .2s;
    }
    .fade-enter, .fade-leave-to{
        opacity: 0;
    }
    .fade-enter-active {
        transition-delay: .2s;
    }

    .ysewa-table .table-action ul {
        min-width: 200px!important;
    }
</style>