import store from '../store'

import { ADMIN, COUNTER, NORMAL, ADMIN_REDIRECT_URL, COUNTER_REDIRECT_URL, NORMAL_REDIRECT_URL, LOGIN_URL, REGISTER_URL } from './constant';

export const guard = (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn && (to.meta.hasOwnProperty('role') && to.meta.role === store.getters.getRole)) {
            next();
            return;
        }
        next('/login')
    }
    next();
};

const guestUrl = [ LOGIN_URL, REGISTER_URL, ];

export const guest = (to, from, next) => {
    if (store.getters.isLoggedIn && guestUrl.includes(to.name)) {
        switch (store.getters.getRole) {
            case ADMIN: {
                next(ADMIN_REDIRECT_URL);
                break;
            }
            case COUNTER: {
                next(COUNTER_REDIRECT_URL);
                break;
            }
            default: {
                next(NORMAL_REDIRECT_URL);
                break;
            }
        }
    } else { next(); }
};