<template>
    <div class="container-fluid">
        <div class="dashboard-wrapper mt-5">
            <div class="card ">
                <div class="card-header flex-between">
                    <h5>{{ `${title} List` }}</h5>
                </div>
                <div class="card-body">
                    <!-- table filter start -->
                    <div class="filter-form dashboard-filter">
                        <form>
                            <div class="row">
                                <div class="col-lg-2 col-md-6">
                                    <div class="form-group mr-0">
                                        <label>From</label>
                                        <input v-model="form.from" type="text" placeholder="Ex:1934" class="form-control"/>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-6">
                                    <div class="form-group mr-0">
                                        <label>To</label>
                                        <input v-model="form.to" type="text" placeholder="Drop off address"
                                               class="form-control"/>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-6">
                                    <div class="form-group mr-0">
                                        <label>select Date</label>
                                        <div class="input-group mr-0">
                                            <date-picker v-model="form.date" :config="options" autocomplete="off"></date-picker>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-6">
                                    <div class="form-group radio-group">
                                        <label>Type</label>
                                        <div class="custom-control custom-radio custom-control-inline">
                                            <input type="radio" id="ac" name="type" v-model="form.type"
                                                   value="ac" class="custom-control-input">
                                            <label class="custom-control-label" for="ac">AC</label>
                                        </div>
                                        <div class="custom-control custom-radio custom-control-inline">
                                            <input type="radio" id="dc" name="type" v-model="form.type"
                                                   value="dc" class="custom-control-input">
                                            <label class="custom-control-label" for="dc">DC</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-6">
                                    <div class="form-group radio-group">
                                        <label>Shift</label>
                                        <div class="custom-control custom-radio custom-control-inline">
                                            <input type="radio" id="day" name="shift" v-model="form.shift"
                                                   value="day" class="custom-control-input">
                                            <label class="custom-control-label" for="day">Day</label>
                                        </div>
                                        <div class="custom-control custom-radio custom-control-inline">
                                            <input type="radio" id="night" name="shift" v-model="form.shift"
                                                   value="night" class="custom-control-input">
                                            <label class="custom-control-label" for="night">Night</label>
                                        </div>

                                        <div class="custom-control custom-radio custom-control-inline">
                                            <input type="radio" id="all" name="shift" v-model="form.shift"
                                                   value="all"
                                                   class="custom-control-input">
                                            <label class="custom-control-label" for="all">All</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-sm-3">
                                    <div class="form-group ">
                                        <button class="ysewa-button border-button mt-4" @click.prevent="search">Search</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div class="table-responsive">
                    <table class="ysewa-table chalani-table mt-4  table ">
                        <thead>
                            <tr>
                                <th>ticket id</th>
                                <th>full name</th>
                                <th>seat number</th>
                                <th>destination</th>
                                <th>border</th>
                                <th>Route</th>
                                <th>no of People</th>
                                <th>phone number</th>
                                <th>price</th>
                                <th>remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- <transition-group name="fade" tag="tbody"> -->
                            <tr :class="`default tr-list-${row.id}`" v-for="row in rows" :key="row.id">
                                <td>
                                    <span class="ticked-id">{{row.ticket_id}}</span>
                                </td>
                                <td>
                                    <span class="passenger-name">{{row.full_name}}</span>
                                </td>
                                <td>
                                    <span class="seat">{{row.seats}}</span>
                                    <span class="seat">A2</span>
                                </td>

                                <td>
                                    <span>{{row.destination}}</span>
                                </td>
                                <td>
                                    <span>{{row.border}}</span>
                                </td>
                                <td>
                                    <span>{{row.route}}</span>
                                </td>
                                <td>
                                    <span>{{row.no_of_people}}</span>
                                </td>
                                <td>
                                    <span class="phone">{{row.phone_number}}</span>
                                </td>
                                <td>
                                    <span class="price">{{row.price}}</span>
                                </td>
                                <td>
                                    <div class="action">
                                        <span class="status green">{{row.remarks}}</span>
                                        <router-link :to="'/get-ticket/'+row.id">
                                        <span class="print-icon">
                                            <i class="material-icons">print</i>
                                        </span>
                                        </router-link>
                                    </div>
                                </td>

                            </tr>
                        </tbody>
                            <!-- </transition-group> -->
                            <tbody v-if="!rows.length || loader">
                            <tr v-if="!rows.length">
                                <td colspan="9" class="text-center"><b>No Booking !</b></td>
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
</template>

