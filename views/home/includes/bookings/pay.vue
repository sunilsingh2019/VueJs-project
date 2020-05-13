<template>
    <div class="container-fluid">
        <div class="dashboard-wrapper mt-5">
            <div class="dashboard-wrapper mt-5">
                <!-- dashboard content start -->
                <div class="card payment-details-card">
                    <div class="card-header flex-between">
                        <h5>Payment Via IME PAY</h5>
                        
                    </div>
                    <div class="card-body">
                        <div class="ticket-details">
                            <form action="https://stg.imepay.com.np:7979/WebCheckout/Checkout" method="post">
                                <input type="hidden" name="TokenId" :value="paymentDetails.TokenId">
                                <input type="hidden" name="MerchantCode" :value="'YATRAMANI'">
                                <input type="hidden" name="RefId" :value="paymentDetails.RefId">
                                <input type="hidden" name="TranAmount" :value="paymentDetails.TranAmount">
                                <input type="hidden" name="Source" value="W">
                                <button class="ysewa-button sm-button " type="submit">
                                    Checkout
                                </button>
                            </form>

                            <!-- <a href="#" class="ysewa-button border-button sm-button" data-toggle="modal"
                           data-target="#newbus">Basck</a> -->
                        </div>

                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import Error from "../../../../lib/Mixins/Error";
    import Promise from "../../../../lib/Mixins/ExtendedPromises";
    import Alert from "../../../../lib/Mixins/Alert";
    import Utils from "../../../../lib/Mixins/Utils";
    export default {
        name: "pay",
        inject: [ "scheduleRepository", "vehicleRepository", "routeRepository", "bookingRepository", ],
        mixins: [ Error, Promise, Alert, Utils ],
        data() {
            return {
                bookingId: null,
                paymentDetails:{}
            }
        },
        mounted() {
            this.bookingId = this.$route.params.bookingId;
            this.payment();
            
        },
        methods:{
            payment() {
                // console.log(bookingId);
                let operation = this.response(this.bookingRepository.paymentDetails(this.bookingId));
                console.log(operation);
                operation.then(data => {
                        this.paymentDetails = data;
                        // console.log(this.paymentDetails);
                        // this.$toastr.s("SUCCESS", `Successfully seat loaded!`);
                }).catch(err => {
                    if (operation.isRejected()) {
                        if (err.status === 417) {
                            this.errors = err.data.body;
                        }
                    }
                });
            },
        }
    }
</script>