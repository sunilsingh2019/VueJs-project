<template>
    <tr class="toggle-row seat-layout-row">
        <td colspan="6">
            <div class="row">
                <div class="col-md-12">
                    <div class="bus-inner">
                        <div class="cockpit">
                            <ol class="cabin fuselage">
                                <template v-for="(seat, index) in seats">
                                    <li :class="`seat-row row--${index}`">
                                        <seat :not_seats="isNotSeats" :seats="seat" v-if="seats.hasOwnProperty(index)"
                                              @click.native="showDialogForPrices= true"></seat>
                                    </li>
                                </template>
                            </ol>
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

    import Promise from "../../../../lib/Mixins/ExtendedPromises";
    import Vehicle from "../../../../repositories/vehicle";

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
                isNotSeats: [],
            }
        },
        methods: {
            chunk(size) {
                return Array.from({ length: Math.ceil(this.seats.length / size) }, (v, i) =>
                    this.seats.slice(i * size, i * size + size)
                );
            },

            isShown(seat, seatNo) {
                let defaultNotSeats = [ 'N/A', 0, '0', 'A', 'B' ];
                return !defaultNotSeats.includes(seat) && !this.isNotSeats.includes(seatNo);
            },

            getSeat(seat) {
                this.addNewPrice(seat);
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