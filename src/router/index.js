import Vue from 'vue';
import VueRouter from 'vue-router';
import { isLogged } from '../services/authService';

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
		meta: { authorized: true },
		component: () => import('../views/user/UserHome.vue'),
		children: [
			{
				path: '',
				redirect: 'feed'
			},
			{
				path: 'feed',
				name: 'Feed',
				component: () => import('../views/user/feed/Feed.vue')
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
			}
		]
	},
	{
		path: '/:username',
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
	},
];

const router = new VueRouter({
	routes
});

router.beforeEach((to, from, next) => {
	let logged = isLogged();

	if (to.matched.some(record => record.meta.nonExistingPath)) {
		if (logged) next({ name: 'Feed' });
		else next({ name: 'LoginForm' });
	} else if (to.matched.some(record => record.meta.unauthorized)) {
		if (logged) next({ name: 'Feed' });
		else next();
	} else if (to.matched.some(record => record.meta.authorized)) {
		if (!logged) next({ name: 'LoginForm' });
		else next();
	} else next();
});

export default router;
