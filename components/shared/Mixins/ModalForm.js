import * as GpHttp from "../../../lib/http";

export default {
    props: {},

    data() {
        return {
            form: this.buildForm(),
            api: null,
            route: {
                model: null,
                store: null,
                update: null
            },

        }
    },

    mounted() {
        this.reset();
    },

    computed: {

    },

    methods: {
        reset() {
            this.form = this.buildForm();
        },
        buildForm() {},
        save() {
            this.form.id ? this.update() : this.add();
        },
        add() {
            this.send('post', this.storeRoute);
        },
        update(form) {
            this.form = form ? form : this.form;
            this.send('put', this.updateRoute);
        },
        send(method, route) {
            let event = method === 'post' ? 'created' : 'updated';
            GpHttp[method](route, this.form)
                .then((response) => {
                    this.saved(response.data, event);
                });
        },
        saved(obj, event) {
            $(this.$el).modal('hide');
            this.$emit('saved', obj);
            this.$emit(event, obj);
        }
    }
};
