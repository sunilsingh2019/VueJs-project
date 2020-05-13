const { guest } = require('../../lib/auth');

export const authRoutes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('./login'),
        beforeEnter: guest,
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('./register'),
        beforeEnter: guest,
    },
];