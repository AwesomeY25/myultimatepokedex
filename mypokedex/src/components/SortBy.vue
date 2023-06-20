<template>
  <form class="form-control" id="sort" name="sort" @submit.prevent="sortPokemon">
    <div class="row">
      <div class="col-9 ps-2 py-2">
        <select v-model="sortOption" class="form-select" aria-placeholder="Number (Low to High)">
          <option value="number-low-high">Number (Low to High)</option>
          <option value="number-high-low">Number (High to Low)</option>
          <option value="name-a-z">Name (A to Z)</option>
          <option value="name-z-a">Name (Z to A)</option>
        </select>
      </div>
      <div class="col-3 ps-1 pe-2 py-2">
        <button type="submit" style="width: 5rem;" class="btn btn-warning float-end">Sort</button>
      </div>
    </div>
  </form> 
</template>

<script>
export default {
  name: 'SortBy',
  data() {
    return {
      sortOption: 'number-low-high',
    };
  },
  methods: {
    sortPokemon() {
      // Implement the sorting logic based on the selected option
      switch (this.sortOption) {
        case 'number-low-high':
          this.pokemonData.sort((a, b) => a.id - b.id);
          break;
        case 'number-high-low':
          this.pokemonData.sort((a, b) => b.id - a.id);
          break;
        case 'name-a-z':
          this.pokemonData.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'name-z-a':
          this.pokemonData.sort((a, b) => b.name.localeCompare(a.name));
          break;
        default:
          // No sorting option selected
          break;
      }
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

<!-- Need to add PokemonData as props para pumasok siya here -->