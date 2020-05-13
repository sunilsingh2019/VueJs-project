<template>
    <div class="container-fluid">
        <div class="dashboard-wrapper mt-5">
            <div class="row">
                <div class="col-lg-3 col-md-4">
                    <counter-sidebar></counter-sidebar>
                </div>
                <div class="col-lg-9 col-md-8">
                    <div class="card ">
                        <div class="card-header">
                            <h5>Manage seat</h5>
                        </div>
                        <div class="card-body">
                            <!-- table-filer start -->
                            <div class="filter-form dashboard-filter">
                                <form>
                                    <div class="row">
                                        <div class="col-md-3">
                                            <div class="form-group mr-0">
                                                <label>Bus number</label>
                                                <input type="text" placeholder="Ex:1934" class="form-control" />
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form-group mr-0">
                                                <label>To</label>
                                                <input type="text" placeholder="Drop off address"
                                                       class="form-control" />
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form-group mr-0">
                                                <label>select Date</label>
                                                <div class="input-group mr-0">
                                                    <input type="text" placeholder="Select Date" autocomplete="off" id="nepaliDateD"
                                                           class="form-control nepali-calendar" />
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
                                <table class="ysewa-table counter-table table">
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
                                                <a href="#" @click.prevent="manage(row.id, false)" class="businfo-td flex-start">
                                                    <h6><span>{{ row.vehicle_number }}</span>{{ row.registration_number }}</h6>
                                                </a>
                                            </td>
                                            <td>
                                                <div class="location">
                                                    <strong>KTM</strong>
                                                </div>
                                            </td>
                                            <td>
                                                <span class="bus-type">AC</span>
                                            </td>
                                            <td>
                                                <span class="total-seat">0</span>
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
                                                            <a href="#" class="flex-start" @click.prevent="manage(row.id, true)">
                                                                <i class="material-icons">settings_applications</i>Manage Seat
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    </transition-group>

                                    <tbody v-if="!rows.length || loader">
                                    <tr v-if="!rows.length">
                                        <td colspan="9" class="text-center"><b>No Vehicle !</b></td>
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

        </div>
    </div>
</template>

<script>
    import Error from "../../../lib/Mixins/Error";
    import Alert from "../../../lib/Mixins/Alert";
    import Utils from "../../../lib/Mixins/Utils";
    import Promise from "../../../lib/Mixins/ExtendedPromises";

    import SeatLayout from "./partials/seats";

    export default {
        name: "manage-seat",
        inject: [ "vehicleRepository" ],
        mixins: [ Error, Promise, Alert, Utils ],
        components: {
            SeatLayout
        },
        data() {
            return {
                title: 'Vehicle',
                rows: [],
                seats: [],
                loader: false,
            }
        },
        mounted() {
            $('#nepaliDateD').nepaliDatePicker({
                dateFormat: "%D, %M %d, %y",
                closeOnDateSelect: true
            });
        },
        async created() {
            this.rows = await this.vehicleRepository.getActiveVehicles();
        },
        methods: {
            manage(rowId, action) {
                if (action) {
                    this.slideActions(rowId);
                }
                this.removeSeatLayout();
                let operation = this.response(this.vehicleRepository.getSeats(rowId));
                operation.then(data => {
                    if (operation.isFulfilled()) {
                        this.seats = data;
                        this.appendSeatLayout(rowId);
                        this.$toastr.Close()
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

            isNotRed(status) {
                return parseInt(status) === 0 ? 'red status' : 'green status' ;
            },

            appendSeatLayout(id) {
                let seatLayout = Vue.extend(SeatLayout);
                let instance = new seatLayout({
                    propsData: {
                        seats: this.seats,
                        vehicle: id
                    }
                });
                instance.$mount();
                $(`.tr-list-${id}`).after(instance.$el);
            },

            removeSeatLayout() {
                $('.seat-layout-row').each (function() {
                    $(this).remove();
                });
            }
        }
    }
</script>

<style scoped>
    tr {
        cursor: pointer;
    }
</style>