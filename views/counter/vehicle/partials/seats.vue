<template>
    <tr class="toggle-row seat-layout-row">
        <td colspan="6">
            <div class="row">
                <div class="col-md-8">
                    <!-- bus seat start -->
                    <div class="bus-inner">
                        <div class="cockpit">
                            <ol class="cabin fuselage">
                                <template v-for="(seat, index) in seats">
                                    <li :class="`seat-row row--${index}`">
                                        <seat :not_seats="isNotSeats" :seats="seat" v-if="seats.hasOwnProperty(index)"
                                              @click.native="showDialogForPrices= true; enablePricesForAllSeats = false;" @clicked-seat="getSeat"></seat>
                                    </li>
                                </template>
                            </ol>
                        </div>
                    </div>
                </div>
                <!-- manage seat start -->
                <div class="col-md-4">
                    <div class="manage-price table-seat-card" v-if="showDialogForPrices || enablePricesForAllSeats">
                        <div class="card-header flex-between">
                            <h5>Manage seat</h5>
                            <div class="card-option">
                                <a href="#" @click.prevent="slideActions"
                                   @focusout="hideSlideActions">
                                    <i class="material-icons">more_vert</i>
                                </a>
                                <ul class="dropdown-animation dropdown-ul-actions dropdown-ul-actions-price">
                                    <li>
                                        <a href="#" class="flex-start"
                                           @click.prevent="enablePriceForWhole">
                                            All
                                        </a>
                                    </li>
                                </ul>
                            </div>

                        </div>
                        <div class="card-body">

                            <p v-if="!selectedSeats.length && !enablePricesForAllSeats" class="text-center"><b>No Seat Selected!</b></p>

                            <form v-model="form" @submit.prevent="save">
                                <div class="form-group" v-if="enablePricesForAllSeats">
                                    <label>Whole</label>
                                    <input v-model="price" type="text" class="form-control"
                                           placeholder="price"/>
                                </div>

                                <div class="form-group" v-for="(seat, index) in selectedSeats" v-if="!enablePricesForAllSeats">
                                    <label>{{ seat.name }}</label>
                                    <input name="seat[][chair]" type="hidden" class="form-control"
                                           placeholder="chair" v-model="seat.chair">
                                    <input name="seat[][price]" v-model="seat.price" type="text" class="form-control"
                                           placeholder="price"/>
                                </div>

                                <button style="display: none;" type="submit" class="ysewa-button sm-button form-save-btn" :disabled="form.busy">
                                    save <i v-if="form.busy" class="fa fa-spinner fa-spin"/>
                                </button>
                            </form>
                        </div>
                        <div class="card-footer manage-price-footer">
                            <div class="buttons">
                                <button @click.prevent="clickSubmitBtn" type="button" class="ysewa-button sm-button" :disabled="form.busy">
                                    save <i v-if="form.busy" class="fa fa-spinner fa-spin"/>
                                </button>
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

    import Promise from "../../../../lib/Mixins/ExtendedPromises";

    export default {
        name: "seats",
        props: {
            seats: {
                type: Array,
                default: () => []
            },
            vehicle: [String, Number],
        },
        mixins: [ Error, Promise, Alert, Utils ],
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
                isNotSeats: []
            }
        },
        methods: {
            buildForm: (seat) => {
                return new GPForm({
                    name: seat ? seat.name : null,
                    chair: seat ? seat.chair : null,
                    price: seat ? seat.price : null,
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
                return Array.from({ length: Math.ceil(this.seats.length / size) }, (v, i) =>
                    this.seats.slice(i * size, i * size + size)
                );
            },

            isShown(seat) {
                let dontShow = [ 'N/A', 0, '0', 'A', 'B' ];
                return !dontShow.includes(seat);
            },

            getSeat(seat) {
                this.addNewPrice(seat);
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
                    el.hide(300);
                } else {
                    el.show(300);
                }
            },

            hideSlideActions() {
                $('.dropdown-ul-actions-price').hide(300);
            },

            hideActions() {
                $('.dropdown-ul-actions').each (function() {
                    $(this).hide(1000);
                });
            },

            save() {
                let data = this.enablePricesForAllSeats ? {
                    type: 'whole',
                    data: {
                        vehicle: this.vehicle,
                        price: this.price
                    }
                } : {
                    data: this.selectedSeats,
                    type: 'not-whole'
                };
                let operation = this.response(Vehicle.saveSeats(data));
                operation.then(data => {
                    if (operation.isFulfilled()) {
                        this.resetDialog();
                        this.showDialogForPrices = false;
                        $('.seat-layout-row').remove();
                        this.$toastr.s("SUCCESS", `Successfully saved!`);
                        // this.$parent.removeSeatLayout();
                    }
                }).catch(err => {
                    if (operation.isRejected()) {
                        if (err.status === 417) {
                            this.errors = err.data.body;
                        }
                    }
                });
            },

            resetDialog() {
                this.selectedSeats = [];
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
        }
    }
</script>

<style scoped>

</style>