import Vue from 'vue'
import Router from 'vue-router'

import { authRoutes } from '../views/auth/routes';

import { homeRoutes } from '../views/home/routes';

import { counterRoutes } from "../views/counter/routes";

import { getToken, setToken } from "../lib/storage";

Vue.use(Router);

let routes = [

];

let errorRoutes = [
    {
        path: '*',
        component: () => import('../views/error/page-not-found')
    }
];

routes = [ ...authRoutes, ...homeRoutes, ...counterRoutes, ...routes, ...errorRoutes ];

const router = new Router({
    mode: 'history',
    routes, // short for `routes: routes`
    linkActiveClass: 'active',
});

router.beforeEach( (to, from, next) => {
    // console.log(getToken())
    next();
});

export default router;