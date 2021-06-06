export const apiHost = 'http://localhost:9090';

export const api = {
    auth: {
        login: apiHost + '/api/auth',
    },
    user: {
        register: apiHost + '/api/users/register',
        profile: apiHost + '/api/users/profile',
        preferences: apiHost + '/api/users/profile/preferences'
    }
}
