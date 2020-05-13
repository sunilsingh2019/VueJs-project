<template>
    <div class="search-form">
        <div class="container">
            <div class="filter-form">
                <div class="container-fluid">
                    <form v-model="form" @submit.prevent="search">
                        <div class="row">
                            <div class="col-lg-2 col-md-6">
                                <div class="form-group mr-0">
                                    <label>From</label>
                                    <auto-complete
                                         name="from"
                                        :search="findCity"
                                        :get-result-value="getResultValue"
                                        placeholder="Search for a city"
                                        aria-label="Search for a city">
                                    </auto-complete>
                                </div>
                            </div>
                            <div class="col-lg-2 col-md-6">
                                <div class="form-group mr-0">
                                    <label>To</label>
                                    <auto-complete
                                            name="to"
                                            :search="findCity"
                                        :get-result-value="getResultValue"
                                        placeholder="Search for a city"
                                        aria-label="Search for a city">
                                    </auto-complete>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-6">
                                <div class="form-group mr-0">
                                    <label>select Date</label>
                                    <div class="input-group mr-0">
                                        <date-picker v-model="form.date" :config="options" autocomplete="off"></date-picker>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-3 col-md-6">
                                <div class="form-group radio-group">
                                    <label>Vehicle</label>
                                    <div class="custom-control custom-radio custom-control-inline">
                                        <input type="radio" v-model="form.type" value="bus" id="bus" name="day" class="custom-control-input">
                                        <label class="custom-control-label" for="bus">Bus</label>
                                    </div>
                                    <div class="custom-control custom-radio custom-control-inline">
                                        <input type="radio" v-model="form.type" id="micro" value="micro" name="day" class="custom-control-input">
                                        <label class="custom-control-label" for="micro">Micro</label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-2 col-md-6">
                                <div class="form-group ">
                                    <button class="ysewa-button border-button mt-4" type="submit">Search
                                        Bus</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Autocomplete from '@trevoreyre/autocomplete-vue'
    import '@trevoreyre/autocomplete-vue/dist/style.css'

    import datePicker from 'vue-bootstrap-datetimepicker';
    import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';

    export default {
        name: "search-form",
        inject: [ "cityRepository", ],
        components: {
            'auto-complete': Autocomplete,
            datePicker
        },
        data() {
            return {
                form: this.buildForm(),
                cities: [],
                options: {
                    format: 'YYYY-MM-DD',
                    useCurrent: false,
                }
            }
        },

        mounted() {
        },

        async created() {
            this.cities = await this.cityRepository.get();
        },
        methods: {
            buildForm: (search) => {
                return new GPForm({
                    // from: search ? search.from : null,
                    // to: search ? search.to : null,
                    date: search ? search.date : null,
                    type: search ? search.type : null,
                });
            },

            search() {
                this.$router.push({
                    name: 'bookings',
                    params: {
                        filter_from: $('input[name=from]').val(),
                        filter_to: $('input[name=to]').val(),
                        filter_date: this.form.date,
                        filter_type: this.form.type,
                    }
                });
            },

            findCity(search) {
                if (search.length < 1) { return []; }
                // const cities = this.cities.reduce((a, o) => a.concat(o.text), []);
                return this.cities.filter(city => {
                    return city.text.toLowerCase()
                        .includes(search.toLowerCase());
                });
            },

            getResultValue(result) {
                return result.text;
            },
        }
    }
</script>

<style scoped>

</style>