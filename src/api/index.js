export const apiHost = 'http://localhost:9090';
export const notificationHost = 'http://localhost:9005';

export const api = {
	auth: {
		login: apiHost + '/api/auth',
		requestPasswordReset: apiHost + '/api/auth/request-password-reset',
		resetPassword: apiHost + '/api/auth/reset-password',
		accountActivation: apiHost + '/api/auth/activate'
	},
	user: {
		base: apiHost + '/api/users',
		register: apiHost + '/api/users/register',
		profile: apiHost + '/api/users/profile',
		preferences: apiHost + '/api/users/profile/preferences',
		privacyData: apiHost + '/api/users/profile/privacy',
		publicData: apiHost + '/api/users/public',
		taggable: apiHost + '/api/users/taggable',
		visibility: apiHost + '/api/users/visibility',
		stats: apiHost + '/api/users/profile/stats'
	},
	content: {
		base: apiHost + '/api/content',
		postBase: apiHost + '/api/content/post',
		storyBase: apiHost + '/api/content/story',
		reshare: apiHost + '/api/content/story/share',
		mediaStory: apiHost + '/api/content/story/media',
		postLike: apiHost + '/api/content/post/like',
		postDislike: apiHost + '/api/content/post/dislike',
		comment: apiHost + '/api/content/post/comment',
		userPosts: apiHost + '/api/content/post/user',
		userHighlights: apiHost + '/api/content/story/highlights/user'
	},
	feed: {
		postFeed: apiHost + '/api/feed/posts',
		storyFeed: apiHost + '/api/feed/stories/grouped',
		closeFriendStoryFeed: apiHost + '/api/feed/stories/close/grouped'
	},
	collection: {
		collectionBase: apiHost + '/api/content/post/collection',
		saveDefault: apiHost + '/api/content/post/save',
		defaultCollection: apiHost + '/api/content/post/saved',
		unsave: apiHost + '/api/content/post/unsave'
	},
	graph: {
		base: apiHost + '/api/user-graph',
		following: apiHost + '/api/user-graph/follows',
		pending: apiHost + '/api/user-graph/pending',
		follow: apiHost + '/api/user-graph/followers'
	},
	notification: {
		base: apiHost + '/api/notification',
		ws: notificationHost + '/api/notification/ws'
	}
};
