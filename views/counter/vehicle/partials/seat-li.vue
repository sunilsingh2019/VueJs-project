<template>
    <ol class="seats" type="A">
        <template v-for="(seat, index) in seats">
            <li  class="seat" v-if="isShown(seat ? (seat.hasOwnProperty('seat_type') ? seat.seat_type : 'N/A') : 'N/A',
            seat ? (seat.hasOwnProperty('chair_id') ? seat.chair_id : null) : null)">
                <input type="checkbox" :id="seat.seat_type" :value="seat.chair_id"
                       @click="passSeat({ name: seat.seat_type, chair: seat.chair_id, price: seat.price })"/>
                <label :class="hasStatus(seat.chair_id)" :for="seat.seat_type">{{ seat.seat_type }}</label>
            </li>
            <li v-else  class="seat">
                <label class="NO" :for="seat.seat_type">--</label>
            </li>
        </template>
    </ol>
</template>

<script>
    export default {
        name: "seat-li",
        props: {
            'seats': [ Object, Array ],
            'not_seats': {
                type: Array,
                default: function () {
                    return [];
                }
            },
            'preserved': {
                type: Array,
                default: function () {
                    return [];
                }
            },
            'booked': {
                type: Array,
                default: function () {
                    return [];
                }
            },
            'cancelled': {
                type: Array,
                default: function () {
                    return [];
                }
            }
        },
        methods: {
            isShown(seat, seatNo) {
                let dontShow = [ 'N/A', 0, '0', 'A', 'B', 'DS' ];
                return !dontShow.includes(seat) && !this.not_seats.includes(seatNo);
            },
            passSeat(seat) {
                if (this.hasStatus(seat.chair) === 'NO') {
                    this.$emit('clicked-seat', seat);
                }
                return;
            },
            hasStatus(seatId) {
                if (this.preserved.includes(seatId)) {
                    return 'preserved-seat';
                }
                if (this.booked.includes(seatId)) {
                    return 'booked-seat';
                }
                if (this.cancelled.includes(seatId)) {
                    return 'cancel-seat';
                }
                return 'NO';
            },
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>