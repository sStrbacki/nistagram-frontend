import {
	getNotificationPreferences,
	getPrivacyData,
	getProfile,
	updateNotificationPreferences,
	updatePrivacyData,
	updateProfile
} from '../../services/userService';
import { notifyError } from '../../services/notificationService';
import { getFollowerRequests } from '../../services/graphService';

export default {
	state: {
		personalData: {
			username: '',
			fullName: '',
			dateOfBirth: '',
			gender: '',
			phoneNumber: '',
			email: '',
			website: '',
			bio: ''
		},
		privacyData: {
			profilePrivate: '',
			messagesFromNonFollowersAllowed: '',
			taggable: ''
		},
		notificationPreferences: {
			comment: '',
			likes: '',
			photosOfMe: '',
			followerRequestNotificationEnabled: '',
			followRequestAcceptedNotificationEnabled: '',
			newFollowerNotificationEnabled: '',
			messageRequestNotificationEnabled: '',
			messageNotificationEnabled: ''
		},
		followerRequests: []
	},
	mutations: {
		setFullName: (state, fullName) => {
			state.personalData.fullName = fullName;
		},
		setDateOfBirth: (state, dateOfBirth) => {
			state.personalData.dateOfBirth = dateOfBirth;
		},
		setGender: (state, gender) => {
			state.personalData.gender = gender;
		},
		setPhoneNumber: (state, phoneNumber) => {
			state.personalData.phoneNumber = phoneNumber;
		},
		setEmail: (state, email) => {
			state.personalData.email = email;
		},
		setWebsite: (state, website) => {
			state.personalData.website = website;
		},
		setBio: (state, bio) => {
			state.personalData.bio = bio;
		},
		setPersonalData: (state, personalData) => {
			state.personalData = personalData;
		},
		setComment: (state, comment) => {
			state.notificationPreferences.comment = comment;
		},
		setLikes: (state, likes) => {
			state.notificationPreferences.likes = likes;
		},
		setPhotosOfMe: (state, photosOfMe) => {
			state.notificationPreferences.photosOfMe = photosOfMe;
		},
		setFollowerRequestNotificationEnabled: (
			state,
			followerRequestNotificationEnabled
		) => {
			state.notificationPreferences.followerRequestNotificationEnabled = followerRequestNotificationEnabled;
		},
		setFollowRequestAcceptedNotificationEnabled: (
			state,
			followRequestAcceptedNotificationEnabled
		) => {
			state.notificationPreferences.followRequestAcceptedNotificationEnabled = followRequestAcceptedNotificationEnabled;
		},
		setNewFollowerNotificationEnabled: (
			state,
			newFollowerNotificationEnabled
		) => {
			state.notificationPreferences.newFollowerNotificationEnabled = newFollowerNotificationEnabled;
		},
		setMessageRequestNotificationEnabled: (
			state,
			messageRequestNotificationEnabled
		) => {
			state.notificationPreferences.messageRequestNotificationEnabled = messageRequestNotificationEnabled;
		},
		setMessageNotificationEnabled: (state, messageNotificationEnabled) => {
			state.notificationPreferences.messageNotificationEnabled = messageNotificationEnabled;
		},
		setNotificationPreferences: (state, notificationPreferences) => {
			state.notificationPreferences = notificationPreferences;
		},
		setProfilePrivate: (state, profilePrivate) => {
			state.privacyData.profilePrivate = profilePrivate;
		},
		setMessagesFromNonFollowersAllowed: (
			state,
			messagesFromNonFollowersAllowed
		) => {
			state.privacyData.messagesFromNonFollowersAllowed = messagesFromNonFollowersAllowed;
		},
		setTaggable: (state, taggable) => {
			state.privacyData.taggable = taggable;
		},
		setPrivacyData: (state, privacyData) => {
			state.privacyData = privacyData;
		},
		setFollowerRequests: (state, requests) => {
			state.followerRequests = requests;
		}
	},
	actions: {
		getProfile: async ({ commit }) => {
			const response = await getProfile();
			if (response.status >= 400) {
				notifyError(response.data);
			} else {
				commit('setPersonalData', response.data);
			}
		},
		updateProfile: async context => {
			const response = await updateProfile(context.state.personalData);
			if (response.status >= 400) {
				notifyError(response.data);
			} else {
				context.commit('setPersonalData', response.data);
			}
		},
		getNotificationPreferences: async ({ commit }) => {
			const response = await getNotificationPreferences();
			if (response.status >= 400) {
				notifyError(response.data);
			} else {
				commit('setNotificationPreferences', response.data);
			}
		},
		updateNotificationPreferences: async context => {
			const response = await updateNotificationPreferences(
				context.state.notificationPreferences
			);
			if (response.status >= 400) {
				notifyError(response.data);
			} else {
				context.commit('setNotificationPreferences', response.data);
			}
		},
		getPrivacyData: async ({ commit }) => {
			const response = await getPrivacyData();
			if (response.status >= 400) {
				notifyError(response.data);
			} else {
				commit('setPrivacyData', response.data);
			}
		},
		updatePrivacyData: async context => {
			const response = await updatePrivacyData(context.state.privacyData);
			if (response.status >= 400) {
				notifyError(response.data);
			} else {
				context.commit('setPrivacyData', response.data);
			}
		},
		getFollowerRequests: async context => {
			const response = await getFollowerRequests(
				context.state.personalData.username
			);
			if (response.status >= 400) {
				notifyError(response.data);
			} else {
				context.commit('setFollowerRequests', response.data);
			}
		}
	},
	getters: {
		isLoggedIn: state => {
			return !(!state.personalData.username
				|| state.personalData.username === 'anonymousUser');
		},
		username: state => {
			return state.personalData.username;
		},
		fullName: state => {
			return state.personalData.fullName;
		},
		dateOfBirth: state => {
			return state.personalData.dateOfBirth;
		},
		gender: state => {
			return state.personalData.gender;
		},
		phoneNumber: state => {
			return state.personalData.phoneNumber;
		},
		email: state => {
			return state.personalData.email;
		},
		website: state => {
			return state.personalData.website;
		},
		bio: state => {
			return state.personalData.bio;
		},
		comment: state => {
			return state.notificationPreferences.comment;
		},
		likes: state => {
			return state.notificationPreferences.likes;
		},
		photosOfMe: state => {
			return state.notificationPreferences.photosOfMe;
		},
		followerRequestNotificationEnabled: state => {
			return state.notificationPreferences.followerRequestNotificationEnabled;
		},
		followRequestAcceptedNotificationEnabled: state => {
			return state.notificationPreferences
				.followRequestAcceptedNotificationEnabled;
		},
		newFollowerNotificationEnabled: state => {
			return state.notificationPreferences.newFollowerNotificationEnabled;
		},
		messageRequestNotificationEnabled: state => {
			return state.notificationPreferences.messageRequestNotificationEnabled;
		},
		messageNotificationEnabled: state => {
			return state.notificationPreferences.messageNotificationEnabled;
		},
		profilePrivate: state => {
			return state.privacyData.profilePrivate;
		},
		messagesFromNonFollowersAllowed: state => {
			return state.privacyData.messagesFromNonFollowersAllowed;
		},
		taggable: state => {
			return state.privacyData.taggable;
		},
		followerRequests: state => {
			return state.followerRequests;
		}
	}
};
