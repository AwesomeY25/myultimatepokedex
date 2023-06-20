<template>
  <div v-if="apiData">
    <div class="row mx-auto justify-content-center">
      <div class="card m-1 col-2" v-for="pokemon in displayedPokemon" :key="pokemon.name" style="width: 15rem;">
        <img class="card-img-top" :src="getImageUrl(pokemon.url)" alt="Card image cap">
        <div class="card-body">
          <h6>{{ getPokemonNumber(pokemon.url) }}</h6>
          <h4 class="card-title"><strong>{{ capitalizeFirstLetter(pokemon.name) }}</strong></h4>
          <p>{{ pokemon.types }}</p>
          <button @click="setPokemonUrl(pokemon.url)" class="btn btn-danger" style="color: white;">Learn More</button>
          <div v-if="show">
            <PokemonDetail
              :pokemonUrl="pokemonUrl"
              @closeDetail="closeDetail" />
          </div>
        </div>
      </div>
      <button style="width: 15rem;" class="mb-5 mt-3 p-2 btn btn-primary" @click="loadMore">Load More Pokemon</button>
    </div>
  </div>
  <div v-else-if="loading">
    <h2 style="text-align: center;">Loading...</h2>
  </div>
</template>

<script>
import axios from 'axios';
import PokemonDetail from './PokemonDetail.vue';

export default {
  name: 'PokemonList',
  components: {
    PokemonDetail,
  },
  data() {
    return {
      pokemonUrl: '',
      imageUrl: '',
      show: false,
      apiData: null,
      displayedPokemon: [],
      offset: 0,
      limit: 10,
      loading: false,
      nextUrl: '',
      currentUrl: '',
    };
  },
  mounted() {
    this.loadPokemon();
  },
  methods: {
    loadPokemon() {
      this.loading = true;
      axios
        .get(`https://pokeapi.co/api/v2/pokemon?limit=${this.limit}&offset=${this.offset}`)
        .then((response) => {
          this.apiData = response.data;
          const pokemonPromises = response.data.results.map((pokemon) => {
            return axios
              .get(pokemon.url)
              .then((response) => {
                const types = response.data.types.map((type) => this.capitalizeFirstLetter(type.type.name));
                return {
                  name: pokemon.name,
                  url: pokemon.url,
                  types: types.join(', '),
                };
              })
              .catch((error) => {
                console.error(error);
                return {
                  name: pokemon.name,
                  url: pokemon.url,
                  types: 'Error Loading',
                };
              });
          });

          Promise.all(pokemonPromises)
            .then((pokemonData) => {
              this.displayedPokemon = [...this.displayedPokemon, ...pokemonData];
              this.offset += this.limit;
              this.loading = false;
            })
            .catch((error) => {
              console.error(error);
              this.loading = false;
            });
        })
        .catch((error) => {
          console.error(error);
          this.loading = false;
        });
    },
    getImageUrl(url) {
      const pokemonId = url.split('/')[6];
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
    },
    getPokemonNumber(url) {
      const pokemonId = url.split('/')[6];
      const paddedId = String(pokemonId).padStart(3, '0');
      return `#${paddedId}`;
    },
    setPokemonUrl(url) {
      this.pokemonUrl = url;
      this.show = true;
    },
    closeDetail() {
      this.show = false;
    },
    loadMore() {
      this.loadPokemon();
    },
    capitalizeFirstLetter(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a:visited {
  color: grey;
  background-color: transparent;
  text-decoration: none;
}
</style>
