<template>
    <div class="container-fluid">
        <div class="dashboard-wrapper mt-5">
            <div class="dashboard-wrapper mt-5">
                <!-- dashboard content start -->
                <div class="card payment-details-card">
                    <div class="card-header flex-between">
                        <h5>Booking Details</h5>
                        <a href="#" class="ysewa-button border-button sm-button" data-toggle="modal"
                           data-target="#newbus">Back</a>
                    </div>
                    <div class="card-body">
                        <div class="ticket-details">
                            <ul>
                                <h4 class="yswea-counter-title">Passenger details</h4>
                                <li><span>Passenger Name</span><b>prem prasad khanal</b></li>
                                <li><span>phone number</span><b
                                        class="bus-number">9856055360</b></li>
                                <li><span>email</span><b>khnl.prem@gmail.com</b></li>
                                <li><span>pick up address</span><b>Banasthali</b></li>
                            </ul>
                            <ul>
                                <h4 class="yswea-counter-title">Bus details</h4>
                                <li><span>Bus number</span><b class="bus-number"><small>Ba 1
                                    Kha</small>1934</b></li>
                                <li><span>Bus type</span><b>AC</b></li>
                                <li><span>Date</span><b>2076-10-10</b></li>
                                <li><span>time</span><b>07:00 am</b></li>
                                <li><span>seats</span><b>a1</b></li>
                                <li><span>travel</span><b>day</b></li>
                            </ul>
                            <ul>
                                <h4 class="yswea-counter-title">payment details</h4>
                                <li><span>total seat</span><b>2</b></li>
                                <li><span>total cost</span><b>rs.1600</b></li>
                            </ul>
                        </div>

                        <!-- passenger details start -->
                        <div class="passenger-add mt-4">
                            <h5 class="yswea-counter-title mb-2">Pay with</h5>
                            <div class="payment-option">
                                <a href="">
                                    <img src="images/esewa-logo.png"  alt="esewa"/>
                                </a>
                                <a href="">
                                    <img src="images/khalti-logo.svg"  alt="Khalti"/>
                                </a>
                            </div>

                        </div>

                        <!-- The Modal confirm ticket -->
                        <div class="modal fade" id="confirm">
                            <div class="modal-dialog modal-md modal-dialog-centered">
                                <div class="modal-content">

                                    <!-- Modal Header -->
                                    <div class="modal-header flex-between ticket-header">
                                        <button type="button" class="close"
                                                data-dismiss="modal">&times;</button>
                                    </div>

                                    <!-- Modal body -->
                                    <div class="modal-body">
                                        <div class="ticket-details">
                                            <ul>
                                                <h4 class="yswea-counter-title">Passenger details</h4>
                                                <li><span>Passenger Name</span><b>prem prasad khanal</b></li>
                                                <li><span>phone number</span><b
                                                        class="bus-number">9856055360</b></li>
                                                <li><span>email</span><b>khnl.prem@gmail.com</b></li>
                                                <li><span>pick up address</span><b>Banasthali</b></li>
                                            </ul>
                                            <ul>
                                                <h4 class="yswea-counter-title">Bus details</h4>
                                                <li><span>Bus number</span><b class="bus-number"><small>Ba 1
                                                    Kha</small>1934</b></li>
                                                <li><span>Bus type</span><b>AC</b></li>
                                                <li><span>Date</span><b>2076-10-10</b></li>
                                                <li><span>time</span><b>07:00 am</b></li>
                                                <li><span>seats</span><b>a1</b></li>
                                                <li><span>travel</span><b>day</b></li>
                                            </ul>
                                            <ul>
                                                <h4 class="yswea-counter-title">payment details</h4>
                                                <li><span>total seat</span><b>2</b></li>
                                                <li><span>total cost</span><b>rs.1600</b></li>
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
                                            <button type="button" class="ysewa-button border-button sm-button"
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
    </div>
</template>

<script>
    export default {
        data() {
            return {
                info: {}
            }
        },
        mounted() {
            this.info = this.$route.params.info;
        }
    }
</script>