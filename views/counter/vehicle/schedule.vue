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
                            <a href="#" class="ysewa-button border-button sm-button" @click.prevent="openModal">Add new</a>
                        </div>
                        <div class="card-body">
                            <!-- table filter start -->
                            <div class="filter-form dashboard-filter">
                                <form>
                                    <div class="row">
                                        <div class="col-md-3">
                                            <div class="form-group mr-0">
                                                <label>Bus number</label>
                                                <input v-model="filter.bus_number" @input="search" type="text" placeholder="Ex:1934" class="form-control"/>
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form-group mr-0">
                                                <label>To</label>
                                                <input v-model="filter.to_location" @input="search" type="text" placeholder="Drop off address"
                                                       class="form-control"/>
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form-group mr-0">
                                                <label>select Date</label>
                                                <div class="input-group mr-0">
                                                    <input v-model="filter.start_date" @input="search" type="text" placeholder="Select Date" autocomplete="off" id="nepaliDateD"
                                                           class="form-control nepali-calendar"/>
                                                    <div class="input-group-append">
                                                        <span class="input-group-text"><i>calendar_today</i></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form-group radio-group">
                                                <label>Travel</label>
                                                <div class="custom-control custom-radio custom-control-inline">
                                                    <input type="radio" id="day" name="day"
                                                           class="custom-control-input">
                                                    <label class="custom-control-label" for="day">Day</label>
                                                </div>
                                                <div class="custom-control custom-radio custom-control-inline">
                                                    <input type="radio" id="night" name="day"
                                                           class="custom-control-input">
                                                    <label class="custom-control-label" for="night">Night</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <div class="table-responsive">
                                <table class="ysewa-table counter-table table"  style="size:auto; max-width: 100%;">
                                    <thead>
                                    <tr>
                                        <th>Bus no</th>
                                        <th>to</th>
                                        <th>bus type</th>
                                        <th>booked seat</th>
                                        <th width="20%">status</th>
                                        <th width="10%">Action</th>
                                    </tr>
                                    </thead>

                                    <transition-group name="fade" tag="tbody">
                                        <tr v-if="!loader" :class="`default tr-list-${row.id}`" v-for="(row, index) in rows" :key="row.id">
                                            <td>
                                                <a href="#" @click.prevent="manageSeat(row.vehicle_id, row.id, index, row.departure_date, false)" class="businfo-td flex-start">
                                                    <h6><span>{{ row.vehicle_number }}</span>{{ row.registration_number }}</h6>
                                                </a>
                                            </td>
                                            <td>
                                                <div class="location">
                                                    <strong>{{ row.city_to }}</strong>
                                                    <time>{{ row.arrival_time }}</time>
                                                </div>
                                            </td>
                                            <td>
                                                <span class="bus-type">{{ row.vehicle_type | ucfirst }}</span>
                                            </td>
                                            <td>
                                                <span class="total-seat">{{ row.booked_seat_count }}</span>
                                            </td>
                                            <td>
                                                <a href="#" :class="isNotRed(row.status)">{{ row._status }}</a>
                                            </td>
                                            <td>
                                                <div class="table-action">
                                                    <a href="#" class="more-action" @click.prevent="slideActions(row.id)" @focusout="hideActions">
                                                        <i class="material-icons">more_vert</i>
                                                    </a>
                                                    <ul class="dropdown-animation dropdown-ul-actions" :id="`drop-down-${row.id}`">
                                                        <li>
                                                            <a href="#" class="flex-start" @click.prevent="edit(index)">
                                                                <i class="material-icons">edit</i> Edit
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#" class="flex-start" @click.prevent="destroy(index, row.id)">
                                                                <i class="material-icons">delete</i>Delete
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#" class="flex-start" @click.prevent="manageSeat(row.vehicle_id, row.id, index, row.departure_date, true)">
                                                                <i class="material-icons">settings_applications</i>Manage
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#" class="flex-start" @click.prevent="showChalani(row.vehicle_id, row.departure_date)">
                                                                <i class="material-icons">settings_applications</i>Show Chalani
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
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
                            <!-- The Modal -->
                            <div class="modal fade" tabindex="-1" role="dialog" ref="modal" id="scheduleModal">
                                <div class="modal-dialog modal-lg modal-dialog-centered">
                                    <div class="modal-content">
                                        <form v-model="form" @submit.prevent="save">
                                            <!-- Modal Header -->
                                            <div class="modal-header flex-between">
                                                <h4 class="modal-title">{{ isEditOn ? `Edit` : `Add` }} Schedule</h4>
                                                <button type="button" class="close" data-dismiss="modal">&times;
                                                </button>
                                                <a v-if="!isEditOn" href="#" class="ysewa-button border-button sm-button" v-on:click="addNewSchedule">Add new</a>
                                            </div>

                                            <!-- Modal body -->
                                            <div class="modal-body">
                                                <div class="table-responsive">
                                                    <table class="ysewa-table counter-table border-table mr-0 table">
                                                        <thead>
                                                        <tr>
                                                            <th></th>
                                                            <th>Name</th>
                                                            <th>Vehicle</th>
                                                            <th>Route</th>
                                                            <th>Departure Date & time</th>
                                                            <th>Arrival date & time</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        <tr v-for="(schedule, index) in schedules">
                                                            <td>
                                                                <button style="min-width: 10px;" v-on:click="removeSchedule(index)" type="button" class="ysewa-button border-button sm-button">
                                                                    &times;
                                                                </button> &nbsp;
                                                            </td>
                                                            <td>
                                                                <div class="form-group mr-0">
                                                                    <input name="schedules[][name]" v-model="schedule.name" type='text' class="form-control" placeholder="Name"/>
                                                                    <span class="invalid-feedback" v-if="hasError(index, 'name')">
                                                                        {{ getError(index, 'name') }}
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="form-group mr-0">
                                                                    <select class="form-control" v-model="schedule.vehicle_id" name="schedules[][vehicle_id]">
                                                                        <option value="0">Select Vehicle</option>
                                                                        <option :value="vehicle.id" v-for="vehicle in vehicles">{{ vehicle.name }}</option>
                                                                    </select>
                                                                    <span class="invalid-feedback" v-if="hasError(index, 'vehicle_id')">
                                                                        {{ getError(index, 'vehicle_id') }}
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="form-group mr-0">
                                                                    <select class="form-control" v-model="schedule.route_id" name="schedules[][route_id]">
                                                                        <option value="0">Select Route</option>
                                                                        <option :value="route.id" v-for="route in routes">{{ `${route.city_from_name} | ${route.city_to_name}` }}</option>
                                                                    </select>
                                                                    <span class="invalid-feedback" v-if="hasError(index, 'route_id')">
                                                                        {{ getError(index, 'route_id') }}
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="form-group" id="date-picker-container">
                                                                    <date-picker v-model="schedule.departure_date" name="schedules[][departure_date]" :config="options" autocomplete="off"></date-picker>

                                                                    <span class="invalid-feedback" v-if="hasError(index, 'departure_date')">
                                                                            {{ getError(index, 'departure_date') }}
                                                                        </span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="form-group">
                                                                    <date-picker v-model="schedule.arrival_date" name="schedules[][arrival_date]" :config="options" autocomplete="off"></date-picker>
                                                                    <span class="invalid-feedback" v-if="hasError(index, 'arrival_date')">
                                                                            {{ getError(index, 'arrival_date') }}
                                                                        </span>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>

                                            <div class="modal-footer">
                                                <div class="buttons">
                                                    <button type="button" class="ysewa-button border-button sm-button"
                                                            data-dismiss="modal">Cancel</button>
                                                    <button type="submit" class="ysewa-button sm-button" :disabled="form.busy">
                                                        save <i v-if="form.busy" class="fa fa-spinner fa-spin"/>
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
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
                                                <router-link class="print" to="/ticket-counter/chalani">
                                                    <i class="material-icons">print</i>
                                                </router-link>
                                                <router-link class="pdf" to="/ticket-counter/chalani">
                                                    <i class="material-icons">picture_as_pdf</i>
                                                </router-link>
                                            </div>
                                            <div class="buttons">
                                                <button type="button" class="ysewa-button border-button sm-button" @click="dismissConfirmModal" data-dismiss="modal">dismiss</button>
                                            </div>
                                        </div>

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
    import Error from "../../../lib/Mixins/Error";
    import Alert from "../../../lib/Mixins/Alert";
    import Utils from "../../../lib/Mixins/Utils";
    import SeatLayout from "./partials/seat-booking";
    import Promise from "../../../lib/Mixins/ExtendedPromises";

    import datePicker from 'vue-bootstrap-datetimepicker';
    import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';

    export default {
        name: "schedule",
        inject: [ "scheduleRepository", "vehicleRepository", "routeRepository", "bookingRepository", ],
        mixins: [ Error, Promise, Alert, Utils ],
        components: {
            SeatLayout, datePicker
        },
        data() {
            return {
                title: 'Schedule',
                rows: [],
                loader: false,
                form: this.buildForm(),
                vehicles: [],
                routes: [],
                seats: [],
                seatStats: [],
                result1: null,
                filter: {
                    bus_number: null,
                    to_location: null,
                    start_date: null
                },
                schedule: {
                    name: '',
                    vehicle_id: 0,
                    route_id: 0,
                    departure_date: '',
                    arrival_date: ''
                },
                schedules: [{
                    name: '',
                    vehicle_id: 0,
                    route_id: 0,
                    departure_date: '',
                    arrival_date: ''
                }],
                isEditOn: false,
                selectedVehicle: '',
                selectedSeats: [],
                vehicleInfo: [],
                passenger: [],
                options: {
                    format: 'YYYY-MM-DD hh:mm:ss',
                    useCurrent: false,
                }
            };
        },
        computed: {
            totalPassengerSeatPrice: function () {
                return Object.values(this.selectedSeats).reduce((prev, cur) => prev + cur.price, 0)
            }
        },
        mounted() {
            $('#nepaliDateD').nepaliDatePicker({
                dateFormat: "%D, %M %d, %y",
                closeOnDateSelect: true
            });
            this.initDatePicker();
            this.beforeOpenModal();
            this.dismissModal();
        },
        async created() {
            this.rows = await this.scheduleRepository.get();
            this.vehicles = await this.vehicleRepository.getVehicles();
            this.routes = await this.routeRepository.get();
        },
        methods: {
            buildForm: (schedule) => {
                return new GPForm({
                    name:  schedule ? schedule.name : null,
                    vehicle_id:  schedule ? schedule.vehicle_id : 0,
                    route_id:  schedule ? schedule.route_id : 0,
                    departure_date:  schedule ? schedule.departure_date : new Date(),
                    arrival_date:  schedule ? schedule.arrival_date : new Date(),
                });
            },

            async search() {
                this.rows = await this.scheduleRepository.get(this.filter);
            },

            initDatePicker() {
                $('body').on('focus', `.date-picker-${this.schedules.length - 1}`, function(){
                    $(this).datetimepicker({ format:'YYYY-MM-DD hh:mm:ss', });
                });
            },

            updateDate(value, index) {
                // console.log(value, index)
            },

            save() {
                this.form.startProcessing();
                let operation = this.schedules[0]['id'] ? this.update(this.schedules[0]['id']) : this.add();
                operation.then(data => {
                    if (operation.isFulfilled()) {
                        this.rows = data;
                        this.resetSchedules();
                        this.hideModal();
                        this.form.finishProcessing();
                        this.$toastr.s("SUCCESS", `Successfully ${this.schedules[0]['id'] ? 'updated' : 'added'} !`);
                    }
                }).catch(err => {
                    if (operation.isRejected()) {
                        if (err.status === 417) {
                            this.errors = err.data.body;
                        }
                    }
                    this.form.finishProcessing();
                });
            },

            edit(index) {
                this.hideActions();
                this.isEditOn = true;
                this.openModal();
                this.schedules = [{}];
                this.schedules[0] = this.rows[index];
            },

            add() {
                return this.response(this.scheduleRepository.create(this.schedules));
            },

            update(id) {
                return this.response(this.scheduleRepository.update(id, this.schedules));
            },

            destroy(index, id) {
                this.hideActions();

                this.confirm((result) => {
                    if (result.value) {
                        let deletion = this.response(this.scheduleRepository.delete(id));
                        deletion.then(data => {
                            if (deletion.isFulfilled()) {
                                delete this.rows[index];
                                this.rows.splice(index, 1);
                                this.$toastr.s("SUCCESS", "Successfully deleted !");
                            } else if (deletion.isRejected()) {
                                if (error.response.status === 417) {
                                    this.$toastr.e(data.response.data.body);
                                }
                            }
                        });
                    }
                });
            },

            dismissConfirmModal() {
                $('#confirmModal').modal('hide');
                this.removeSeatLayout();
            },

            openModal() {
                $(this.$refs.modal).modal({backdrop: 'static', keyboard: false});
            },

            hideModal() {
                this.isEditOn = false;
                $(this.$refs.modal).modal('hide');
            },

            beforeOpenModal() {
                $(this.$refs.modal).on("show.bs.modal", function() {
                    this.resetSchedules();
                    this.setDefaultErrors();
                }.bind(this));
            },

            dismissModal() {
                $(this.$refs.modal).on("hidden.bs.modal", function() {
                    this.resetSchedules();
                    this.setDefaultErrors();
                }.bind(this));
            },

            addNewSchedule() {
                this.schedules.push(Vue.util.extend({}, this.schedule));
                // this.initDatePicker();
            },
            removeSchedule(index) {
                Vue.delete(this.schedules, index);
            },

            slideActions(rowId) {
                this.hideActions();
                let el = $(`#drop-down-${rowId}`);
                if (el.is(':visible')) {
                    el.hide(1000);
                } else {
                    el.show(1000);
                }
            },

            hideActions() {
                $('.dropdown-ul-actions').each (function() {
                    $(this).hide(1000);
                });
            },

            resetSchedules() {
                this.schedules = [];
            },

            isNotRed(status) {
                return parseInt(status) === 0 ? 'red status' : 'green status' ;
            },

            manageSeat(vehicle, schedule, index, departure_date, toggle) {
                this.selectedVehicle = vehicle;
                this.vehicleInfo = this.rows[index];
                if (toggle) {
                    this.slideActions(schedule);
                }
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

            showChalani(vehicle, departure_date) {
                this.$router.push({
                    name: 'chalani',
                    params: {
                        vehicleId: vehicle,
                        date: departure_date
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
                        schedule: id
                    }
                });
                instance.$on('clicked-confirm', this.resolveConfirmedDetails);
                instance.$mount();
                $(`.tr-list-${id}`).after(instance.$el);
            },

            removeSeatLayout() {
                $('.seat-layout-row').each (function() {
                    $(this).remove();
                });
            },

            resolveConfirmedDetails(values) {
                const allowed = ['passenger_email', 'passenger_name', 'passenger_phone_no', 'boarding_location', 'schedule_id'];
                this.passenger = values.form;
                this.selectedSeats = values.selected;

                $('#confirmModal').modal({backdrop: 'static', keyboard: false});
            },

            formatDatetime: function(datetime) {
                if (datetime === null) {
                    return "[null]";
                } else {
                    return datetime.format("YYYY-MM-DD HH:mm:ss");
                }
            },
            formatDate: function(date) {
                if (date === null) {
                    return "[null]";
                } else {
                    return date.format("YYYY-MM-DD");
                }
            },
            formatTime: function(time) {
                if (time === null) {
                    return "[null]";
                } else {
                    return time.format("HH:mm:ss");
                }
            },
            onStartDatetimeChanged: function(newStart) {
                var endPicker = this.$.endPicker.control;
                endPicker.minDate(newStart);
            },
            onEndDatetimeChanged: function(newEnd) {
                var startPicker = this.$.startPicker.control;
                startPicker.maxDate(newEnd);
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
    .datepicker {
        z-index: 1600 !important; /* has to be larger than 1050 */
    }
    bootstrap-datetimepicker-widget {
        z-index: 100000 !important;
    }
    .popup { z-index : 999!important; }

    .invalid-feedback {
        display: block!important;
    }
</style>