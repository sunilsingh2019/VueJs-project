<template>
    <main-content>
        <row>
            <column lg="12">
                <box>
                    <box-title>
                        <h5>{{ title }}</h5>
                    </box-title>
                    <box-content>
                        <h1>
                            (404) Page NotFound. Return to <router-link to="/admin/dashboard" class="btn btn-primary btn-xs"><i class="fa fa-home"></i> Home</router-link>
                        </h1>
                    </box-content>
                </box>
            </column>
        </row>
    </main-content>
</template>

<script>
    export default {
        name: "page-not-found",
        data() {
            return {
                title: '404 : Page Not Found'
            }
        }
    }
</script>

<style scoped>

</style>
