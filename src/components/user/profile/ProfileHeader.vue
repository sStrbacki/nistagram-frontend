<template>
	<div class="d-flex flex-wrap justify-center">
		<div class="d-flex flex-column">
			<v-col
				id="profile-username-div"
				class="d-flex flex-wrap justify-space-between"
			>
				<h2 class="d-inline mr-10 align-center">
					{{ username }}
					<v-icon v-if="verified" color="primary">mdi-check-decagram</v-icon>
				</h2>
				<div
					v-if="
						username !== currentUser &&
							pending !== null &&
							following !== null &&
							!blocked
					"
				>
					<v-btn
						rounded
						color="blue accent-2"
						v-if="following"
						@click="unfollow()"
						>Unfollow</v-btn
					>
					<v-btn rounded color="blue accent-1" disabled v-else-if="pending"
						>Pending</v-btn
					>
					<v-btn rounded color="blue accent-1" v-else @click="follow()"
						>Follow</v-btn
					>
				</div>
				<div
					v-if="username !== currentUser && following && !blocked"
					class="ml-2"
				>
					<v-btn rounded color="yellow accent-1" v-if="muted" @click="unmute()"
						>Unmute</v-btn
					>
					<v-btn rounded color="yellow " v-else @click="mute()">Mute</v-btn>
				</div>
				<div v-if="username !== currentUser" class="ml-2">
					<v-btn rounded color="red accent-1" v-if="blocked" @click="unblock()"
						>Unblock</v-btn
					>
					<v-btn rounded color="red accent-2" v-else @click="block()"
						>Block</v-btn
					>
				</div>
			</v-col>
			<v-col
				class="d-none d-sm-flex justify-space-between"
				id="profile-stats-div"
			>
				<span class="mx-1">{{ postCount }} posts</span>
				<span class="mx-1">{{ followersCount }} followers</span>
				<span class="mx-1">{{ followingCount }} following</span>
			</v-col>
			<v-col id="personal-info-div">
				<h4>{{ fullName }}</h4>
				<div>{{ bio }}</div>
				<a class="text-truncate" v-bind:href="website">{{ website }}</a>
			</v-col>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ProfileHeader.vue',
	methods: {
		unfollow() {
			this.$store.dispatch('unfollowViewingProfile');
		},
		follow() {
			this.$store.dispatch('followViewingProfile');
		},
		mute() {
			this.$store.dispatch('muteViewingProfile');
		},
		unmute() {
			this.$store.dispatch('unmuteViewingProfile');
		},
		block() {
			this.$store.dispatch('blockViewingProfile');
		},
		unblock() {
			this.$store.dispatch('unblockViewingProfile');
		}
	},
	computed: {
		username: {
			get() {
				return this.$route.params.username;
			}
		},
		currentUser: {
			get() {
				return this.$store.getters.username;
			}
		},
		fullName: {
			get() {
				return this.$store.getters.viewingProfileFullName;
			}
		},
		bio: {
			get() {
				return this.$store.getters.viewingProfileBio;
			}
		},
		website: {
			get() {
				return this.$store.getters.viewingProfileWebsite;
			}
		},
		following: {
			get() {
				return this.$store.getters.followingViewingProfile;
			}
		},
		pending: {
			get() {
				return this.$store.getters.pendingViewingProfile;
			}
		},
		blocked: {
			get() {
				return this.$store.getters.viewingProfileBlocked;
			}
		},
		muted: {
			get() {
				return this.$store.getters.viewingProfileMuted;
			}
		},
		postCount: {
			get() {
				return this.$store.getters.viewingProfileStats.postCount;
			}
		},
		followersCount: {
			get() {
				return this.$store.getters.viewingProfileStats.followers;
			}
		},
		followingCount: {
			get() {
				return this.$store.getters.viewingProfileStats.following;
			}
		},
		verified: {
			get() {
				return this.$store.getters.viewingProfileVerified;
			}
		}
	}
};
</script>

<style scoped>
#profile-picture {
	max-width: 180px;
	max-height: 180px;
}
</style>
