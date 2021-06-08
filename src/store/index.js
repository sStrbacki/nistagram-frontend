import Vue from 'vue';
import Vuex from 'vuex';
import authModule from './auth/index';
import profileModule from './user/index';
import searchModule from './search/index';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		auth: authModule,
		profile: profileModule,
		search: searchModule
	}
});
//ZnKa&qL86A*#jt
