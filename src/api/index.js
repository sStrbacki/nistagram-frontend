export const apiHost = 'http://localhost:9090';
export const notificationHost = 'http://localhost:9005';

export const api = {
	auth: {
		base: apiHost + '/api/auth',
		login: apiHost + '/api/auth',
		requestPasswordReset: apiHost + '/api/auth/request-password-reset',
		resetPassword: apiHost + '/api/auth/reset-password',
		accountActivation: apiHost + '/api/auth/activate',
	},
	apiKey: {
		root: apiHost + '/api/auth/api-token',
		generate: apiHost + '/api/auth/api-token/create'
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
		stats: apiHost + '/api/users/profile/stats',
		nonPromoted: apiHost + '/api/users/non-promoted',
		ban: apiHost + '/api/users/ban',
		agents: {
			base: apiHost + '/api/users/agents',
			pending: apiHost + '/api/users/agents/pending',
			accept: apiHost + '/api/users/agents/accept',
			decline: apiHost + '/api/users/agents/decline',
			promote: apiHost + '/api/users/agents/promote',
			applicationPackageName: apiHost + '/api/users/agents/application',
			isRequestRejected: apiHost + '/api/users/agents/isRejected'
		}
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
		userPostsPublic: apiHost + '/api/content/post/public/user',
		highlights: apiHost + '/api/content/story/highlights',
		userHighlights: apiHost + '/api/content/story/highlights/user',
		userHighlightsPublic: apiHost + '/api/content/story/public/highlights/user',
		postSearchLocation: apiHost + '/api/content/post/search/location',
		tagged: apiHost + '/api/content/post/tagged',
		personalStories: apiHost + '/api/content/story/me/all',
		interactedPosts: apiHost + '/api/content/post/interactions',
		report: {
			post: apiHost + '/api/content/report/post',
			story: apiHost + '/api/content/report/story'
		},
		admin: {
			post: apiHost + '/api/content/post/admin',
			story: apiHost + '/api/content/story/admin'
		}
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
		follow: apiHost + '/api/user-graph/followers',
		followed: apiHost + '/api/user-graph/following',
		pendingFollowers: apiHost + '/api/user-graph/followers/pending',
		mute: apiHost + '/api/user-graph/mute',
		muted: apiHost + '/api/user-graph/muted',
		block: apiHost + '/api/user-graph/block',
		blocked: apiHost + '/api/user-graph/blocked',
		blockedBy: apiHost + '/api/user-graph/blocked-by',
		closeFriends: apiHost + '/api/user-graph/close-friends'
	},
	notification: {
		base: apiHost + '/api/notification',
		ws: notificationHost + '/api/notification/ws'
	},
	verification: {
		base: apiHost + '/api/users/verification',
		categories: apiHost + '/api/users/verification/categories',
		admin: apiHost + '/api/users/verification/admin'
	},
	campaign: {
		base: apiHost + '/api/campaigns',
		longTerm: apiHost + '/api/campaigns/long-term',
		oneTime: apiHost + '/api/campaigns/one-time'
	}
};
