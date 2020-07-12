<template>
    <div class="pokemon-spec" v-if="loading">
        <div>
            <img
                :src="pokemon.sprites.front_default"
                :alt="pokemon.name + ' image'"
            />
        </div>

        <div>
            <h1>N°{{ pokemon.id }}. {{ capitalize }}</h1>

            <div class="types-flex">
                <p
                    class="type-name"
                    v-for="(t, index) in pokemon.types"
                    :key="index"
                >
                    <em>{{ t.type.name }}</em>
                </p>
            </div>

            <div>
                <p><strong>Weight: </strong>{{ pokemon.weight / 10 }} kg</p>
                <p><strong>Height: </strong>{{ pokemon.height * 10 }} cm</p>
                <p><strong>Habitat: </strong>{{ spec.habitat.name }}</p>
            </div>

            <div>
                {{ description }}
            </div>

            <div class="stats">
                <p><strong>Base stats:</strong></p>
                <table>
                    <tr>
                        <th v-for="(th, index) in pokemon.stats" :key="index">
                            {{ th.stat.name }}
                        </th>
                    </tr>
                    <tr>
                        <td v-for="(td, index) in pokemon.stats" :key="index">
                            {{ td.base_stat }}
                        </td>
                    </tr>
                </table>
            </div>

            <div v-if="spec.evolves_from_species">
                <em>Evolves from {{ spec.evolves_from_species.name }}</em>
            </div>
            <div v-else>
                <em>Not an evolution</em>
            </div>
        </div>
    </div>

    <div v-else>
        Chargement...
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "Home",
    data() {
        return {
            pokemon: null,
            spec: null,
            loading: false,
        };
    },
    async mounted() {
        await axios
            .get("https://pokeapi.co/api/v2/pokemon/" + this.$route.params.id)
            .then((result) => {
                this.pokemon = result.data;
            });
        axios
            .get(
                "https://pokeapi.co/api/v2/pokemon-species/" +
                    this.$route.params.id
            )
            .then((result) => {
                this.spec = result.data;
                this.loading = true;

                console.log(this.pokemon, this.spec);
            });
    },
    computed: {
        description: function() {
            return this.spec.flavor_text_entries.filter(
                (s) => s.language.name === "en"
            )[0].flavor_text;
        },
        capitalize: function() {
            return (
                this.pokemon.name.charAt(0).toUpperCase() +
                this.pokemon.name.slice(1)
            );
        },
    },
};
</script>

<style scoped>
.pokemon-spec {
    display: grid;
    grid-template-columns: 1fr 3fr;
    align-items: center;
}

img {
    width: 150px;
}

.types-flex {
    display: flex;
}

.type-name {
    margin-right: 10px;
}

.stats {
    margin: 30px 0 20px;
}

table {
    border: 4px double black;
    border-radius: 3px;
    margin: 0;
}

th {
    background: #e1e1e1;
    margin: 0;
    padding: 8px 10px;
}

td {
    text-align: center;
    padding: 8px 10px;
}
</style>
