import Vue from 'vue';
import Vuex from 'vuex';
import authModule from './auth/index';
import profileModule from './user/index';
import searchModule from './search/index';
import postingModule from './posting/index';
import feedModule from './feed/index';
import postModule from './post/index';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		auth: authModule,
		profile: profileModule,
		search: searchModule,
		posting: postingModule,
		feed: feedModule,
		post: postModule
	}
});
//ZnKa&qL86A*#jt
