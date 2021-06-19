<template>
	<div class="mt-5">
		<v-select
			v-model="comment"
			:rules="commentRules"
			required
			:items="selectItems"
			item-text="text"
			item-value="value"
			label="Get notifications when you get comments from:"
			@change="update()"
		></v-select>
		<v-select
			v-model="likes"
			:rules="likesRules"
			required
			:items="selectItems"
			item-text="text"
			item-value="value"
			label="Get notifications when you get likes from:"
			@change="update()"
		></v-select>
		<v-select
			v-model="dislikes"
			:rules="dislikesRules"
			required
			:items="selectItems"
			item-text="text"
			item-value="value"
			label="Get notifications when you get dislikes from:"
			@change="update()"
		></v-select>
		<v-select
			v-model="shares"
			:rules="sharesRules"
			required
			:items="selectItems"
			item-text="text"
			item-value="value"
			label="Get notifications when you another user share your post from:"
			@change="update()"
		></v-select>
		<v-select
			v-model="photosOfMe"
			:rules="photosOfMeRules"
			required
			:items="selectItems"
			item-text="text"
			item-value="value"
			label="Get notifications when someone posts a photo of you from:"
			@change="update()"
		></v-select>
		<v-switch
			v-model="followerRequestNotificationEnabled"
			label="Get follower request notifications."
			@change="update()"
		></v-switch>
		<v-switch
			v-model="followRequestAcceptedNotificationEnabled"
			label="Get notifications when your follow request is accepted."
			@change="update()"
		></v-switch>
		<v-switch
			v-model="newFollowerNotificationEnabled"
			label="Get notifications when someone starts following you."
			@change="update()"
		></v-switch>
		<v-switch
			v-model="messageRequestNotificationEnabled"
			label="Get notifications on message requests."
			@change="update()"
		></v-switch>
		<v-switch
			v-model="messageNotificationEnabled"
			label="Get notifications on new messages."
			@change="update()"
		></v-switch>
	</div>
</template>

<script>
export default {
	name: 'NotificationPreferences',
	data: () => {
		return {
			likesRules: [
				v => ['OFF', 'PEOPLE_I_FOLLOW', 'EVERYONE'].includes(v) || 'Required'
			],
			dislikesRules: [
				v => ['OFF', 'PEOPLE_I_FOLLOW', 'EVERYONE'].includes(v) || 'Required'
			],
			sharesRules: [
				v => ['OFF', 'PEOPLE_I_FOLLOW', 'EVERYONE'].includes(v) || 'Required'
			],
			photosOfMeRules: [
				v => ['OFF', 'PEOPLE_I_FOLLOW', 'EVERYONE'].includes(v) || 'Required'
			],
			commentRules: [
				v => ['OFF', 'PEOPLE_I_FOLLOW', 'EVERYONE'].includes(v) || 'Required'
			],
			selectItems: [
				{ value: 'OFF', text: 'No one (Turn off)' },
				{ value: 'PEOPLE_I_FOLLOW', text: 'People I follow' },
				{ value: 'EVERYONE', text: 'Everyone' }
			]
		};
	},
	mounted() {
		this.$store.dispatch('getNotificationPreferences');
	},
	computed: {
		comment: {
			get() {
				return this.$store.getters.comment;
			},
			set(value) {
				return this.$store.commit('setComment', value);
			}
		},
		likes: {
			get() {
				return this.$store.getters.likes;
			},
			set(value) {
				return this.$store.commit('setLikes', value);
			}
		},
		dislikes: {
			get() {
				return this.$store.getters.dislikes;
			},
			set(value) {
				return this.$store.commit('setDislikes', value);
			}
		},
		shares: {
			get() {
				return this.$store.getters.shares;
			},
			set(value) {
				return this.$store.commit('setShares', value);
			}
		},
		photosOfMe: {
			get() {
				return this.$store.getters.photosOfMe;
			},
			set(value) {
				return this.$store.commit('setPhotosOfMe', value);
			}
		},
		followerRequestNotificationEnabled: {
			get() {
				return this.$store.getters.followerRequestNotificationEnabled;
			},
			set(value) {
				return this.$store.commit(
					'setFollowerRequestNotificationEnabled',
					value
				);
			}
		},
		followRequestAcceptedNotificationEnabled: {
			get() {
				return this.$store.getters.followRequestAcceptedNotificationEnabled;
			},
			set(value) {
				return this.$store.commit(
					'setFollowRequestAcceptedNotificationEnabled',
					value
				);
			}
		},
		newFollowerNotificationEnabled: {
			get() {
				return this.$store.getters.newFollowerNotificationEnabled;
			},
			set(value) {
				return this.$store.commit('setNewFollowerNotificationEnabled', value);
			}
		},
		messageRequestNotificationEnabled: {
			get() {
				return this.$store.getters.messageRequestNotificationEnabled;
			},
			set(value) {
				return this.$store.commit(
					'setMessageRequestNotificationEnabled',
					value
				);
			}
		},
		messageNotificationEnabled: {
			get() {
				return this.$store.getters.messageNotificationEnabled;
			},
			set(value) {
				return this.$store.commit('setMessageNotificationEnabled', value);
			}
		}
	},
	methods: {
		update() {
			this.$store.dispatch('updateNotificationPreferences');
		}
	}
};
</script>

<style scoped></style>
