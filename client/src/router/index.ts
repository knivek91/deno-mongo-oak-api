import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import AuthLayout from "../layouts/Auth.vue";
import AdminLayout from "../layouts/Admin.vue";

Vue.use(VueRouter);

// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
const routes: Array<RouteConfig> = [
    {
        path: "/",
        component: AuthLayout,
        children: [
            {
                path: "",
                name: "auth",
                component: () => import("../views/Login.vue")
            }
        ]
    },
    {
        path: "/admin",
        component: AdminLayout,
        children: [
            {
                path: "",
                name: "admin",
                component: () => import("../views/CharacterList.vue")
            },
            {
                path: "form",
                name: "form",
                component: () => import("../views/Form.vue")
            }
        ]
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
