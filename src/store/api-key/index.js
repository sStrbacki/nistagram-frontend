import {notifyError, notifySuccess} from '@/services/notificationService';
import {generateApiKey, getAgentApplication, getApiKey} from '@/services/apiKeyService';

export default {
    state: {
        data: {
            apiKey: '',
            apiKeyGenerated: false
        }
    },
    getters: {
        apiKey(state) {
            return state.data.apiKey;
        },
        apiKeyGenerated(state) {
            return state.data.apiKeyGenerated;
        }
    },
    actions: {
        async generateApiKey(context) {
            const appResponse = await getAgentApplication();
            generateApiKey(appResponse.data)
            .then(res => {
                context.commit('setApiKey', res.data);
                context.commit('setApiKeyGenerated', true);
            })
            .catch(err => notifyError(err.response.data));
        },
        async copyKeyToClipboard(context) {
            navigator.clipboard.writeText(context.getters.apiKey)
                .then(() => {
                    notifySuccess('API Key successfully copied to the clipboard.');
                })
        },
        async getApiKey(context) {
            getApiKey()
            .then(res => {
                context.commit('setApiKey', res.data);
                context.commit('setApiKeyGenerated', true);
            })
            .catch(err => {
                if (err.response.status === 404)
                    context.commit('setApiKeyGenerated', false);
                else
                    notifyError(err.response.data);
            })
        }
    },
    mutations: {
        setApiKey(state, value) {
            state.data.apiKey = value;
        },
        setApiKeyGenerated(state, value) {
            state.data.apiKeyGenerated = value;
        }
    }
}
