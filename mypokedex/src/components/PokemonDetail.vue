<template>
  <div class="mx-auto detail">
    <div class="detail-view" v-if="show">
      <div class="row mx-auto">
        <div class="text-center mt-1 mb-5">
          <div class="card m-1 col-6 mx-auto" :key="pokemon.url" style="width: 30rem;">
            <img :src="getImageUrl(pokemon.url)" alt="">
            <div class="card-body">
              <h4> {{ getPokemonNumber(pokemon.url) }} </h4>
              <h2 class="card-title"><strong>{{ capitalizeFirstLetter(pokemon.name) }}</strong></h2>
              <p>{{ pokemon.types }}</p>
              <hr class="mx-auto" style="width: 80%;">
              <div class="row mx-5">
                <div class="col-6" style="text-align: left;"><strong>Base Experience</strong></div>
                <div class="col-6" style="text-align: right;">{{ pokemon.base_experience }} XP</div>
              </div>
              <hr class="mx-auto" style="width: 80%;">
              <div class="row mx-5">
                <div class="col-6" style="text-align: left;"><strong>Height</strong></div>
                <div class="col-6" style="text-align: right;">{{ pokemon.height / 10 }} m</div>
              </div>
              <hr class="mx-auto" style="width: 80%;">
              <div class="row mx-5">
                <div class="col-6" style="text-align: left;"><strong>Weight</strong></div>
                <div class="col-6" style="text-align: right;">{{ pokemon.weight / 10 }} kg</div>
              </div>
              <hr class="mx-auto" style="width: 80%;">
            </div>
          </div>
        </div>
      </div>
      <div class="row mx-auto">
        <div class="col-9 ps-2 py-2">
          <button type="submit" style="width: 8rem;" class="btn btn-warning float-start" @click="previousPokemon">Back</button>
        </div>
        <div class="col-3 ps-1 pe-2 py-2">
          <button type="submit" style="width: 8rem;" class="btn btn-warning float-end" @click="nextPokemon">Next</button>
        </div>
      </div>
    </div>
    <div class="row mx-auto" v-else>
      <h2 style="text-align: center; color: beige;">The pokemon was not found</h2>
      <button class="btn btn-dark justify-content-center" @click="closeDetail">Close</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props: ['pokemonUrl'],
  data() {
    return {
      show: false,
      pokemon: {},
      loading: false,
      localPokemonUrl: this.pokemonUrl
    };
  },
  methods: {
    fetchData() {
      this.loading = true;
      axios
        .get(this.localPokemonUrl)
        .then((response) => {
          const pokemonData = response.data;
          const types = pokemonData.types.map((type) => this.capitalizeFirstLetter(type.type.name));
          this.pokemon = {
            name: pokemonData.name,
            url: pokemonData.url,
            types: types.join(', '),
            base_experience: pokemonData.base_experience,
            height: pokemonData.height,
            weight: pokemonData.weight
          };
          this.loading = false;
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
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    closeDetail() {
      this.show = false;
      this.$emit('closeDetail');
    },
    getPokemonNumber(url) {
      const pokemonId = url.split('/')[6];
      const paddedId = String(pokemonId).padStart(3, '0');
      return `#${paddedId}`;
    },
    nextPokemon() {
      const currentPokemonId = Number(this.localPokemonUrl.split('/')[6]);
      const nextPokemonId = currentPokemonId + 1;
      const nextPokemonUrl = `https://pokeapi.co/api/v2/pokemon/${nextPokemonId}`;
      this.localPokemonUrl = nextPokemonUrl;
      this.fetchData();
    },
    previousPokemon() {
      const currentPokemonId = Number(this.localPokemonUrl.split('/')[6]);
      const previousPokemonId = currentPokemonId - 1;
      const previousPokemonUrl = `https://pokeapi.co/api/v2/pokemon/${previousPokemonId}`;
      this.localPokemonUrl = previousPokemonUrl;
      this.fetchData();
    },
  },
  created() {
    this.fetchData();
  }
};
</script>

<style lang="scss" scoped>
.detail {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: fixed;
  top: 0;
  left: 0;
  padding: 90px 10px 10px;
  width: calc(100% - 20px);
  height: calc(100vh - 20px);
  background: black;

  .detail-view {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    width: 100%;
    max-width: 510px;
    padding: 50px 0 0;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 15px 30px rgba(0, 0, 0, .2), 0 10px 10px rgba(0, 0, 0, .2);
  }
}
</style>
