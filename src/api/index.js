export const apiHost = 'https://localhost:9090';

export const api = {
	auth: {
		login: apiHost + '/api/auth'
	},
	user: {
		base: apiHost + '/api/users',
		register: apiHost + '/api/users/register',
		profile: apiHost + '/api/users/profile',
		preferences: apiHost + '/api/users/profile/preferences',
		privacyData: apiHost + '/api/users/profile/privacy',
		publicData: apiHost + '/api/users/public',
		taggable: apiHost + '/api/users/taggable'
	},
	content: {
		base: apiHost + '/api/content',
		postBase: apiHost + '/api/content/post',
		storyBase: apiHost + '/api/content/story',
		mediaStory: apiHost + '/api/content/story/media',
		postLike: apiHost + '/api/content/post/like',
		postDislike: apiHost + '/api/content/post/dislike',
		comment: apiHost + '/api/content/post/comment'
	},
	feed: {
		postFeed: apiHost + '/api/feed/posts',
		storyFeed: apiHost + '/api/feed/stories/grouped',
		closeFriendStoryFeed: apiHost + '/api/feed/stories/close/grouped'
	}
};
