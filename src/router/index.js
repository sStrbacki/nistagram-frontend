import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
	{
		path: '*',
		meta: { nonExistingPath: true }
	},
	{
		path: '/',
		meta: { unauthorized: true },
		component: () => import('../views/unauth/UnauthHome.vue'),
		children: [
			{
				path: '',
				name: 'LoginForm',
				component: () => import('../components/unauth/LoginForm.vue')
			},
			{
				path: 'request-password-reset',
				name: 'RequestPasswordReset',
				component: () => import('../components/unauth/RequestPasswordReset')
			},
			{
				path: 'password-reset/:uuid',
				name: 'PasswordReset',
				component: () => import('../components/unauth/PasswordReset')
			},
			{
				path: 'register',
				name: 'RegistrationForm',
				component: () => import('../components/unauth/RegistrationForm.vue')
			},
			{
				path: 'activate/:uuid',
				name: 'AccountActivation',
				component: () => import('../components/unauth/AccountActivation')
			},
			{
				path: 'search',
				component: () => import('../views/common/Search.vue'),
				children: [
					{
						path: '',
						redirect: 'users'
					},
					{
						path: 'users',
						name: 'UserSearch',
						component: () =>
							import('../components/common/search/UserSearch.vue')
					},
					{
						path: 'locations',
						name: 'LocationSearch',
						component: () =>
							import('../components/common/search/LocationSearch.vue')
					},
					{
						path: 'tags',
						name: 'TagSearch',
						component: () => import('../components/common/search/TagSearch.vue')
					}
				]
			}
		]
	},
	{
		path: '/home',
		meta: { user: true },
		component: () => import('../views/user/UserHome.vue'),
		children: [
			{
				path: '',
				redirect: 'feed'
			},
			{
				path: 'close-friends',
				name: 'CloseFriends',
				component: () => import('../views/user/close-friends/CloseFriends.vue')
			},
			{
				path: 'interactions',
				name: 'InteractedPosts',
				component: () => import('../views/user/post/InteractedPosts.vue')
			},
			{
				path: 'feed',
				name: 'Feed',
				component: () => import('../views/user/feed/Feed.vue')
			},
			{
				path: 'collection/:collectionName',
				name: 'Collection',
				component: () => import('../views/user/post-collection/Collection.vue')
			},
			{
				path: 'publish',
				component: () => import('../views/user/posting/Publish.vue'),
				children: [
					{
						path: '',
						redirect: 'post'
					},
					{
						path: 'post',
						component: () => import('../components/user/posting/NewPost.vue')
					},
					{
						path: 'story',
						component: () => import('../components/user/posting/NewStory.vue')
					}
				]
			},
			{
				path: 'post/:postId',
				name: 'PostPreview',
				component: () => import('../views/user/post/PostPreview')
			},
			{
				path: 'my-collections',
				component: () =>
					import('../views/user/post-collection/MyCollections.vue')
			},
			{
				path: 'settings',
				component: () => import('../views/user/profile/UserProfile'),
				children: [
					{
						path: '',
						name: 'PersonalData',
						component: () => import('../components/user/profile/PersonalData')
					},
					{
						path: 'privacy',
						name: 'PrivacyData',
						component: () => import('../components/user/profile/PrivacyData')
					},
					{
						path: 'notifications',
						name: 'NotificationPreferences',
						component: () =>
							import('../components/user/profile/NotificationPreferences')
					},
					{
						path: 'verification',
						name: 'Verification',
						component: () =>
							import('../components/user/profile/VerificationSection')
					},
					{
						path: 'agent',
						name: 'AgentRegistration',
						component: () =>
							import('../components/user/profile/AgentRegistration')
					}
				]
			},
			{
				path: 'search',
				component: () => import('../views/common/Search.vue'),
				children: [
					{
						path: '',
						redirect: 'users'
					},
					{
						path: 'users',
						name: 'UserSearchLogged',
						component: () =>
							import('../components/common/search/UserSearch.vue')
					},
					{
						path: 'locations',
						name: 'LocationSearchLogged',
						component: () =>
							import('../components/common/search/LocationSearch.vue')
					},
					{
						path: 'tags',
						name: 'TagSearchLogged',
						component: () => import('../components/common/search/TagSearch.vue')
					}
				]
			},
			{
				path: 'followers',
				component: () => import('../views/user/profile/FollowerRequestsView')
			}
		]
	},
	{
		path: '/admin',
		meta: { admin: true },
		component: () => import('../views/admin/AdminHome'),
		children: [
			{
				path: '',
				redirect: 'verification'
			},
			{
				path: 'verification',
				name: 'AdminVerification',
				component: () =>
					import('../views/admin/verification/AdminVerificationView')
			},
			{
				path: 'agent-registration',
				name: 'AgentRegistration',
				component: () =>
					import('../views/admin/agent-registration/AgentRegistration.vue'),
				children: [
					{
						path: '',
						name: 'RequestManagement',
						component: () =>
							import(
								'../components/admin/agent-registration/RequestManagement.vue'
							)
					},
					{
						path: 'user-promotion',
						name: 'UserPromotion',
						component: () =>
							import('../components/admin/agent-registration/UserPromotion.vue')
					}
				]
			}
		]
	},
	{
		path: '/:username',
		name: 'Profile',
		component: () => import('../views/user/profile/ProfileView'),
		children: [
			{
				path: '',
				name: 'ProfilePostsView',
				component: () => import('../components/user/profile/ProfilePostsView')
			},
			{
				path: 'tagged',
				name: 'ProfileTaggedPosts',
				component: () => import('../components/user/profile/ProfilePostsView')
			}
		]
	}
];

const router = new VueRouter({
	routes
});

import { rolePromise } from '../main';
import store from '../store/index';

router.beforeEach(async (to, from, next) => {
	await rolePromise;
	const isUser = store.getters.roles.includes('ROLE_USER');
	const isAdmin = store.getters.roles.includes('ROLE_ADMIN');

	if (to.matched.some(record => record.meta.nonExistingPath)) {
		if (isUser) next({ name: 'Feed' });
		else if (isAdmin) next({ name: 'AdminVerification' });
		else next({ name: 'LoginForm' });
	} else if (to.matched.some(record => record.meta.unauthorized)) {
		if (isUser) next({ name: 'Feed' });
		else if (isAdmin) next({ name: 'AdminVerification' });
		else next();
	} else if (to.matched.some(record => record.meta.admin)) {
		if (!isAdmin) next({ name: 'Feed' });
		else next();
	} else if (to.matched.some(record => record.meta.user)) {
		if (!isUser) next({ name: 'LoginForm' });
		else next();
	} else next();
});

export default router;
