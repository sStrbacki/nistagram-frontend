import {
	createPost,
	createReshareStory,
	createStory
} from '../../services/contentService';
import {
	getUploadUrls,
	uploadFiles,
	getUploadUrl,
	uploadFile
} from '../../services/storageService';
import { notifySuccess, notifyError } from '../../services/notificationService';

export default {
	state: {
		file: null,
		fileUrl: '',
		files: [],
		fileUrls: [],
		caption: '',
		location: {
			name: '',
			latitude: null,
			longitude: null
		},
		closeFriends: false,
		tags: [],
		reshareDialog: false,
		resharePost: null
	},
	mutations: {
		clearPostData: state => {
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
		clearStoryData: state => {
			state.file = null;
			state.fileUrl = '';
			state.caption = '';
			state.location = {
				name: '',
				latitude: null,
				longitude: null
			};
			state.resharePost = null;
		},
		clearReshareStoryData: state => {
			state.caption = '';
			state.location = {
				name: '',
				latitude: null,
				longitude: null
			};
		},
		setLongitude: (state, longitude) => {
			state.location.longitude = longitude;
		},
		setCloseFriends: (state, value) => {
			state.closeFriends = value;
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
		setFile: (state, file) => {
			state.file = file;
		},
		clearFiles: state => {
			state.files = [];
		},
		clearFile: state => {
			state.file = null;
		},
		clearUrls: state => {
			state.fileUrls = [];
		},
		clearUrl: state => {
			state.fileUrl = '';
		},
		addUploadedUrl: (state, url) => {
			state.fileUrls = [...state.fileUrls, url];
		},
		setUploadedUrl: (state, url) => {
			state.fileUrl = url;
		},
		addTag: (state, tag) => {
			state.tags = [...state.tags, tag];
		},
		removeTag: (state, tag) => {
			state.tags = state.tags.filter(t => {
				return t !== tag;
			});
		},
		setReshareDialog: (state, value) => {
			state.reshareDialog = value;
		},
		setResharePost: (state, value) => {
			state.resharePost = value;
		}
	},
	actions: {
		postFiles: async state => {
			state.commit('clearUrls');
			getUploadUrls(uploadFiles(state.getters.files)).then(urlPromises => {
				urlPromises.forEach(urlPromise => {
					urlPromise.then(url => state.commit('addUploadedUrl', url));
				});
			});
		},
		postFile: async state => {
			return getUploadUrl(uploadFile(state.getters.file)).then(url => {
				state.commit('setUploadedUrl', url);
			});
		},
		createPost: async state => {
			const post = {
				caption: state.getters.caption,
				mediaUrls: state.getters.fileUrls.map(fileUrl => {
					return { url: fileUrl };
				}),
				tags: state.getters.tags.map(tagEntry => {
					return { tag: tagEntry };
				})
			};
			if (state.getters.location.name) post.location = state.getters.location;

			const response = await createPost(post);
			if (response.status >= 400) notifyError(response.data);
			else notifySuccess('Post successfully created');
			state.commit('clearPostData');
		},
		createStory: async state => {
			const story = {
				mediaUrl: state.getters.fileUrl,
				caption: state.getters.caption,
				closeFriends: state.getters.closeFriends
			};
			if (state.getters.location.name) story.location = state.getters.location;
			const response = await createStory(story);
			if (response.status >= 400) notifyError(response.data);
			else notifySuccess('Story successfully created');
			state.commit('clearStoryData');
		},
		createReshareStory: async state => {
			const story = {
				postId: state.getters.resharePost.id,
				mediaUrl: state.getters.fileUrl,
				caption: state.getters.caption,
				closeFriends: state.getters.closeFriends
			};
			if (state.getters.location.name) story.location = state.getters.location;
			const response = await createReshareStory(story);
			if (response.status >= 400) notifyError(response.data);
			else notifySuccess('Story successfully created');
			state.commit('clearReshareStoryData');
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
		clearUrl: state => {
			state.commit('clearUrl');
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
		file: state => {
			return state.file;
		},
		fileUrl: state => {
			return state.fileUrl;
		},
		fileUrls: state => {
			return state.fileUrls;
		},
		caption: state => {
			return state.caption;
		},
		closeFriends: state => {
			return state.closeFriends;
		},
		location: state => {
			return state.location;
		},
		tags: state => {
			return state.tags;
		},
		isStoryDataValid: state => {
			return state.caption && state.fileUrl;
		},
		isPostDataValid: state => {
			return state.caption && state.fileUrls && state.fileUrls.length !== 0;
		},
		isReshareDataValid: state => {
			return state.caption && state.resharePost;
		},
		reshareDialog: state => {
			return state.reshareDialog;
		},
		resharePost: state => {
			return state.resharePost;
		}
	}
};
