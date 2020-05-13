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
                            <a href="#" class="ysewa-button border-button sm-button"  @click.prevent="openModal">Add new</a>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="ysewa-table counter-table table">
                                    <thead>
                                    <tr>
                                        <th>Bus no</th>
                                        <th>bus type</th>
                                        <th>Number seat</th>
                                        <th>Driver</th>
                                        <th>Conductor</th>
                                        <th>Owner</th>
                                        <th width="20%">status</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <transition-group name="fade" tag="tbody">
                                        <tr v-if="!loader" :class="`default tr-list-${row.id}`"  class="default" v-for="(row, index) in rows" :key="row.id">
                                            <td>
                                                <a href="#" @click.prevent="manage(row.id, false, row.status)" class="businfo-td flex-start">
                                                    <h6><span>{{ row.vehicle_number }}</span>{{ row.registration_number }}</h6>
                                                </a>
                                            </td>
                                            <td>
                                                <span class="bus-type">{{ row.vehicle_type | ucfirst }}</span>
                                            </td>
                                            <td>
                                                <span class="total-seat">{{ row.maximum_seats }}</span>
                                            </td>
                                            <td>
                                                <div class="driver-info">
                                                    <strong>{{ row.driver_name }}</strong>
                                                    <span>{{ row.driver_phone }}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="driver-info">
                                                    <strong>{{ row.conductor_name }}</strong>
                                                    <span>{{ row.conductor_phone }}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="driver-info">
                                                    <strong>{{ row.owner_name }}</strong>
                                                    <span>{{ row.owner_phone }}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <a href="#" :class="isNotRed(row.status)">{{ row._status }}</a>
                                            </td>
                                            <td>
                                                <div class="table-action">
                                                    <a href="#" class="more-action" @click.prevent="slideActions(row.id)"  @focusout="hideActions">
                                                        <i class="material-icons">more_vert</i>
                                                    </a>
                                                    <ul class="dropdown-animation dropdown-ul-actions" :id="`drop-down-${row.id}`">
                                                        <li v-show="row.status > 1">
                                                            <a href="#" class="flex-start" @click.prevent="manage(row.id, false, row.status)">
                                                                <i class="material-icons">event_seat</i> Show Layout
                                                            </a>
                                                        </li>
                                                        <li v-show="row.status == 2">
                                                            <a href="#" class="flex-start" @click.prevent="acceptLayout(index)">
                                                                <i class="material-icons">done_all</i> Accept
                                                            </a>
                                                        </li>
                                                        <li v-show="row.status == 2">
                                                            <a href="#" class="flex-start" @click.prevent="requestAgain(index)">
                                                                <i class="material-icons">cached</i> Request Again
                                                            </a>
                                                        </li>
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

                            <div class="modal fade" ref="modal" id="vehicleModal">
                                <div class="modal-dialog modal-xl modal-dialog-centered">
                                    <div class="modal-content">

                                        <form v-model="form" @submit.prevent="save">

                                            <div class="modal-header flex-between">
                                                <h4 class="modal-title">{{ isEditOn ? `Edit` : `Add` }} Vehicle</h4>
                                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                                <a v-if="!isEditOn" href="#" class="ysewa-button border-button sm-button" v-on:click="addNewVehicle">Add new</a>
                                            </div>

                                            <!-- Modal body -->
                                            <div class="modal-body">
                                                <div class="table-responsive">
                                                    <table class="ysewa-table counter-table border-table mr-0 table">
                                                        <thead>
                                                        <tr>
                                                            <th rowspan="2">Vehicle No</th>
                                                            <th rowspan="2">Reg No</th>
                                                            <th rowspan="2">Name</th>
                                                            <th rowspan="2">Type</th>
                                                            <th rowspan="2">No of seat</th>
                                                            <th colspan="2">Driver</th>
                                                            <th colspan="2">Conductor</th>
                                                            <th colspan="2">Owner</th>
                                                        </tr>
                                                        <tr>
                                                            <th>Name</th>
                                                            <th>Phone number</th>
                                                            <th>Name</th>
                                                            <th>Phone number</th>
                                                            <th>Name</th>
                                                            <th>Phone number</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        <tr v-for="(vehicle, index) in vehicles">
                                                            <td>
                                                                <div class="form-group mr-0">
                                                                    <div class="form-inline" style="flex-flow: row;">
                                                                        <button style="min-width: 10px;" v-on:click="removeVehicle(index)" type="button" class="ysewa-button border-button sm-button">
                                                                            &times;
                                                                        </button> &nbsp;
                                                                        <input name="vehicles[][vehicle_number]" v-model="vehicle.vehicle_number" type="text" class="form-control" />
                                                                    </div>
                                                                    <span class="invalid-feedback" v-if="hasError(index, 'vehicle_number')">
                                                                        {{ getError(index, 'vehicle_number') }}
                                                                        </span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="form-group mr-0">
                                                                    <input name="vehicles[][registration_number]" v-model="vehicle.registration_number" type="text" class="form-control" />
                                                                    <span class="invalid-feedback" v-if="hasError(index, 'registration_number')">
                                                                        {{ getError(index, 'registration_number') }}
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="form-group mr-0">
                                                                    <input name="vehicles[][name]" v-model="vehicle.name" type="text" class="form-control" />
                                                                    <span class="invalid-feedback" v-if="hasError(index, 'name')">
                                                                        {{ getError(index, 'name') }}
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="form-group mr-0">
                                                                    <select class="form-control" v-model="vehicle.vehicle_type" name="vehicles[][vehicle_type]">
                                                                        <option selected="selected">Select Type</option>
                                                                        <option value="bus">Bus</option>
                                                                        <option value="micro">Micro</option>
                                                                    </select>
                                                                    <span class="invalid-feedback" v-if="hasError(index, 'vehicle_type_id')">
                                                                        {{ getError(index, 'vehicle_type_id') }}
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="form-group">
                                                                    <input name="vehicles[][maximum_seats]" v-model="vehicle.maximum_seats" type="text" class="form-control" />
                                                                    <span class="invalid-feedback" v-if="hasError(index, 'maximum_seats')">
                                                                        {{ getError(index, 'maximum_seats') }}
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="form-group">
                                                                    <input name="vehicles[][driver_name]" v-model="vehicle.driver_name" type="text" class="form-control" />
                                                                    <span class="invalid-feedback" v-if="hasError(index, 'driver_name')">
                                                                        {{ getError(index, 'driver_name') }}
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="form-group">
                                                                    <input name="vehicles[][driver_phone]" v-model="vehicle.driver_phone" type="text" class="form-control" />
                                                                    <span class="invalid-feedback" v-if="hasError(index, 'driver_phone')">
                                                                        {{ getError(index, 'driver_phone') }}
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="form-group">
                                                                    <input name="vehicles[][conductor_name]" v-model="vehicle.conductor_name" type="text" class="form-control" />
                                                                    <span class="invalid-feedback" v-if="hasError(index, 'conductor_name')">
                                                                        {{ getError(index, 'conductor_name') }}
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="form-group">
                                                                    <input name="vehicles[][conductor_phone]" v-model="vehicle.conductor_phone" type="text" class="form-control" />
                                                                    <span class="invalid-feedback" v-if="hasError(index, 'conductor_phone')">
                                                                        {{ getError(index, 'conductor_phone') }}
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="form-group">
                                                                    <input name="vehicles[][owner_name]" v-model="vehicle.owner_name" type="text" class="form-control" />
                                                                    <span class="invalid-feedback" v-if="hasError(index, 'owner_name')">
                                                                        {{ getError(index, 'owner_name') }}
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="form-group">
                                                                    <input name="vehicles[][owner_phone]" v-model="vehicle.owner_phone" type="text" class="form-control" />
                                                                    <span class="invalid-feedback" v-if="hasError(index, 'owner_phone')">
                                                                        {{ getError(index, 'owner_phone') }}
                                                                    </span>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </div>

                                            </div>

                                            <!-- Modal footer -->
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
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import Alert from "../../../lib/Mixins/Alert";
    import Error from "../../../lib/Mixins/Error";
    import Utils from "../../../lib/Mixins/Utils";
    import Promise from "../../../lib/Mixins/ExtendedPromises";
    import SeatLayout from "./partials/layout";

    export default {
        name: "vehicle-list",
        inject: [ "vehicleRepository" ],
        mixins: [ Error, Promise, Alert, Utils ],
        components: {
            SeatLayout
        },
        data() {
            return {
                title: 'Vehicle',
                rows: [],
                loader: false,
                form: this.buildForm(),
                editIndex: null,
                vehicle: {
                    name: '',
                    vehicle_number: '',
                    driver_name: '',
                    driver_phone: '',
                    conductor_name: '',
                    conductor_phone: '',
                    owner_name: '',
                    owner_phone: '',
                    registration_number: '',
                    vehicle_type_id: '',
                    maximum_seats: ''
                },
                vehicles: [{
                    name: '',
                    vehicle_number: '',
                    driver_name: '',
                    driver_phone: '',
                    conductor_name: '',
                    conductor_phone: '',
                    owner_name: '',
                    owner_phone: '',
                    registration_number: '',
                    vehicle_type_id: '',
                    maximum_seats: ''
                }],
                isEditOn: false
            }
        },
        mounted() {
            this.beforeOpenModal();
            this.dismissModal();
        },
        async created() {
            this.rows = await this.vehicleRepository.get();
        },

        methods: {
            buildForm: (vehicle) => {
                return new GPForm({
                    name: vehicle ? vehicle.name : null,
                    vehicle_number: vehicle ? vehicle.vehicle_number : null,
                    driver_name: vehicle ? vehicle.driver_name : null,
                    driver_phone: vehicle ? vehicle.driver_phone : null,
                    conductor_name: vehicle ? vehicle.conductor_name : null,
                    conductor_phone: vehicle ? vehicle.conductor_phone : null,
                    owner_name: vehicle ? vehicle.owner_name : null,
                    owner_phone: vehicle ? vehicle.owner_phone : null,
                    registration_number: vehicle ? vehicle.registration_number : null,
                    vehicle_type_id: vehicle ? vehicle.vehicle_type_id : null,
                    maximum_seats: vehicle ? vehicle.maximum_seats : null,
                });
            },

            manage(rowId, action, status) {
                if (status < 1) {
                    return;
                }
                if (action) {
                    this.slideActions(rowId);
                }
                this.removeSeatLayout();
                let operation = this.response(this.vehicleRepository.getSeats(rowId));
                operation.then(data => {
                    if (operation.isFulfilled()) {
                        this.seats = data;
                        this.appendSeatLayout(rowId);
                        this.$toastr.s("", `Seat layout is shown successfully!`);
                    }
                }).catch(err => {
                    if (operation.isRejected()) {
                        if (err.status === 417) {
                            this.errors = err.data.body;
                        }
                    }
                });
            },

            save() {
                this.form.startProcessing();
                let operation = this.vehicles[0]['id'] ? this.update(this.vehicles[0]['id']) : this.add();
                operation.then(data => {
                    if (operation.isFulfilled()) {
                        this.rows = data;
                        this.rows[this.editIndex] = data;
                        this.hideModal();
                        this.form.finishProcessing();
                        this.$toastr.s("SUCCESS", `Successfully ${this.vehicles[0]['id'] ? 'updated' : 'added'} !`);
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
                this.editIndex = index;
                this.vehicles = [{}];
                this.vehicles[0] = this.rows[index];
            },

            acceptLayout(index) {
                this.editIndex = index;
                return this.changeStatus(
                    4,
                    index,
                    'You have accepted the layout !',
                    'Are you sure you want to accept the layout ?'
                );
            },

            requestAgain(index) {
                this.editIndex = index;
                return this.changeStatus(
                    3,
                    index,
                    'Successfully requested for seat management again !',
                    'Are you sure you want to request again ?'
                );
            },

            changeStatus(status, index, message, confirmMessage) {
                this.confirm((result) => {
                    if (result.value) {
                        let operation = this.response(this.vehicleRepository.changeStatus(this.rows[index]['id'], status));
                        operation.then(data => {
                            if (operation.isFulfilled()) {
                                Vue.set(this.rows, this.editIndex, data);
                                this.$toastr.s("", message);
                            } else if (operation.isRejected()) {
                                if (error.response.status === 500) {
                                    this.$toastr.e(data.response.data.body);
                                }
                            }
                        });
                    }
                }, null, null, confirmMessage);
            },

            add() {
                return this.response(this.vehicleRepository.create(this.vehicles));
            },

            update(id) {
                return this.response(this.vehicleRepository.update(id, this.vehicles));
            },

            destroy(index, id) {
                this.hideActions();

                this.confirm((result) => {
                    if (result.value) {
                        let deletion = this.response(this.vehicleRepository.delete(id));
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
                    this.resetVehicles();
                    this.setDefaultErrors();
                }.bind(this));
            },

            dismissModal() {
                $(this.$refs.modal).on("hidden.bs.modal", function() {
                    this.resetVehicles();
                    this.setDefaultErrors();
                }.bind(this));
            },

            addNewVehicle() {
                this.vehicles.push(Vue.util.extend({}, this.vehicle))
            },
            removeVehicle(index) {
                Vue.delete(this.vehicles, index);
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

            resetVehicles() {
                this.vehicles = [{
                    name: '',
                    vehicle_number: '',
                    driver_name: '',
                    driver_phone: '',
                    conductor_name: '',
                    conductor_phone: '',
                    owner_name: '',
                    owner_phone: '',
                    registration_number: '',
                    vehicle_type_id: '',
                    maximum_seats: ''
                }];
            },

            isNotRed(status) {
                return (parseInt(status) === 0 || parseInt(status) === 3) ? 'red status' : 'green status' ;
            }
        },

        filters: {
            ucfirst(value) {
                if (!value) return;
                return value[0].toUpperCase() +
                    value.slice(1);
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

    .ysewa-table .table-action ul {
        min-width: 200px!important;
    }
</style>