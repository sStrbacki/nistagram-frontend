import {
	getProfileStats,
	getPublicData,
	isPrivate
} from '@/services/userService';
import { notifyError } from '@/services/notificationService';
import {
	getProfileHighlights, getProfileHighlightsPublic,
	getProfilePosts, getProfilePostsPublic
} from '@/services/contentService';
import {
	followProfile,
	isFollowingProfile,
	isPendingProfile,
	unfollowProfile
} from '@/services/graphService';

export default {
	state: {
		viewingProfile: {
			username: '',
			fullName: '',
			bio: '',
			website: ''
		},
		viewingProfileStats: {
			following: '',
			followers: '',
			postCount: ''
		},
		viewingProfilePosts: [],
		viewingProfileHighlights: [],
		followingViewingProfile: null,
		pendingViewingProfile: null,
		viewingProfilePrivate: null
	},
	mutations: {
		setViewingProfile: (state, publicData) => {
			state.viewingProfile = {
				username: '',
				fullName: '',
				bio: '',
				website: ''
			};
			state.viewingProfile = publicData;
		},
		setViewingProfilePosts: (state, posts) => {
			state.viewingProfilePosts = posts;
		},
		setFollowingViewingProfile: (state, following) => {
			state.followingViewingProfile = following;
		},
		setPendingViewingProfile: (state, pending) => {
			state.pendingViewingProfile = pending;
		},
		setViewingProfilePrivate: (state, profilePrivate) => {
			state.viewingProfilePrivate = profilePrivate;
		},
		setViewingProfileStats: (state, stats) => {
			state.viewingProfileStats = stats;
		},
		setViewingProfileHighlights: (state, highlights) => {
			state.viewingProfileHighlights = highlights;
		}
	},
	actions: {
		getViewingProfile: async (context, username) => {
			const response = await getPublicData(username);
			if (response.status >= 400) {
				notifyError(response.data);
			} else {
				context.commit('setViewingProfile', response.data);
			}
		},
		getViewingProfilePosts: async (context, username) => {
			const response = await getProfilePosts(username);
			if (response.status >= 400) {
				console.log(response.data);
			} else {
				context.commit('setViewingProfilePosts', response.data);
			}
		},
		getViewingProfilePostsPublic: async (context, username) => {
			const response = await getProfilePostsPublic(username);
			if (response.status >= 400) {
				console.log(response.data);
			} else {
				context.commit('setViewingProfilePosts', response.data);
			}
		},
		getFollowingViewingProfile: async (context, username) => {
			const response = await isFollowingProfile(username);
			if (response.status >= 400) {
				notifyError(response.data);
			} else {
				context.commit('setFollowingViewingProfile', response.data.following);
			}
		},
		getPendingViewingProfile: async (context, username) => {
			const response = await isPendingProfile(username);
			if (response.status >= 400) {
				notifyError(response.data);
			} else {
				context.commit('setPendingViewingProfile', response.data.following);
			}
		},
		followViewingProfile: async context => {
			const response = await followProfile(
				context.state.viewingProfile.username
			);
			if (response.status >= 400) {
				notifyError(response.data);
			} else {
				context.commit('setPendingViewingProfile', true);
			}
		},
		unfollowViewingProfile: async context => {
			const response = await unfollowProfile(
				context.state.viewingProfile.username
			);
			if (response.status >= 400) {
				notifyError(response.data);
			} else {
				context.commit('setFollowingViewingProfile', false);
			}
		},
		getViewingProfilePrivate: async (context, username) => {
			const response = await isPrivate(username);
			if (response.status >= 400) {
				notifyError(response.data);
			} else {
				context.commit(
					'setViewingProfilePrivate',
					response.data.profilePrivate
				);
			}
		},
		getViewingProfileStats: async (context, username) => {
			const response = await getProfileStats(username);
			if (response.status >= 400) {
				notifyError(response.data);
			} else {
				context.commit('setViewingProfileStats', response.data);
			}
		},
		getViewingProfileHighlights: async (context, username) => {
			const response = await getProfileHighlights(username);
			if (response.status >= 400) {
				console.log(response.data);
			} else {
				context.commit('setViewingProfileHighlights', response.data);
			}
		},
		getViewingProfileHighlightsPublic: async (context, username) => {
			const response = await getProfileHighlightsPublic(username);
			if (response.status >= 400) {
				console.log(response.data);
			} else {
				context.commit('setViewingProfileHighlights', response.data);
			}
		}
	},
	getters: {
		viewingProfileUsername: state => {
			return state.viewingProfile.username;
		},
		viewingProfileFullName: state => {
			return state.viewingProfile.fullName;
		},
		viewingProfileBio: state => {
			return state.viewingProfile.bio;
		},
		viewingProfileWebsite: state => {
			return state.viewingProfile.website;
		},
		viewingProfilePosts: state => {
			return state.viewingProfilePosts;
		},
		followingViewingProfile: state => {
			return state.followingViewingProfile;
		},
		pendingViewingProfile: state => {
			return state.pendingViewingProfile;
		},
		viewingProfilePrivate: state => {
			return state.viewingProfilePrivate;
		},
		viewingProfileStats: state => {
			return state.viewingProfileStats;
		},
		viewingProfileHighlights: state => {
			return state.viewingProfileHighlights;
		}
	}
};
