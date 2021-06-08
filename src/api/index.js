export const apiHost = 'http://localhost:9090';

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
	}
};
