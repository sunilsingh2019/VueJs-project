import Repository from "./Repository";

const resource = "/ticket-counter/cities";

export default {
    get() {
        return new Promise((resolve, reject) => {
            Repository.get(`${resource}`)
                .then(response => {
                    resolve(response.data.body);
                })
                .catch(error => {
                    reject(error.response);
                });
        });
    },
}