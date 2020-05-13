<template>
    <div class="container-fluid">
        <div class="dashboard-wrapper mt-5">
            <div class="row">
                <div class="col-lg-3 col-md-4">
                    <counter-sidebar></counter-sidebar>
                </div>
                <div class="col-lg-9 col-md-8">
                    <div class="card">
                        <div class="card-header flex-between">
                            <h5>Route list</h5>
                            <a href="#" class="ysewa-button border-button sm-button" @click.prevent="openModal">Add new</a>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="ysewa-table counter-table table">
                                    <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>From</th>
                                        <th>To</th>
                                        <th width="20%">status</th>
                                        <th width="10%">Action</th>
                                    </tr>
                                    </thead>
                                    <transition-group name="fade" tag="tbody">
                                        <tr v-if="!loader" class="default" v-for="(row, index) in rows" :key="row.id">
                                            <td>
                                                <b>{{ row.name }}</b>
                                            </td>
                                            <td>
                                                <span :data-id="row.city_from">{{ row.city_from_name }}</span>
                                            </td>
                                            <td>
                                                <span :data-id="row.city_to">{{ row.city_to_name }}</span>
                                            </td>
                                            <td>
                                                <a href="" class="green status">approved</a>
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
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    </transition-group>
                                    <tbody v-if="!rows.length || loader">
                                    <tr v-if="!rows.length">
                                        <td colspan="9" class="text-center"><b>No Route !</b></td>
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
                            <div class="modal fade" ref="modal" id="routeModal">
                                <div class="modal-dialog modal-lg modal-dialog-centered">
                                    <div class="modal-content">
                                        <form v-model="form" @submit.prevent="save">
                                            <!-- Modal Header -->
                                            <div class="modal-header flex-between">
                                                <h4 class="modal-title">{{ isEditOn ? `Edit` : `Add` }} Route</h4>
                                                <button type="button" class="close"
                                                        data-dismiss="modal">&times;</button>
                                                <a v-if="!isEditOn" href="#" class="ysewa-button border-button sm-button"
                                                   v-on:click="addNewRoute">Add new</a>
                                            </div>

                                            <!-- Modal body -->
                                            <div class="modal-body">
                                                <div class="table-responsive">
                                                    <table class="ysewa-table  counter-table mr-0 table">
                                                        <thead>
                                                        <tr>
                                                            <th></th>
                                                            <th>Name</th>
                                                            <th>from</th>
                                                            <th>to</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        <tr  v-for="(route, index) in routes">
                                                            <td>
                                                                <button style="min-width: 10px;" v-on:click="removeRoute(index)" type="button" class="ysewa-button border-button sm-button">
                                                                    &times;
                                                                </button> &nbsp;
                                                            </td>
                                                            <td>
                                                                <div class="mr-0">
                                                                    <input name="routes[][name]" v-model="route.name" type="text" class="form-control" />
                                                                    <span class="invalid-feedback" v-if="hasError(index, 'name')">
                                                        {{ getError(index, 'name') }}
                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="mr-0">
                                                                    <select class="form-control" v-model="route.city_from" name="routes[][city_from]">
                                                                        <option disabled selected>Select City</option>
                                                                        <option v-for="city in cities" :value="city.value">{{city.text}}</option>
                                                                    </select>
                                                                    <span class="invalid-feedback" v-if="hasError(index, 'city_from')">
                                                        {{ getError(index, 'city_from') }}
                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="mr-0">
                                                                    <select class="form-control" v-model="route.city_to" name="routes[][city_to]">
                                                                        <option disabled selected>Select City</option>
                                                                        <option v-for="city in cities" :value="city.value">{{city.text}}</option>
                                                                    </select>
                                                                    <span class="invalid-feedback" v-if="hasError(index, 'city_to')">
                                                        {{ getError(index, 'city_to') }}
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
                                                    <button type="button" class="ysewa-button border-button sm-button" data-dismiss="modal">
                                                        Cancel</button>
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
    import Button from "../../../components/shared/Mixins/Button";

    export default {
        name: "route-list",
        inject: [ "routeRepository", "cityRepository",  ],
        mixins: [ Error, Promise, Alert, Utils ],
        data() {
            return {
                title: 'Vehicle',
                rows: [],
                cities: [],
                loader: false,
                form: this.buildForm(),
                route: {
                    name: '',
                    city_from: '',
                    city_to: ''
                },
                routes: [{
                    name: '',
                    city_from: '',
                    city_to: '',
                }],
                isEditOn: false
            }
        },
        mounted() {
            this.beforeOpenModal();
            this.dismissModal();
        },
        async created() {
            this.rows = await this.routeRepository.get();
            this.cities = await this.cityRepository.get();
        },
        methods: {
            buildForm(route) {
                return new GPForm({
                    name: route ? route.name : null,
                    city_from: route ? route.city_from : null,
                    city_to: route ? route.city_to : null,
                });
            },

            save() {
                this.form.startProcessing();
                let operation = this.routes[0]['id'] ? this.update(this.routes[0]['id']) : this.add();
                operation.then(data => {
                    if (operation.isFulfilled()) {
                        this.rows = data;
                        this.hideModal();
                        this.form.finishProcessing();
                        this.$toastr.s("SUCCESS", `Successfully ${this.routes[0]['id'] ? 'updated' : 'added'} !`);
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
                this.routes = [{}];
                this.routes[0] = this.rows[index];
            },

            add() {
                return this.response(this.routeRepository.create(this.routes));
            },

            update(id) {
                return this.response(this.routeRepository.update(id, this.routes));
            },

            destroy(index, id) {
                this.hideActions();

                this.confirm((result) => {
                    if (result.value) {
                        let deletion = this.response(this.routeRepository.delete(id));
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

            openModal() {
                $(this.$refs.modal).modal({backdrop: 'static', keyboard: false});
            },

            hideModal() {
                this.isEditOn = false;
                $(this.$refs.modal).modal('hide');
            },

            beforeOpenModal() {
                $(this.$refs.modal).on("show.bs.modal", function() {
                    this.resetRoutes();
                    this.setDefaultErrors();
                }.bind(this));
            },

            dismissModal() {
                $(this.$refs.modal).on("hidden.bs.modal", function() {
                    this.resetRoutes();
                    this.setDefaultErrors();
                }.bind(this));
            },

            addNewRoute() {
                this.routes.push(Vue.util.extend({}, this.route))
            },

            removeRoute(index) {
                Vue.delete(this.routes, index);
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

            resetRoutes() {
                this.routes = [{
                    name: '',
                    city_from: '',
                    city_to: '',
                }];
            }
        }
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

    .fade-enter-active, .fade-leave-active {
        transition: all .2s;
    }
    .fade-enter, .fade-leave-to{
        opacity: 0;
    }
    .fade-enter-active {
        transition-delay: .2s;
    }
</style>