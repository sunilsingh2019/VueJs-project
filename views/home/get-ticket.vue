<template>
    <div class="container-fluid">
        <!-- chalani header start -->
        <div class="chalani-header mt-5">
            <h2 class="chalani-title">My Ticket</h2>
            <div class="row">
                <div class="col-lg-4 col-md-4">
                    <h2>Passenger</h2>
                    <ul class="chalani-info">
                        <li><span>Name</span><b class="bus-number"><small>{{ bookings.passenger_name }}</small></b></li>
                        <li><span>phone</span><b>{{ bookings.passenger_phone_no }}</b></li>
                        <li><span>email</span><b>{{ bookings.passenger_email }}</b></li>
                        <li><span>Travel date </span><b>{{ bookings.travel_date }}</b></li>
                    </ul>
                </div>
                <div class="col-lg-4 col-md-4">
                    <div class="passenger-chalan">
                        <h3>passenger chalan</h3>
                        <div class="print-icons">
                            <a href="" @click.prevent="printTicket" class="print"><i class="material-icons">print</i></a>
                            <a href="" @click.prevent="printTicket" class="pdf"><i class="material-icons">picture_as_pdf</i></a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4">
                    <ul class="chalani-info">
                        <li><span>Boarding Location</span><b>{{ bookings.boarding_location }}</b></li>
                        <li><span>From</span><b>{{ bookings.location_form }}</b></li>
                        <li><span>To</span><b>{{ bookings.location_to }}</b></li>
                        <li><span>Time</span><b>{{ bookings.departure_date }}</b></li>
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
                    <th>Vehicle Info</th>
                    <th>no of People</th>
                    <th>phone number</th>
                    <th>price</th>
                    <th>remarks</th>
                </tr>
                </thead>
                <tbody>
                    <tr class="default" v-for="row in ticket" :key="row.chair_id">
                        <td>
                            <span class="ticked-id">{{ row.order_id }}</span>
                        </td>
                        <td>
                            <span class="passenger-name"> {{ bookings.passenger_name }}</span>
                        </td>
                        <td>
                            <span class="seat">{{ row.seat_type }}</span>
                        </td>

                        <td>
                            <span>{{ bookings.location_to }}</span>
                        </td>
                        <td>
                            <span>{{ bookings.boarding_location }}</span>
                        </td>
                        <td>
                            <span>{{ row.vehicle_name }}</span><br>
                            <span>{{ row.vehicle_number}}</span>
                        </td>
                        <td>
                            <span>{{ ticket.length }}</span>
                        </td>
                        <td>
                            <span class="phone">{{ bookings.passenger_phone_no }}</span>
                        </td>
                        <td>
                            <span class="price">Rs. {{ row.price }}</span>
                        </td>
                        <td>
                            <span class="status green">{{ bookings.status }}</span>
                        </td>
                    </tr>
                <tr v-if="!ticket.length">
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
    import Error from "../../lib/Mixins/Error";
    import Promise from "../../lib/Mixins/ExtendedPromises";
    import Alert from "../../lib/Mixins/Alert";

    export default {
        name: "chalani",
        inject: [ 'bookingRepository', ],
        mixins: [ Error, Promise, Alert, ],
        data() {
            return {
                bookings: [],
                ticket: [],
                bookingId: null,
            }
        },
        mounted() {
            this.bookingId = this.$route.params.bookingId;
            this.retrieveTicket(this.bookingId);
            
        },
        methods: {
            retrieveTicket(bookingId) {
                let operation = this.response(this.bookingRepository.getTicket(bookingId));
                console.log(this.operation);
                operation.then(data => {
                    if (operation.isFulfilled()) {
                        this.bookings = data.booking;
                        this.ticket = data.items;
                        this.$toastr.s("", `Successfully generated ticket!`);
                    }
                }).catch(err => {
                    if (operation.isRejected()) {
                        if (err.status === 417) {
                            this.errors = err.data.body;
                        }
                    }
                });
            },
            printTicket(){
                window.print()
            }
        }
    }
</script>

<style scoped>
    
</style>