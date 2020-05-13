import Repository from "./Repository";

export default {
    get(payload) {
        return new Promise((resolve, reject) => {
            Repository.post(`schedule/list`, payload)
                .then(response => {
                    resolve(response.data.body);
                })
                .catch(error => {
                    reject(error.response);
                });
        });
    },

    saveBooking(payload) {
        return new Promise((resolve, reject) => {
            Repository.post(`save-booking`, payload)
                .then(response => {
                    resolve(response.data.body);
                })
                .catch(error => {
                    reject(error.response);
                });
        });
    }
};