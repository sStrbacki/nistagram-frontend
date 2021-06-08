import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		component: () => import('../views/unauth/UnauthHome.vue'),
		children: [
			{
				path: '',
				name: 'LoginForm',
				component: () => import('../components/unauth/LoginForm.vue')
			},
			{
				path: 'register',
				name: 'RegistrationForm',
				component: () => import('../components/unauth/RegistrationForm.vue')
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
		component: () => import('../views/user/UserHome.vue'),
		children: [
			{
				path: '',
				redirect: 'feed'
			},
			{
				path: 'feed',
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
				name: 'UserProfile',
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
	}

	// {
	// 	path: '/:username',
	// 	component: () => import('../views/user/ProfileView'),
	// 	children: [
	// 		{
	// 			path: '',
	// 			name: 'ProfilePostsView',
	// 			component: () => import('../components/user/ProfilePostsView')
	// 		},
	// 		{
	// 			path: 'tagged',
	// 			name: 'ProfileTaggedPosts',
	// 			component: () => import('../components/user/ProfilePostsView')
	// 		}
	// 	]
	// },
];

const router = new VueRouter({
	routes
});

export default router;
