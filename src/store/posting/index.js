import { createPost } from '../../services/contentService';
import { getUploadUrls, upload } from '../../services/storageService';
import { notifySuccess, notifyError } from '../../services/notificationService';

export default {
	state: {
		files: [],
		fileUrls: [],
		caption: '',
		location: {
			name: '',
			latitude: null,
			longitude: null
		},
		tags: []
	},
	mutations: {
		clearData: state => {
			state.files = [];
			state.fileUrls = [];
			state.caption = '';
			state.location = {
				name: '',
				latitude: null,
				longitude: null
			};
			state.tags = [];
		},
		setLongitude: (state, longitude) => {
			state.location.longitude = longitude;
		},
		setLatitude: (state, latitude) => {
			state.location.latitude = latitude;
		},
		setLocationName: (state, locationName) => {
			state.location.name = locationName;
		},
		setLocation: (state, location) => {
			state.location = location;
		},
		setCaption: (state, caption) => {
			state.caption = caption;
		},
		setFiles: (state, files) => {
			state.files = files;
		},
		clearFiles: state => {
			state.files = [];
		},
		clearUrls: state => {
			state.fileUrls = [];
		},
		addUploadedUrl: (state, url) => {
			state.fileUrls = [...state.fileUrls, url];
		},
		addTag: (state, tag) => {
			state.tags = [...state.tags, tag];
		},
		removeTag: (state, tag) => {
			state.tags = state.tags.filter(t => {
				return t !== tag;
			});
		}
	},
	actions: {
		postFiles: async state => {
			state.commit('clearUrls');
			getUploadUrls(upload(state.getters.files)).then(urlPromises => {
				urlPromises.forEach(urlPromise => {
					urlPromise.then(url => state.commit('addUploadedUrl', url));
				});
			});
		},
		createPost: async state => {
			const post = {
				caption: state.getters.caption,
				location: state.getters.location,
				mediaUrls: state.getters.fileUrls.map(fileUrl => {
					return { url: fileUrl };
				}),
				tags: state.getters.tags.map(tagEntry => {
					return { tag: tagEntry };
				})
			};
			const response = await createPost(post);
			if (response.status >= 400) notifyError(response.data);
			else notifySuccess('Post successfully created');
			state.commit('clearData');
		},
		removeTag: (state, tag) => {
			state.commit('removeTag', tag);
		},
		addTag: (state, tag) => {
			state.commit('addTag', tag);
		},
		clearFiles: state => {
			state.commit('clearFiles');
		},
		clearUrls: state => {
			state.commit('clearUrls');
		},
		setLongitude: (state, longitude) => {
			state.commit('setLongitude', longitude);
		},
		setLatitude: (state, latitude) => {
			state.commit('setLatitude', latitude);
		},
		setLocationName: (state, locationName) => {
			state.commit('setLocationName', locationName);
		}
	},
	getters: {
		files: state => {
			return state.files;
		},
		fileUrls: state => {
			return state.fileUrls;
		},
		caption: state => {
			return state.caption;
		},
		location: state => {
			return state.location;
		},
		tags: state => {
			return state.tags;
		},
		isDataValid: state => {
			return (
				state.caption &&
				state.fileUrls &&
				state.fileUrls.length !== 0 &&
				state.location &&
				state.location.latitude &&
				state.location.longitude &&
				state.location.name &&
				state.tags &&
				state.tags.length !== 0
			);
		}
	}
};
