<template>
	<v-menu left bottom>
		<template v-slot:activator="{ on, attrs }">
			<v-btn icon v-bind="attrs" v-on="on">
				<v-badge
					:content="notificationCount"
					:value="notificationCount"
					overlap
				>
					<v-icon>mdi-bell</v-icon>
				</v-badge>
			</v-btn>
		</template>

		<v-list>
			<v-list-item v-for="notification in notifications" :key="notification.id">
				<v-list-item-title>
					<v-row>
						<v-col @click="reroute(notification)" class="notification">
							<v-icon>
								{{ notificationIcon(notification.notificationType) }}
							</v-icon>
							{{ notification.text }}
						</v-col>
						<v-col cols="1" class="notification" @click="hide(notification.id)">
							<v-icon>
								mdi-close
							</v-icon>
						</v-col>
					</v-row>
				</v-list-item-title>
			</v-list-item>
		</v-list>
	</v-menu>
</template>

<script>
export default {
	name: 'NotificationsDropdown',
	computed: {
		notificationCount() {
			return this.notifications.length;
		},

		notifications: {
			get() {
				return this.$store.getters.notifications;
			}
		}
	},
	methods: {
		notificationIcon(notificationType) {
			if (notificationType === 'NEW_LIKE') return 'mdi-thumb-up';
			else if (notificationType === 'NEW_COMMENT') return 'mdi-comment';
			else return 'mdi-tag';
		},
		async hide(notificationId) {
			await this.$store.dispatch('hideNotification', notificationId);
		},
		reroute(notification) {
			if (
				notification.notificationType == 'NEW_LIKE' ||
				notification.notificationType == 'NEW_COMMENT' ||
				notification.notificationType == 'USER_TAGGED'
			)
				this.$router.push({
					name: 'PostPreview',
					params: { postId: notification.contentId }
				});
		}
	}
};
</script>

<style scoped>
.notification {
	cursor: pointer;
}
</style>
