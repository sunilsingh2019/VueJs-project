const { guard } = require('../../lib/auth');

export const counterRoutes = [
    {
        path: '/ticket-counter/dashboard',
        name: 'counter-dashboard',
        component: () => import('./dashboard/overview'),
        beforeEnter: guard,
        meta: {
            requiresAuth: true,
            role: 'ticket-counter'
        }
    },
    {
        path: '/ticket-counter/vehicle-list',
        name: 'vehicle-list',
        component: () => import('./vehicle/list'),
        beforeEnter: guard,
        meta: {
            requiresAuth: true,
            role: 'ticket-counter'
        }
    },
    {
        path: '/ticket-counter/route-list',
        name: 'route-list',
        component: () => import('./route/list'),
        beforeEnter: guard,
        meta: {
            requiresAuth: true,
            role: 'ticket-counter'
        }
    },
    {
        path: '/ticket-counter/manage-seat',
        name: 'manage-seat',
        component: () => import('./vehicle/manage-seat'),
        beforeEnter: guard,
        meta: {
            requiresAuth: true,
            role: 'ticket-counter'
        }
    },
    {
        path: '/ticket-counter/schedule',
        name: 'schedule',
        component: () => import('./vehicle/schedule'),
        beforeEnter: guard,
        meta: {
            requiresAuth: true,
            role: 'ticket-counter'
        }
    },
    {
        path: '/ticket-counter/booking-list',
        name: 'schedule',
        component: () => import('./vehicle/bookinglist'),
        beforeEnter: guard,
        meta: {
            requiresAuth: true,
            role: 'ticket-counter'
        }
    },
    {
        path: '/ticket-counter/get-ticket/:bookingId',
        name: 'get-ticket',
        component: () => import('./../home/get-ticket'),
        beforeEnter: guard,
        meta: {
            requiresAuth: true,
            role: 'ticket-counter'
        },
        props: true
    },
    {
        path: '/ticket-counter/chalani/:vehicleId/:date',
        name: 'chalani',
        component: () => import('./vehicle/chalani'),
        beforeEnter: guard,
        meta: {
            requiresAuth: true,
            role: 'ticket-counter'
        }
    },
];