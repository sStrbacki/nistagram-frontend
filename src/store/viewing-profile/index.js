import {
	getProfileStats,
	getPublicData,
	isPrivate
} from '@/services/userService';
import { notifyError } from '@/services/notificationService';
import {
	getProfileHighlights,
	getProfileHighlightsPublic,
	getProfilePosts,
	getProfilePostsPublic
} from '@/services/contentService';
import {
	followProfile,
	isFollowingProfile,
	isPendingProfile,
	unfollowProfile,
	mute,
	unmute,
	hasMuted,
	block,
	blockedBy,
	hasBlocked,
	unblock
} from '@/services/graphService';

import router from '../../router/index';

export default {
	state: {
		viewingProfile: {
			username: '',
			fullName: '',
			bio: '',
			website: '',
			verified: null
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
		viewingProfilePrivate: null,
		viewingProfileMuted: null,
		viewingProfileBlocked: null,
		blockedByViewingProfile: null
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
		},
		setViewingProfileMuted: (state, value) => {
			state.viewingProfileMuted = value;
		},
		setViewingProfileBlocked: (state, value) => {
			state.viewingProfileBlocked = value;
		},
		setBlockedByViewingProfile: (state, value) => {
			state.blockedByViewingProfile = value;
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
		muteViewingProfile: async context => {
			const response = await mute(context.state.viewingProfile.username);

			if (response.status >= 400) notifyError(response.data);
			else context.commit('setViewingProfileMuted', true);
		},
		unmuteViewingProfile: async context => {
			const response = await unmute(context.state.viewingProfile.username);

			if (response.status >= 400) notifyError(response.data);
			else context.commit('setViewingProfileMuted', false);
		},
		getViewingProfileMuted: async (context, username) => {
			const response = await hasMuted(username);

			if (response.status >= 400) notifyError(response.data);
			else context.commit('setViewingProfileMuted', response.data.muted);
		},
		blockViewingProfile: async context => {
			const response = await block(context.state.viewingProfile.username);

			if (response.status >= 400) notifyError(response.data);
			else {
				context.commit('setViewingProfileBlocked', true);
				context.commit('setFollowingViewingProfile', false);
			}
		},
		unblockViewingProfile: async context => {
			const response = await unblock(context.state.viewingProfile.username);

			if (response.status >= 400) notifyError(response.data);
			else context.commit('setViewingProfileBlocked', false);
		},
		getViewingProfileBlocked: async (context, username) => {
			const response = await hasBlocked(username);

			if (response.status >= 400) notifyError(response.data);
			else context.commit('setViewingProfileBlocked', response.data.blocked);
		},
		getBlockedByViewingProfile: async (context, username) => {
			const response = await blockedBy(username);

			if (response.status >= 400) notifyError(response.data);
			else {
				context.commit('setBlockedByViewingProfile', response.data.blocked);
				if (response.data.blocked) router.push('home');
			}
		},
		followViewingProfile: async context => {
			const response = await followProfile(
				context.state.viewingProfile.username
			);
			if (response.status >= 400) {
				notifyError(response.data);
			} else {
				if (!context.getters.viewingProfilePrivate)
					context.commit('setFollowingViewingProfile', true);
				else context.commit('setPendingViewingProfile', true);
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
		},
		viewingProfileMuted: state => {
			return state.viewingProfileMuted;
		},
		viewingProfileBlocked: state => {
			return state.viewingProfileBlocked;
		},
		blockedByViewingProfile: state => {
			return state.blockedByViewingProfile;
		},
		viewingProfileVerified: state => {
			return state.viewingProfile.verified;
		}
	}
};
