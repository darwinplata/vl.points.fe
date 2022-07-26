import { createRouter, createWebHistory } from "vue-router";
import EditPoint from '../views/EditPoint.vue'
import CreatePoint from '../views/CreatePoint.vue'
import PointsTable from '../components/PointsTable.vue';

const routes = [{
        path: '/',
        name: 'home',
        component: PointsTable,
    },
    {
        path: '/edit/:id',
        name: 'edit',
        component: EditPoint,
    },
    {
        path: '/create',
        name: 'create',
        component: CreatePoint,
    },
];

const router = createRouter({
    history: createWebHistory('/'),
    routes,
    strict: true,
});

export default router;