<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Select Email Component</div>

                    <div class="card-body">
                        <button @click="selectedComponent = 'appBGmailSetUp'">Gmail</button>
                        <button @click="selectedComponent = 'appBusinessEmailSetUp'">Other</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
