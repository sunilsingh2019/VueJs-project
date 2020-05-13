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
                        <table class="ysewa-table  counter-table table">
                            <thead>
                            <tr>
                                <th>Company Name</th>
                                <th>Bus no</th>
                                <th>from</th>
                                <th>to</th>
                                <th>Date</th>
                            </tr>
                            </thead>

                            <transition-group name="fade" tag="tbody">
                                <tr v-if="!loader" :class="`default tr-list-${row.id}`" v-for="(row, index) in rows" :key="row.id">
                                    <td>
                                        <a href="#" @click.prevent="manageSeat(row.vehicle_id, row.id, index, row.departure_date)" class="businfo-td flex-start">
                                            <h6><span>{{ row.tenant_name }}</span>{{ row.vehicle_name }}</h6>
                                        </a>
                                    </td>
                                    <td>
                                        <a href="#" @click.prevent="manageSeat(row.vehicle_id, row.id, index, row.departure_date)" class="businfo-td flex-start">
                                            <h6><span>{{ row.vehicle_number }}</span>{{ row.registration_number }}</h6>
                                        </a>
                                    </td>
                                    <td>
                                        <div class="location">
                                            <strong>{{ row.city_from }}</strong>
                                            <time>{{ row.arrival_time }}</time>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="location">
                                            <strong>{{ row.city_to }}</strong>
                                            <time>{{ row.arrival_time }}</time>
                                        </div>
                                    </td>
                                    <td>
                                        {{ row.departure_date }}
                                    </td>
                                </tr>
                            </transition-group>

                            <tbody v-if="!rows.length || loader">
                            <tr v-if="!rows.length">
                                <td colspan="9" class="text-center"><b>No Schedule !</b></td>
                            </tr>

                            <tr v-if="loader">
                                <td colspan="9">
                                    <div class="loading-spinner"></div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- The Modal confirm ticket -->
                    <div class="modal fade" id="payment-modal">
                        <div class="modal-dialog modal-md modal-dialog-centered">
                            <div class="modal-content">

                                <!-- Modal Header -->
                                <div class="modal-header flex-between ticket-header">
                                    <button type="button" class="close"
                                            data-dismiss="modal">&times;</button>
                                </div>

                                <div class="modal-body">
                                    <div class="ticket-details" v-if="passenger.hasOwnProperty('passenger_name') && vehicleInfo && selectedSeats.length">
                                        <ul>
                                            <h4 class="yswea-counter-title">Passenger details</h4>
                                            <li><span>Passenger Name</span><b>{{ passenger.passenger_name || '' }}</b></li>
                                            <li><span>phone number</span><b class="bus-number">{{ passenger.passenger_phone_no || '' }}</b></li>
                                            <li><span>email</span><b>{{ passenger.passenger_email || '' }}</b></li>
                                            <li><span>pick up address</span><b>{{ passenger.boarding_location || '' }}</b></li>
                                        </ul>
                                        <ul>
                                            <h4 class="yswea-counter-title">Bus details</h4>
                                            <li><span>Bus number</span><b class="bus-number"><small>{{ vehicleInfo.vehicle_number }}</small>{{ vehicleInfo.registration_number }}</b></li>
                                            <li><span>Bus type</span><b>{{ vehicleInfo.vehicle_type | ucfirst }}</b></li>
                                            <li><span>Date</span><b>{{ vehicleInfo.departure_date }}</b></li>
                                            <li><span>time</span><b>{{ vehicleInfo.arrival_time }}</b></li>
                                            <li><span>seats</span><b>{{ selectedSeats | seatsNameOnly }}</b></li>
                                            <li><span>travel</span><b>{{ vehicleInfo.shift }}</b></li>
                                        </ul>
                                        <ul>
                                            <h4 class="yswea-counter-title">payment details</h4>
                                            <li><span>total seat</span><b>{{ selectedSeats.length }}</b></li>
                                            <li><span>total cost</span><b>rs.{{ totalPassengerSeatPrice }}</b></li>
                                        </ul>
                                        <div class="passenger-add mt-4">
                                            <h5 class="yswea-counter-title mb-2">Pay with</h5>
                                            <div class="payment-option">
                                                <a href="">
                                                    <img src="/images/esewa-logo.png" alt="esewa">
                                                </a>
                                                <a  @click.prevent="payment(bookingId)">
                                                    <img src="/images/imepay.png" alt="imepay">
                                                </a>
                                            </div>

                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>

                    <!-- The Modal confirm ticket -->
                    <div class="modal fade" id="confirmModal">
                        <div class="modal-dialog modal-md modal-dialog-centered">
                            <div class="modal-content">

                                <!-- Modal Header -->
                                <div class="modal-header flex-between ticket-header">
                                    <button type="button" class="close"
                                            data-dismiss="modal">&times;</button>
                                </div>

                                <!-- Modal body -->
                                <div class="modal-body">
                                    <div class="ticket-details" v-if="passenger.hasOwnProperty('passenger_name') && vehicleInfo && selectedSeats.length">
                                        <ul>
                                            <h4 class="yswea-counter-title">Passenger details</h4>
                                            <li><span>Passenger Name</span><b>{{ passenger.passenger_name || '' }}</b></li>
                                            <li><span>phone number</span><b class="bus-number">{{ passenger.passenger_phone_no || '' }}</b></li>
                                            <li><span>email</span><b>{{ passenger.passenger_email || '' }}</b></li>
                                            <li><span>pick up address</span><b>{{ passenger.boarding_location || '' }}</b></li>
                                        </ul>
                                        <ul>
                                            <h4 class="yswea-counter-title">Bus details</h4>
                                            <li><span>Bus number</span><b class="bus-number"><small>{{ vehicleInfo.vehicle_number }}</small>{{ vehicleInfo.registration_number }}</b></li>
                                            <li><span>Bus type</span><b>{{ vehicleInfo.vehicle_type | ucfirst }}</b></li>
                                            <li><span>Date</span><b>{{ vehicleInfo.departure_date }}</b></li>
                                            <li><span>time</span><b>{{ vehicleInfo.arrival_time }}</b></li>
                                            <li><span>seats</span><b>{{ selectedSeats | seatsNameOnly }}</b></li>
                                            <li><span>travel</span><b>{{ vehicleInfo.shift }}</b></li>
                                        </ul>
                                        <ul>
                                            <h4 class="yswea-counter-title">payment details</h4>
                                            <li><span>total seat</span><b>{{ selectedSeats.length }}</b></li>
                                            <li><span>total cost</span><b>rs.{{ totalPassengerSeatPrice }}</b></li>
                                        </ul>
                                    </div>

                                </div>

                                <!-- Modal footer -->
                                <div class="modal-footer ticket-footer">
                                    <div class="print-icons">
                                        <a href="#" class="print"><i class="material-icons">print</i></a>
                                        <a href="#" class="pdf"><i
                                                class="material-icons">picture_as_pdf</i></a>
                                    </div>
                                    <div class="buttons">
                                        <button type="button" class="ysewa-button border-button sm-button" @click="dismissConfirmModal"
                                                data-dismiss="modal">dismiss</button>
                                    </div>
                                </div>

                            </div>
                        </div>
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
            this.rows = await this.scheduleRepository.get(this.form);
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
                this.rows = await this.scheduleRepository.get(this.form);
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