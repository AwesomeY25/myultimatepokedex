<template>
  <div>
    <nav class="navbar navbar-dark bg-custom mb-4 sticky-top" style="background-color: #610A0A;">
      <div class="container-fluid justify-content-center">
        <img src="../src/assets/logo.png" class="img-fluid" style="height: 2.5rem;" alt="Logo">
        <h3 class="navbar-brand text-align-center ms-2"><strong>Pokedex</strong></h3>
      </div>
    </nav>

    <div class="container-fluid">
      <div class="row col-10 mx-auto justify-content-center">
        <div class="col-4">
          <SearchNameID :pokemonData="pokemonData" />
        </div>
        <div class="col-2"></div>
        <div class="col-4 justify-content-right">
          <SortBy :pokemonData="pokemonData" />
        </div>
      </div>
      <div class="row col mx-auto m-2 p-2 justify-content-center">
        <h2 style="text-align: center;"><strong>All Pokemon</strong></h2>
      </div>
      <div class="row col mx-auto justify-content-center m-2 p-2">
        <PokemonList
        :pokemonData="pokemonData"
        :imageUrl="imageUrl" 
        @setPokemonUrl="setPokemonUrl" />
        <PokemonDetail v-if="show"
        :pokemonData="pokemonData"
        :pokemonUrl="pokemonUrl"
        :imageUrl="imageUrl"
        @closeDetail="closeDetail" />
      </div>
      <div class="row col-10 mx-auto justify-content-center"></div>
    </div>

    <nav class="navbar bg-custom fixed-bottom justify-content-center" style="background: #610A0A;">
      <div class="row" style="color: white;">
        <h6 style="text-align: center;">Developed by: <b>Yra Corciga</b></h6>
      </div>
    </nav>
  </div>
</template>

<script>
import SearchNameID from './components/SearchNameID.vue'
import SortBy from './components/SortBy.vue'
import PokemonList from './components/PokemonList.vue'
import PokemonDetail from './components/PokemonDetail.vue'
import axios from 'axios';

export default {
  name: 'App',
  components: {
    SearchNameID,
    SortBy,
    PokemonList,
    PokemonDetail,
  },
  data() {
    return {
      pokemonData: null,
      loading: false, // Added loading property
      limit: 10,
      offset: 0
    };
  },
  mounted() {
    this.loadPokemon();
  },
  methods: {
    loadPokemon() {
      this.loading = true;
      axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${this.limit}&offset=${this.offset}`)
        .then(response => {
          this.pokemonData = response.data;
          this.offset += this.limit;
          this.loading = false;
        })
        .catch(error => {
          console.error(error);
          this.loading = false;
        });
    },
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');

#app {
  font-family: Lato, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
