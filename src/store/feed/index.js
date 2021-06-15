/* eslint-disable no-unused-vars */
import {
	fetchPostFeed,
	fetchStoryFeed,
	fetchCloseFriendStoryFeed
} from '../../services/feedService';

import {
	postLike,
	postDislike,
	deleteDislike,
	deleteLike
} from '../../services/contentService';

import { getPostById, getStoryById } from '../../services/contentService';

import { notifyError } from '../../services/notificationService';

export default {
	state: {
		posts: [],
		postsLoaded: false,
		storyGroups: [],
		closeFriendStoryGroups: []
	},
	mutations: {
		setPosts: (state, posts) => {
			state.posts = posts;
		},
		setCloseFriendStoryGroups: (state, closeFriendStoryGroups) => {
			state.closeFriendStoryGroups = closeFriendStoryGroups;
		},
		setStoryGroups: (state, storyGroups) => {
			state.storyGroups = storyGroups;
		},
		setCloseFriendStores: (state, closeFriendStories) => {
			state.closeFriendStories = closeFriendStories;
		},
		setPostsLoaded: state => {
			state.postsLoaded = true;
		},
		assignPostData: (state, postInfo) => {
			state.posts.filter(post => {
				return post.contentId == postInfo.postId;
			})[0].postData = postInfo.postData;
		}
	},
	actions: {
		fetchPosts: async state => {
			let response = await fetchPostFeed();
			if (response.status >= 400) {
				notifyError(response.data);
				return;
			}
			state.commit('setPosts', response.data);
			await state.dispatch('fetchPostData');
		},
		fetchPostData: async state => {
			for (const post of state.getters.posts) {
				let response = await getPostById(post.contentId);
				if (response.status >= 400) notifyError(response.data);
				else {
					state.commit('assignPostData', {
						postId: post.contentId,
						postData: response.data
					});
				}
				state.commit('setPostsLoaded');
			}
		},
		fetchStories: async state => {
			let response = await fetchStoryFeed();
			if (response.status >= 400) {
				notifyError(response.data);
				return;
			}
			state.commit('setStoryGroups', response.data);
			state.dispatch('fetchStoryData');
		},
		fetchStoryData: async state => {
			state.getters.storyGroups.forEach(async storyGroup => {
				storyGroup.entries.forEach(async entry => {
					let response = await getStoryById(entry.contentId);
					if (response.status >= 400) notifyError(response.data);
					else entry.storyData = response.data;
				});
			});
		},
		fetchCloseFriendStories: async state => {
			let response = await fetchCloseFriendStoryFeed();
			if (response.status >= 400) {
				notifyError(response.data);
				return;
			}
			state.commit('setCloseFriendStoryGroups', response.data);
			state.dispatch('fetchCloseFriendStoryData');
		},
		fetchCloseFriendStoryData: async state => {
			state.getters.closeFriendStoryGroups.forEach(async storyGroup => {
				storyGroup.entries.forEach(async entry => {
					let response = await getStoryById(entry.contentId);
					if (response.status >= 400) notifyError(response.data);
					else entry.storyData = response.data;
				});
			});
		},
		like: async (state, postId) => {
			let response = await postLike(postId);
			if (response.status >= 400) notifyError(response.data);
		},
		dislike: async (state, postId) => {
			let response = await postDislike(postId);
			if (response.status >= 400) notifyError(response.data);
		},
		deleteLike: async (state, postId) => {
			let response = await deleteLike(postId);
			if (response.status >= 400) notifyError(response.data);
		},
		deleteDislike: async (state, postId) => {
			let response = await deleteDislike(postId);
			if (response.status >= 400) notifyError(response.data);
		}
	},

	getters: {
		posts: state => {
			return state.posts;
		},
		storyGroups: state => {
			return state.storyGroups;
		},
		closeFriendStoryGroups: state => {
			return state.closeFriendStoryGroups;
		}
	}
};