<script>
    import Error from "../../lib/Mixins/Error";
    import Promise from "../../lib/Mixins/ExtendedPromises";
    import Alert from "../../lib/Mixins/Alert";
    import Utils from "../../lib/Mixins/Utils";
    import SeatLayout from "../counter/vehicle/partials/seat-booking";

    import datePicker from 'vue-bootstrap-datetimepicker';
    import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';

    export default {
        name: "bookings",
        inject: [ "scheduleRepository", "vehicleRepository", "routeRepository", "bookingRepository", ],
        mixins: [ Error, Promise, Alert, Utils ],
        components: {
            SeatLayout,  datePicker
        },
        data() {
            return {
                title: '',
                rows: [],
                loader: false,
                form: this.buildForm(),
                vehicles: [],
                routes: [],
                seats: [],
                seatStats: [],
                filter: {
                    bus_number: null,
                    to_location: null,
                    start_date: null
                },
                schedule: {
                    name: '',
                    vehicle_id: '',
                    route_id: '',
                    departure_date: '',
                    arrival_date: ''
                },
                schedules: [{
                    name: '',
                    vehicle_id: '',
                    route_id: '',
                    departure_date: '',
                    arrival_date: ''
                }],
                isEditOn: false,
                selectedVehicle: '',
                selectedSeats: [],
                vehicleInfo: [],
                passenger: [],
                bookingId:null,
                options: {
                    format: 'YYYY-MM-DD',
                    useCurrent: false,
                }
            };
        },
        computed: {
            totalPassengerSeatPrice: function () {
                return Object.values(this.selectedSeats).reduce((prev, cur) => prev + cur.price, 0);
            }
        },
        
        async created() {
            this.rows = await this.bookingRepository.getMyBooking(this.form);
        },
        mounted(){
            console.log(this.rows);
        },
        methods: {
            buildForm(schedule) {
                schedule = this.$route.params;
                return new GPForm({
                    from:  schedule ? schedule.filter_from : null,
                    to:  schedule ? schedule.filter_to : null,
                    date:  schedule ? schedule.filter_date : null,
                    type:  schedule ? schedule.filter_type : null,
                    shift:  schedule ? schedule.filter_shift : null,
                });
            },

            async search() {
                this.rows = await this.bookingRepository.getMyBooking(this.form);
            },

            initDatePicker() {
                $('body').on('focus', `.date-picker-${this.schedules.length - 1}`, function(){
                    $(this).datetimepicker({ format:'YYYY-MM-DD hh:mm:ss', });
                });
            },

            dismissConfirmModal() {
                $('#confirmModal').modal('hide');
                this.removeSeatLayout();
            },

            isNotRed(status) {
                return parseInt(status) === 0 ? 'red status' : 'green status' ;
            },

            manageSeat(vehicle, schedule, index, departure_date) {
                this.selectedVehicle = vehicle;
                this.vehicleInfo = this.rows[index];
                this.removeSeatLayout();
                let operation = this.response(this.vehicleRepository.getSeats(vehicle));
                operation.then(data => {
                    if (operation.isFulfilled()) {
                        this.seats = data;
                        this.getSeatStats(vehicle, schedule, departure_date);
                    }
                }).catch(err => {
                    if (operation.isRejected()) {
                        if (err.status === 417) {
                            this.errors = err.data.body;
                        }
                    }
                });
            },

            getSeatStats(vehicle, schedule, departure_date) {
                let operation = this.response(this.vehicleRepository.getSeatStats(vehicle, departure_date));

                operation.then(data => {
                    if (operation.isFulfilled()) {
                        this.seatStats = data;
                        this.appendSeatLayout(schedule, departure_date, vehicle);
                        this.$toastr.s("SUCCESS", `Successfully seat loaded!`);
                    }
                }).catch(err => {
                    if (operation.isRejected()) {
                        if (err.status === 417) {
                            this.errors = err.data.body;
                        }
                    }
                });
            },
            payment(bookingId) {
                
                // this.$route.push({name:'pay',params:bookingId});
                let operation = this.response(this.bookingRepository.paymentResponse(bookingId));
                // console.log(operation);
                operation.then(data => {
                    window.location.href = '/pay/'+bookingId;
                        // this.$router.push({ path: '/pay/'+bookingId });
                }).catch(err => {
                    if (operation.isRejected()) {
                        if (err.status === 417) {
                            this.errors = err.data.body;
                        }
                    }
                });
            },
            appendSeatLayout(id, departure_date, vehicle) {
                let seatLayout = Vue.extend(SeatLayout);
                let confirmDetail = [];
                let instance = new seatLayout({
                    propsData: {
                        seats: this.seats,
                        stats: this.seatStats,
                        vehicle: vehicle,
                        travel_date: departure_date,
                        schedule: id,
                        btn_name: 'Next',
                        result_type: 'payout'
                    }
                });
                instance.$on('clicked-confirm', this.resolveConfirmedDetails);
                instance.$on('clicked-payout', this.resolvePayoutDetails);
                instance.$mount();
                $(`.tr-list-${id}`).after(instance.$el);
            },

            removeSeatLayout() {
                $('.seat-layout-row').each (function() {
                    $(this).remove();
                });
            },

            resolveConfirmedDetails(values) {
                const allowed = ['bookingId','passenger_email', 'passenger_name', 'passenger_phone_no', 'boarding_location', 'schedule_id'];
                console.log(values);
                this.passenger = values.form;
                this.selectedSeats = values.selected;
                this.bookingId = values.bookingId;
                $('#confirmModal').modal({backdrop: 'static', keyboard: false});
            },

            resolvePayoutDetails(values) {
                const allowed = ['bookingId','passenger_email', 'passenger_name', 'passenger_phone_no', 'boarding_location', 'schedule_id'];
                console.log(values);
                this.passenger = values.form;
                this.selectedSeats = values.selected;
                this.bookingId = values.bookingId;

                $('#payment-modal').modal({backdrop: 'static', keyboard: false});
            }
        },

        filters: {
            ucfirst(value) {
                if (!value) return;
                return value[0].toUpperCase() + value.slice(1);
            },
            seatsNameOnly(value) {
                if (!value) return;
                return value.map(function(seat){
                    return seat.name;
                }).join(", ");
            }
        },
    }
</script>

<style scoped>

</style>