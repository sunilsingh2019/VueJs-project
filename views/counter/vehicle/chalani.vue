<template>
    <div class="container-fluid">
        <!-- chalani header start -->
        <div class="chalani-header mt-5">
            <h2 class="chalani-title">{{ vehicle.tenant_name }}</h2>
            <div class="row">
                <div class="col-lg-4 col-md-4">
                    <ul class="chalani-info">
                        <li><span>Bus number</span><b class="bus-number"><small>{{ vehicle.bus_number }}</small></b></li>
                        <li><span>Driver</span><b>{{ vehicle.driver }}</b></li>
                        <li><span>Condutor</span><b>{{ vehicle.conductor }}</b></li>
                        <li><span>Date</span><b>{{ selectedDate }}</b></li>
                    </ul>
                </div>
                <div class="col-lg-4 col-md-4">
                    <div class="passenger-chalan">
                        <h3>passenger chalan</h3>
                        <div class="print-icons">
                            <a href="" @click.prevent="printChalani" class="print"><i class="material-icons">print</i></a>
                            <a href="" @click.prevent="printChalani" class="pdf"><i class="material-icons">picture_as_pdf</i></a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4">
                    <ul class="chalani-info">
                        <li><span>Booking</span><b>Balaju</b></li>
                        <li><span>Route</span><b>{{ vehicle.route }}</b></li>
                        <li><span>Travel</span><b>{{ vehicle.travel_shift }}</b></li>
                        <li><span>Time</span><b>{{ vehicle.time }}</b></li>
                    </ul>
                </div>
            </div>

        </div>

        <!-- chalani table start -->
        <div class="table-responsive">
            <table class="ysewa-table chalani-table mt-4  table">
                <thead>
                <tr>
                    <th>ticket id</th>
                    <th>full name</th>
                    <th>seat number</th>
                    <th>destination</th>
                    <th>border</th>
                    <th>drop off</th>
                    <th>no of People</th>
                    <th>phone number</th>
                    <th>price</th>
                    <th>remarks</th>
                </tr>
                </thead>
                <tbody>
                    <tr class="default" v-for="(row, index) in bookings">
                        <td>
                            <span class="ticked-id">{{ row.ticket_id }}</span>
                        </td>
                        <td>
                            <span class="passenger-name">{{ row.full_name }}</span>
                        </td>
                        <td>
                            <span class="seat">{{ row.seats }}</span>
                        </td>

                        <td>
                            <span>{{ row.destination }}</span>
                        </td>
                        <td>
                            <span>{{ row.border }}</span>
                        </td>
                        <td>
                            <span>{{ row.drop_off }}</span>
                        </td>
                        <td>
                            <span>{{ row.no_of_people }}</span>
                        </td>
                        <td>
                            <span class="phone">{{ row.phone_number }}</span>
                        </td>
                        <td>
                            <span class="price">Rs. {{ row.price }}</span>
                        </td>
                        <td>
                            <span class="status green">{{ row.remarks }}</span>
                        </td>
                    </tr>
                <tr v-if="!bookings.length">
                    <td colspan="10" class="text-center">No Bookings list Available !</td>
                </tr>
                </tbody>
            </table>
        </div>

        <!-- chalani footer start -->
        <div class="chalani-footer flex-between mt-3">
            <div class="signature">
                <span>signature</span>
                <h6>Staff</h6>
            </div>
            <div class="signature">
                <span>signature</span>
                <h6>Incharge</h6>
            </div>
        </div>
    </div>
</template>

<script>
    import Error from "../../../lib/Mixins/Error";
    import Promise from "../../../lib/Mixins/ExtendedPromises";
    import Alert from "../../../lib/Mixins/Alert";

    export default {
        name: "chalani",
        inject: [ 'bookingRepository', ],
        mixins: [ Error, Promise, Alert, ],
        data() {
            return {
                bookings: [],
                vehicle: [],
                selectedVehicle: null,
                selectedDate: null,
            }
        },
        mounted() {
            this.selectedVehicle = this.$route.params.vehicleId;
            this.selectedDate = this.$route.params.date;
            this.retrieveBookings(this.selectedVehicle, this.selectedDate);
            
        },
        methods: {
            retrieveBookings(vehicle, date) {
                let operation = this.response(this.bookingRepository.retrieveChalani(vehicle, date));
                console.log(this.operation);
                operation.then(data => {
                    if (operation.isFulfilled()) {
                        this.bookings = data;
                        this.vehicle = data.length > 0 ? data[0] : null;
                        this.$toastr.s("", `Successfully generated chalani!`);
                    }
                }).catch(err => {
                    if (operation.isRejected()) {
                        if (err.status === 417) {
                            this.errors = err.data.body;
                        }
                    }
                });
            },
            printChalani(){
                window.print()
            }
        }
    }
</script>

<style scoped>
    
</style>