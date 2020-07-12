<template>
    <div>
        <h2>{{ message }}</h2>

        <div v-if="loading">Chargement..</div>

        <div v-else class="cardgrid">
            <router-link
                :to="{ name: 'pokemon', params: { id: pokemon.name } }"
                v-for="(pokemon, index) in pokemonList"
                :key="index"
                class="cardbox"
            >
                {{
                    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
                }}
            </router-link>
        </div>

        <div class="pagination">
            <button class="paginate-btn" @click="previousPage">
                ←
            </button>
            <button class="paginate-btn" @click="nextPage">→</button>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "pokemon-list",
    data() {
        return {
            message: "Pokemon list",
            pokemonList: [],
            loading: true,
            next: null,
            previous: null,
        };
    },
    mounted() {
        axios.get("https://pokeapi.co/api/v2/pokemon").then((result) => {
            this.pokemonList = result.data.results;
            this.loading = false;
            this.next = result.data.next;
            this.previous = result.data.previous;
        });
    },
    methods: {
        nextPage: function() {
            axios.get(this.next).then((result) => {
                this.pokemonList = result.data.results;
                this.next = result.data.next;
                this.previous = result.data.previous;
            });
        },
        previousPage: function() {
            axios.get(this.previous).then((result) => {
                this.pokemonList = result.data.results;
                this.next = result.data.next;
                this.previous = result.data.previous;
            });
        },
    },
};
</script>

<style>
h2 {
    margin-bottom: 40px;
}

a {
    text-decoration: none;
    color: inherit;
    font-weight: bold;
}

.cardgrid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto;
    grid-gap: 20px 10px;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
}

.cardbox {
    text-align: center;
    border: none;
    padding: 36px 0;
    border-radius: 5px;
    box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
}

.pagination {
    display: flex;
    width: 150px;
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;
}

.paginate-btn {
    border: 1px solid #333;
    background: none;
    border-radius: 50vh;
    width: 50px;
    height: 50px;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    cursor: pointer;
    transition: 0.2s ease-out;
}

.paginate-btn:hover {
    background: rgba(0, 0, 0, 0.1);
}
</style>
