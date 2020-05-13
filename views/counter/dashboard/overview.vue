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
                            <h5>{{ title }}</h5>
                        </div>
                        <div class="card-body">
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
                                                <label>select Date</label>
                                                <div class="input-group mr-0">
                                                    <input type="text" placeholder="Select Date" id="nepaliDateD"
                                                           class="form-control nepali-calendar" />
                                                    <div class="input-group-append">
                                                        <span class="input-group-text"><i>calendar_today</i></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="overview-summary">
                                <div class="row">
                                    <div class="col-lg-3 col-md-6">
                                        <div class="overview-item">
                                            <h6>Total Route</h6>
                                            <div class="overview-content">
                                                <h2>100</h2>
                                                <span class="status green">+2.2%</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-3 col-md-6">
                                        <div class="overview-item">
                                            <h6>Total Bus</h6>
                                            <div class="overview-content">
                                                <h2>100</h2>
                                                <span class="status red">-2.2%</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-3 col-md-6">
                                        <div class="overview-item">
                                            <h6>Total Ticket</h6>
                                            <div class="overview-content">
                                                <h2>100</h2>
                                                <span class="status green">+2.2%</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-3 col-md-6">
                                        <div class="overview-item">
                                            <h6>Total Transaction</h6>
                                            <div class="overview-content">
                                                <h2>100</h2>
                                                <span class="status red">-2.2%</span>
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
    </div>
</template>

<script>
    export default {
        name: "dashboard-index",
        data() {
            return {
                title: 'Dashboard'
            }
        }
    }
</script>
