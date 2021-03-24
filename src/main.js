import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import 'mdb-vue-ui-kit/css/mdb.min.css';
import config from './config';
// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faTachometerAlt,
  faUsers,
  faGamepad,
  faCog,
  faSquare
} from '@fortawesome/free-solid-svg-icons';

const {
  server: { host, port }
} = config;

library.add(faTachometerAlt, faUsers, faGamepad, faCog, faSquare);

const app = createApp(App)
  .use(router)
  .component('fa', FontAwesomeIcon);

const base = axios.create({
  baseURL: `http://${host}:${port}`
});

app.config.globalProperties.$http = base;
app.config.productionTip = false;

app.mount('#app');
