import Vue from 'vue';
import Vuex from 'vuex';
import authModule from './auth/index';
import profileModule from './user/index';
import searchModule from './search/index';
import postingModule from './posting/index';
import feedModule from './feed/index';
import postModule from './post/index';
import collectionModule from './collection/index';
import viewingProfile from './viewing-profile/index';
import notificationsModule from './notification/index';
import reportModule from './report/index';
import verificationModule from './verification/index';
import closeFriendsModule from './close-friends/index';
import agentRegistrationModule from './agent-registration/index';
import chatModule from './chat/index';
import apiKeyModule from './api-key/index';
import campaignModule from './campaign/index';
import recommendationModule from './recommendation/index';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		auth: authModule,
		profile: profileModule,
		search: searchModule,
		posting: postingModule,
		feed: feedModule,
		post: postModule,
		collection: collectionModule,
		viewingProfile: viewingProfile,
		notifications: notificationsModule,
		report: reportModule,
		verification: verificationModule,
		closeFriends: closeFriendsModule,
		agentRegistration: agentRegistrationModule,
		chat: chatModule,
		apiKey: apiKeyModule,
		campaign: campaignModule,
		recommendation: recommendationModule
	}
});
