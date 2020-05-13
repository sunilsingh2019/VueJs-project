<template>
    <multiselect
        v-model="internalValue"
        track-by="id"
        :label="label"
        :options="options"
        :searchable="true"
        :internal-search="true"
        :placeholder="placeholder"
        :disabled="disabled"
        :show-labels="false"
        :taggable="taggable"
        @tag="addTag"
    ></multiselect>
</template>

<script>
    import Multiselect from 'vue-multiselect';

    export default {
        mixins: [require('../Mixins/Model')],
        components: {
            Multiselect
        },

        props: {
            label: {required: false, default: 'name'},
            api: {required: false},
            url: {required: false},
            placeholder: {required: false},
            defaultOptions: {required:false, default: () => { return []; }},
            disabled: {required: false, default: () => { return false; }},
            taggable: {required: false, default: () => { return false; }},
        },

        data() {
            return {
                options: []
            }
        },

        watch: {
            defaultOptions() {
                this.load();
            },
            url() {
                this.load();
            }
        },

        computed: {
            route() {
                if (this.url) return this.url;
                else return laroute.route(`api.${this.api}.index`);
            },
            storeRoute() {
                if(this.url) return this.url;
                else return laroute.route(`api.${this.api}.store`);
            }
        },

        created() {
            this.load();
        },

        methods: {
            addTag(newTag) {
                HttpService.post(this.storeRoute, new DpForm({name:
                    newTag}))
                    .then(({data}) => {
                        this.options.push(data);
                        this.internalValue = data;
                    });
            },
            load() {
                if( this.defaulOptions === null || this.route !== undefined ) {
                    HttpService
                        .find(this.route)
                        .then((response) => {
                            this.options = response;
                        });
                } else {
                    this.options = this.defaultOptions;
                }
            }
        }
    }
</script>
