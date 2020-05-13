import Repository from "./Repository";

const resource = "/booking";
const paymentu = "/payment";
const paymentdetailurl = "/payment/detail";
const mybooking = "/my-bookings"
export default {
    saveBooking(payload) {
        return new Promise((resolve, reject) => {
            Repository.post(`${resource}`, payload)
                .then(response => {
                    resolve(response.data.body);
                })
                .catch(error => {
                    reject(error.response);
                });
        });
    },
    getMyBooking(payload) {
        return new Promise((resolve, reject) => {
            Repository.post(`${mybooking}`, payload)
                .then(response => {
                    resolve(response.data.body);
                })
                .catch(error => {
                    reject(error.response);
                });
        });
    },
     paymentResponse(id) {
        return new Promise((resolve, reject) => {
            Repository.get(`${paymentu}/${id}`)
                .then(response => {
                    resolve(response.data.body);
                })
                .catch(error => {
                    reject(error.response);
                });
        });
    },
    getTicket(id) {
        return new Promise((resolve, reject) => {
            Repository.get(`/my-booking/${id}/show`)
                .then(response => {
                    resolve(response.data.body);
                })
                .catch(error => {
                    reject(error.response);
                });
        });
    },
    getBookingForCounter() {
        return new Promise((resolve, reject) => {
            Repository.get(`/ticket-counter/booking`)
                .then(response => {
                    resolve(response.data.body);
                })
                .catch(error => {
                    reject(error.response);
                });
        });
    },
    paymentDetails(id) {
        return new Promise((resolve, reject) => {
            Repository.get(`${paymentdetailurl}/${id}`)
                .then(response => {
                    resolve(response.data.body);
                })
                .catch(error => {
                    reject(error.response);
                });
        });
    },
    retrieveChalani(vehicle, date) {
        return new Promise((resolve, reject) => {
            Repository.get(`${resource}/get-chalani/${vehicle}/${date}`)
                .then(response => {
                    resolve(response.data.body);
                })
                .catch(error => {
                    reject(error.response);
                });
        });
    }
}
