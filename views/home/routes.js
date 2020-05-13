const { guest, guard } = require('../../lib/auth');

export const homeRoutes = [
    {
        path: '/',
        name: 'home.index',
        component: () => import('./index')
    },
    {
        path: '/about-us',
        name: 'about.index',
        component: () => import('./about-us')
    },
    {
        path: '/how-it-works',
        name: 'how-it-works.index',
        component: () => import('./how-it-works')
    },
    {
        path: '/bookings',
        name: 'bookings',
        component: () => import('./bookings'),
        beforeEnter: guard,
        meta: {
            requiresAuth: true,
            role: 'user'
        },
        props: true
    },
    {
        path: '/get-ticket/:bookingId',
        name: 'get-ticket',
        component: () => import('./get-ticket'),
        beforeEnter: guard,
        meta: {
            requiresAuth: true,
            role: 'user'
        },
        props: true
    },
    {
        path: '/my-bookings',
        name: 'my-bookings',
        component: () => import('./my-bookings'),
        beforeEnter: guard,
        meta: {
            requiresAuth: true,
            role: 'user'
        },
        props: true
    },
    {
        path: '/payment',
        name: 'payment',
        component: () => import('./includes/bookings/payment'),
        beforeEnter: guard,
        meta: {
            requiresAuth: true,
            role: 'user'
        },
        props: true
    },
    {
        path: '/pay/:bookingId',
        name: 'pay',
        component: () => import('./includes/bookings/pay'),
        beforeEnter: guard,
        meta: {
            requiresAuth: true,
            role: 'user'
        },
        props: true
    }
];