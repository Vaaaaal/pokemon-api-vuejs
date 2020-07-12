import Vue from "vue";
import App from "./App.vue";
import Router from "vue-router";
import Home from "./views/Home";
import Pokemon from "./views/Pokemon";
import PokemonList from "./views/PokemonList";

Vue.config.productionTip = false;

Vue.use(Router);

const routes = [
    {
        path: "/",
        component: Home,
        name: "home",
    },
    {
        path: "/pokemon/:id",
        component: Pokemon,
        name: "pokemon",
    },
    {
        path: "/pokemon",
        component: PokemonList,
        name: "pokemon-list",
    },
];

const router = new Router({
    routes,
    mode: "history",
});

new Vue({
    router,
    render: (h) => h(App),
}).$mount("#app");
