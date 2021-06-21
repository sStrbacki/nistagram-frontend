import {
	createCollection,
	deleteCollection,
	fetchCollections,
	saveToCustomCollection,
	saveToDefaultCollection,
	fetchPostsFromDefault,
	fetchPostsFromCollection,
	deletePostFromDefaultCollection,
	deletePostFromCustomCollection
} from '../../services/contentService';
import { notifyError, notifySuccess } from '../../services/notificationService';
import router from '../../router/index';

export default {
	state: {
		collectionDialog: false,
		collections: [],
		selectedPostId: 0,
		newCollectionName: '',
		selectedCollection: '',
		posts: [],
		postsLoaded: false
	},
	mutations: {
		setCollectionDialog: (state, value) => {
			state.collectionDialog = value;
		},
		setCollections: (state, value) => {
			state.collections = value;
		},
		setCollectionName: (state, value) => {
			state.newCollectionName = value;
		},
		setSelectedCollection: (state, value) => {
			state.selectedCollection = value;
		},
		addCollection: (state, value) => {
			if (!state.collections) state.collections = [];
			state.collections = [...state.collections, { name: value }];
		},
		setSelectedPost: (state, value) => {
			state.selectedPostId = value;
		},
		deleteCollection: (state, collectionName) => {
			state.collections = state.collections.filter(collection => {
				return collection.name !== collectionName;
			});
		},
		setPosts: (state, posts) => {
			state.posts = posts;
		},
		setPostsLoaded: state => {
			state.postsLoaded = true;
		},
		deletePostFromCollection: (state, postId) => {
			state.posts = state.posts.filter(post => {
				return post.id !== postId;
			});
		}
	},
	actions: {
		createCollection: async state => {
			let res = await createCollection(state.getters.collectionName);
			if (res.status >= 400) notifyError(res.data);
			else state.commit('addCollection', state.getters.collectionName);
		},
		fetchCollections: async state => {
			let res = await fetchCollections();
			if (res.status >= 400) notifyError(res.data);
			else state.commit('setCollections', res.data);
		},
		fetchPostsFromDefaultCollection: async state => {
			let res = await fetchPostsFromDefault();
			if (res.status >= 400) router.push('/home/my-collections');
			else {
				state.commit('setPosts', res.data);
				state.commit('setPostsLoaded');
			}
		},
		fetchPostsFromCollection: async (state, collectionName) => {
			let res = await fetchPostsFromCollection(collectionName);
			if (res.status >= 400) router.push('/home/my-collections');
			else {
				state.commit('setPosts', res.data);
				state.commit('setPostsLoaded');
			}
		},
		saveToDefaultCollection: async state => {
			let res = await saveToDefaultCollection(state.getters.selectedPostId);
			if (res.status >= 400) notifyError(res.data);
			else notifySuccess('Post successfully saved!');
		},
		saveToCustomCollection: async (state, collectionName) => {
			let res = await saveToCustomCollection(
				state.getters.selectedPostId,
				collectionName
			);
			if (res.status >= 400) notifyError(res.data);
			else notifySuccess('Post successfully saved!');
		},
		deleteCollection: async (state, collectionName) => {
			let res = await deleteCollection(collectionName);
			if (res.status >= 400) notifyError(res.data);
			else state.commit('deleteCollection', collectionName);
		},
		removePostFromCollection: async (state, postId) => {
			let res;

			if (state.getters.selectedCollection === 'Default collection')
				res = await deletePostFromDefaultCollection(postId);
			else
				res = await deletePostFromCustomCollection(
					state.getters.selectedCollection,
					postId
				);

			if (res.status >= 400) notifyError(res.data);
			else state.commit('deletePostFromCollection', postId);
		}
	},
	getters: {
		collectionDialog: state => {
			return state.collectionDialog;
		},
		collectionName: state => {
			return state.newCollectionName;
		},
		collections: state => {
			return state.collections;
		},
		selectedPostId: state => {
			return state.selectedPostId;
		},
		collectionPosts: state => {
			return state.posts;
		},
		collectionPostsLoaded: state => {
			return state.postsLoaded;
		},
		selectedCollection: state => {
			return state.selectedCollection;
		}
	}
};
