<template>
    <tr class="toggle-row seat-layout-row">
        <td colspan="6">
            <div class="row">
                <div class="col-md-8">
                    <!-- bus seat start -->
                    <div class="bus-inner">
                        <!-- <div class="cockpit"> -->
                            <ol class="cabin fuselage">
                                <template v-for="(seat, index) in seats">
                                    <li :class="`seat-row row--${index}`">
                                        <seat
                                                :preserved="preserved" :booked="booked" :cancelled="cancelled"
                                                :not_seats="isNotSeats" :seats="seat" v-if="seats.hasOwnProperty(index)"
                                              @click.native="showDialogForPrices= true; enablePricesForAllSeats = false;"
                                                @clicked-seat="getSeat"></seat>
                                    </li>
                                </template>
                            </ol>
                        <!-- </div> -->
                    </div>
                    <!-- selected seat start -->
                    <div class="select-seat-list my-4" v-if="selectedSeats.length">
                        <h5 class="yswea-counter-title">Selected seat</h5>
                        <p v-if="!selectedSeats.length" class="text-center"><b>No Seat Selected!</b></p>

                        <ul class="seat-price-list flex-start">
                            <li v-for="(seat, index) in selectedSeats">
                                <b>{{ seat.name }}</b>
                                <span>Rs. {{ seat.price }}</span>
                            </li>
                        </ul>
                    </div>
                    <!-- total amount start -->
                    <div class="total-amount" v-if="selectedSeats.length">
                        <h5 class="yswea-counter-title mb-2">Total Amount</h5>
                        <b>Rs. {{ totalPrice }}/-</b>
                    </div>
                    <!-- passenger details start -->
                    <div class="passenger-add mt-4" v-if="selectedSeats.length">
                        <h5 class="yswea-counter-title mb-2">Passenger details
                        </h5>
                        <form v-model="form" @submit.prevent="save">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Name</label>
                                        <input v-model="form.passenger_name" class="form-control" type="text" placeholder="Name" />
                                        <span class="invalid-feedback" v-show="form.errors.has( 'form.passenger_name' )">
                                            {{ form.errors.get('form.passenger_name') | validateError }}
                                        </span>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Email</label>
                                        <input v-model="form.passenger_email" class="form-control" type="email" placeholder="Email" />
                                        <span class="invalid-feedback" v-show="form.errors.has( 'form.passenger_email' )">
                                            {{ form.errors.get('form.passenger_email') | validateError }}
                                        </span>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Phone number</label>
                                        <input v-model="form.passenger_phone_no" class="form-control" type="number" placeholder="Phone Number" />
                                        <span class="invalid-feedback" v-show="form.errors.has( 'form.passenger_phone_no' )">
                                            {{ form.errors.get('form.passenger_phone_no') | validateError }}
                                        </span>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Pick up</label>
                                        <input v-model="form.boarding_location" class="form-control" placeholder="pick up address" />
                                        <span class="invalid-feedback" v-show="form.errors.has( 'form.boarding_location' )">
                                            {{ form.errors.get('form.boarding_location') | validateError }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="buttons mt-4 flex-start">
                                <a href="#"
                                   class="ysewa-button border-button sm-button">Back</a>
                                <button class="ysewa-button sm-button" type="submit">
                                    {{ btn_name }} <i v-if="form.busy" class="fa fa-spinner fa-spin"/>
                                </button>
                            </div>

                        </form>
                    </div>

                </div>
                <!-- manage seat start -->
                <div class="col-md-4">
                    <div class=" table-seat-card">
                        <div class="card-header flex-between">
                            <h5>Seat details</h5>
                        </div>
                        <div class="card-body">
                            <ul class="seat-symbol-list flex-between">
                                <li>
                                    <span class="seat-symbol available"></span>
                                    <div class="seat-info">
                                        <p>Available</p>
                                        <h6>{{ stats.available }}</h6>
                                    </div>
                                </li>
                                <li>
                                    <span class="seat-symbol booked">
                                    </span>
                                    <div class="seat-info">
                                        <p>Booked</p>
                                        <h6>{{ stats.booked }}</h6>
                                    </div>
                                </li>
                                <li>
                                    <span class="seat-symbol preserved">
                                    </span>
                                    <div class="seat-info">
                                        <p>Preserved</p>
                                        <h6>{{ stats.preserved }}</h6>
                                    </div>
                                </li>
                                <li>
                                    <span class="seat-symbol cancel">
                                    </span>
                                    <div class="seat-info">
                                        <p>Cancelled</p>
                                        <h6>{{ stats.cancelled }}</h6>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="card-footer manage-price-footer">
                            <div class="icons">
                                <router-link class="print" :to="{ path: '/ticket-counter/chalani/', params: { vehicleId: '1', date: '2020-03-21' } }">
                                    <i class="material-icons">print</i>
                                </router-link>
                                <router-link class="pdf" :to="{ 'path': '/ticket-counter/chalani', params: { vehicleId: '', date: '' } }">
                                    <i class="material-icons">picture_as_pdf</i>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </td>
    </tr>
</template>

<script>
    import Seat from "./seat-li";
    import Utils from "../../../../lib/Mixins/Utils";
    import Error from "../../../../lib/Mixins/Error";
    import Alert from "../../../../lib/Mixins/Alert";
    import Vehicle from "../../../../repositories/vehicle";
    import Booking from "../../../../repositories/booking";

    import Promise from "../../../../lib/Mixins/ExtendedPromises";

    export default {
        name: "seats",
        props: {
            seats: {
                type: Array,
                default: () => []
            },
            result_type: {
                type: String,
                default: () => 'confirm'
            },
            vehicle: [String, Number],
            travel_date: [String, Number],
            schedule: [String, Number],
            stats: {
                type: Object,
                default: () => []
            },
            btn_name: {
                type: String,
                default: () => 'Confirm'
            }
        },
        mixins: [Error, Promise, Alert, Utils],
        components: {
            'seat': Seat
        },
        data() {
            return {
                loader: false,
                form: this.buildForm(),
                showDialogForPrices: false,
                enablePricesForAllSeats: false,
                selectedSeat: {
                    name: '',
                    chair: '',
                    price: ''
                },
                selectedSeats: [],
                price: '',
                bookingId: null,
                preserved: [],
                booked: [],
                cancelled: [],
                isNotSeats: []
            }
        },
        computed: {
            totalPrice: function () {
                return Object.values(this.selectedSeats).reduce((prev, cur) => prev + cur.price, 0)
            }
        },
        methods: {
            buildForm: (booking) => {
                return new GPForm({
                    passenger_name: booking ? booking.passenger_name : null,
                    passenger_phone_no: booking ? booking.passenger_phone_no : null,
                    passenger_email: booking ? booking.passenger_email : null,
                    schedule_id: booking ? booking.schedule_id : null,
                    boarding_location: booking ? booking.boarding_location : null,
                });
            },

            enablePriceForWhole() {
                this.enablePricesForAllSeats = true;
                this.showDialogForPrices = false;
                this.hideActions();
            },

            clickSubmitBtn() {
                $('.form-save-btn').click();
            },

            chunk(size) {
                return Array.from({length: Math.ceil(this.seats.length / size)}, (v, i) =>
                    this.seats.slice(i * size, i * size + size)
                );
            },

            isShown(seat) {
                let dontShow = ['N/A', 0, '0', 'A', 'B'];
                return !dontShow.includes(seat);
            },

            getSeat(seat) {
                this.addNewPrice(seat);
            },

            showConfirmDialog() {
                this.$emit('clicked-confirm', {
                    form: this.form,
                    selected: this.selectedSeats,
                    bookingId: this.bookingId
                });
            },

            showPayoutDialog() {
                this.$emit('clicked-payout', {
                    form: this.form,
                    selected: this.selectedSeats,
                    bookingId: this.bookingId
                });
            },

            addNewPrice(seat) {
                const index = this.selectedSeats.findIndex((e) => e.chair === seat.chair);
                if (index === -1) {
                    this.selectedSeats.push(Vue.util.extend({}, seat))
                } else {
                    this.removePrice(index);
                }
            },
            removePrice(index) {
                Vue.delete(this.selectedSeats, index);
            },

            slideActions(rowId) {
                this.hideActions();

                let el = $('.dropdown-ul-actions-price');

                if (el.is(':visible')) {
                    el.hide(1000);
                } else {
                    el.show(1000);
                }
            },

            hideActions() {
                $('.dropdown-ul-actions').each(function () {
                    $(this).hide(1000);
                });
            },

            save() {
                let operation = this.response(Booking.saveBooking({
                    form: this.form,
                    selected: this.selectedSeats,
                    travel_date: this.travel_date,
                    schedule: this.schedule
                }));
                operation.then(data => {
                    // console.log(data.bookingId);
                    this.bookingId = data.bookingId;
                    if (operation.isFulfilled()) {
                        if (this.result_type === 'confirm') {
                            this.showConfirmDialog();
                        } else {
                            this.showPayoutDialog();
                        }

                        this.resetDialog();
                        this.$toastr.s("SUCCESS", `Successfully saved!`);
                    }
                }).catch(err => {
                    if (operation.isRejected()) {
                        if (err.status === 417) {
                            this.form.errors.set(err.data.body);
                        }
                    }
                });
            },

            resetDialog() {
                this.selectedSeats = [];
            },
            payout() {
                this.$router.push({
                    name: 'payment',
                    params: {
                        info: {
                            form: this.form,
                            selected: this.selectedSeats,
                            travel_date: this.travel_date,
                            schedule: this.schedule
                        }
                    }
                });
            },
            getVehicleLayoutSettings() {
                this.isNotSeats = [];
                let operation = this.response(Vehicle.getVehicleLayoutSettings(this.vehicle));
                operation.then(data => {
                    if (operation.isFulfilled()) {
                        this.seats = this.chunk(data.seats_per_row);

                        if (data.hasOwnProperty('is_not_valid_seats')) {
                            this.isNotSeats = this.isNotSeats.concat(data.is_not_valid_seats);
                        }

                    } else if (operation.isRejected()) {
                        if (error.response.status === 417) {
                            this.$toastr.e(data.response.data.body);
                        }
                    }
                });
            },
        },
        mounted() {
            this.getVehicleLayoutSettings();
            if (this.stats.data.hasOwnProperty('pending')) {
                this.preserved = this.stats.data.pending.map((item) => item.chair_id);
            }
            if (this.stats.data.hasOwnProperty('booked')) {
                this.booked = this.stats.data.booked.map((item) => item.chair_id);
            }
            if (this.stats.data.hasOwnProperty('cancelled')) {
                this.cancelled = this.stats.data.cancelled.map((item) => item.chair_id);
            }
        },

        filters: {
            validateError(value) {
                if (!value) return;
                return value.replace('form.', '');
            }
        }
    }
</script>

<style scoped>

</style>