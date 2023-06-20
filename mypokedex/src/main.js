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

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)