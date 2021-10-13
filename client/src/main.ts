import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import axios from 'axios';
import VueAxios from 'vue-axios';
import 'element-plus/lib/theme-chalk/index.css';
import locale from 'element-plus/lib/locale/lang/uk';
import 'dayjs/locale/uk';

createApp(App)
  .use(ElementPlus, { locale })
  .use(VueAxios, axios)
  .use(store)
  .use(router)
  .mount('#app');
