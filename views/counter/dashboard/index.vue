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
