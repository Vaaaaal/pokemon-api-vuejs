<template>
    <div id="app">
        <navbar></navbar>
        <keep-alive include="pokemon-list">
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
import navbar from "./components/navbar";

export default {
    name: "App",
    components: { navbar },
};
</script>

<style>
body {
    font-family: monospace;
}

#app {
    max-width: 1200px;
    margin: 0 auto;
}
</style>
