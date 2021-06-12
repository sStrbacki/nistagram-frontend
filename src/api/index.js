export const apiHost = 'http://localhost:9090';

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
		taggable: apiHost + '/api/users/taggable'
	},
	content: {
		base: apiHost + '/api/content',
		postBase: apiHost + '/api/content/post',
		storyBase: apiHost + '/api/content/story',
		mediaStory: apiHost + '/api/content/story/media'
	}
};
