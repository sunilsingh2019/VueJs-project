import Repository from "./Repository";

const resource = "/impersonation";

export default {
    impersonate(id) {
        return new Promise((resolve, reject) => {
            Repository.post(`${resource}/${id}`)
                .then(response => {
                    resolve(response.data.body);
                })
                .catch(error => {
                    reject(error.response);
                });
        });
    },

    revert() {
        return new Promise((resolve, reject) => {
            Repository.get(`${resource}`)
                .then(response => {
                    resolve(response.data.body);
                })
                .catch(error => {
                    reject(error.response);
                });
        });
    }
}
