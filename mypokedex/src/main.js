new Vue({
    render: h => h(App),
    data () {
        return {
            apiData: null,
            loading: true,
            errored: false
        }
      },
      mounted () {
        axios
          .get('https://pokeapi.co/api/v2/pokemon?limit=10&offset=10')
          .then(response => {
            this.apiData = response.data
            console.log(response);
          })
          .catch(error => {
            console.log(error)
            this.errored = true
          })
          .finally(() => this.loading = false)}
    }).$mount('#app');import App from './App.vue'

import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import axios from 'axios';
import VueRouter from 'vue-router';
import PokemonList from './components/PokemonList.vue';
import PokemonDetail from './components/PokemonDetail.vue';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.use(VueRouter);

const routes = [
  { path: '/', component: PokemonList },
  { path: '/pokemon/:id', component: PokemonDetail }
];

const router = new VueRouter({
  routes
});

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app');


Vue.use(BootstrapVue)
Vue.use(IconsPlugin)