<template>
  <div class="detail">
    <div class="detail-view" v-if="show">
      <div class="row mx-auto">
        <div class="text-center mt-1 mb-5">
          <div class="card m-1 col-6 mx-auto" :key="pokemon.name" style="width: 30rem;">
            <img :src="getImageUrl(pokemon.url)" alt="">
            <div class="card-body">
              <h4>{{ getPokemonNumber(pokemon.url) }}</h4>
              <h2 class="card-title"><strong>{{ capitalizeFirstLetter(pokemon.name) }}</strong></h2>
              <p>{{ getPokemonTypes(pokemon) }}</p>
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
    </div>
    <div class="mx-auto" v-else>
      <h2 style="text-align: center;">The pokemon was not found</h2>
      <button class="btn btn-dark justify-content-center" @click="closeDetail">Close</button>
    </div>
  </div>
</template>

<script>

export default {
  props: ['pokemonUrl'],
  data() {
    return {
      show: false,
      pokemon: {},
      loading: false
    };
  },
  methods: {
      fetchData() {
        let req = new Request(this.pokemonUrl);
        fetch(req)
          .then((resp) => {
            if(resp.status === 200)
              return resp.json();
          })
          .then((data) => {
            this.pokemon = data;
            this.show = true;
          })
          .catch((error) => {
            console.log(error);
          })
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
  background: rgba($color: #000000, $alpha: .7);

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