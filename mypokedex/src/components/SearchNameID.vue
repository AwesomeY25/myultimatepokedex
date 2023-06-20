<template>
  <form class="form-control" id="search" name="search" @submit.prevent="searchPokemon">
    <div class="row justify-content-left">
      <div class="col-9 ps-2 py-2">
        <input v-model.trim="searchTerm" type="text" class="form-control" id="search" name="search" placeholder="Search using ID or Name">
      </div>
      <div class="col-3 ps-1 pe-2 py-2">
        <button type="submit" style="width: 5rem;" class="btn btn-warning float-end">Search</button>
      </div>
    </div>
  </form>
</template>

<script>
import axios from 'axios';
export default {
  name: 'SearchNameID',
  props: ['pokemonData'], // Add pokemonData as a prop
  
  data() {
    return {
      searchTerm: '',
      loading: false,
    };
  },
  methods: {
    searchPokemon() { // Renamed the method from onSubmit to searchPokemon
      this.loading = true;
      axios.get(`https://pokeapi.co/api/v2/pokemon/${this.searchTerm}`)
        .then(response => {
          this.loading = false;
          const pokemon = response.data;
          this.$emit('search_pokeName', pokemon);
        })
        .catch(error => {
          this.loading = false;
          console.error(error);
          // Handle error case or show error message to the user
        });
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
a {
  color: #42b983;
}
</style>
