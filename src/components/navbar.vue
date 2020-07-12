<template>
    <div class="navbar">
        <div>
            <router-link :to="{ name: 'home' }" class="brand"
                >💾 Pokemon World</router-link
            >
        </div>

        <div>
            <router-link :to="{ name: 'pokemon-list' }">Pokemons</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "navbar",
};
</script>

<style>
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 50px;
}

.brand {
    font-weight: bold;
    font-size: 2.5rem;
}
</style>
