import Repository from "./Repository";

const resource = "";

export default {
    getFeatures() {
        return new Promise((resolve, reject) => {
            Repository.post(`${resource}/get-features`)
                .then(response => {
                    resolve(response.data.body);
                })
                .catch(error => {
                    reject(error.response);
                });
        });
    },
    getTestimonials() {
        return new Promise((resolve, reject) => {
            Repository.post(`${resource}/get-testimonials`)
                .then(response => {
                    resolve(response.data.body);
                })
                .catch(error => {
                    reject(error.response);
                });
        });
    },
    getClients() {
        return new Promise((resolve, reject) => {
            Repository.post(`${resource}/get-clients`)
                .then(response => {
                    resolve(response.data.body);
                })
                .catch(error => {
                    reject(error.response);
                });
        });
    }
}
