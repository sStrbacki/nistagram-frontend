import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import Notifications from 'vue-notification/src';
import interceptorsSetup from '@/axios/interceptors';
import { isLogged } from './services/authService';

Vue.config.productionTip = false;
Vue.use(Notifications);
interceptorsSetup();

let rolePromise;
if (isLogged()) {
	rolePromise = store.dispatch('getRoles');
}

new Vue({
	router,
	store,
	vuetify,
	render: h => h(App)
}).$mount('#app');

export{
	rolePromise
}
