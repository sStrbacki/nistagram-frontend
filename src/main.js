import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import Notifications from 'vue-notification/src';
import VueMeta from 'vue-meta';
import interceptorsSetup from '@/axios/interceptors';

Vue.config.productionTip = false;
Vue.use(Notifications);
Vue.use(VueMeta);
interceptorsSetup();

new Vue({
	router,
	store,
	vuetify,
	render: h => h(App)
}).$mount('#app');
