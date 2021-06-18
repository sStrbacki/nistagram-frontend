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
						<v-col
							@click="reroute(notification)"
							class="notification"
							cols="10"
						>
							<v-icon>
								{{ notificationIcon(notification.notificationType) }}
							</v-icon>
							{{ notification.text }}
						</v-col>
						<v-col
							cols="1"
							class="notification ml-5"
							@click="hide(notification.id)"
						>
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
			switch (notificationType) {
				case 'NEW_LIKE':
					return 'mdi-thumb-up';
				case 'NEW_COMMENT':
					return 'mdi-comment';
				case 'USER_TAGGED':
					return 'mdi-tag';
				case 'NEW_FOLLOW_REQUEST':
					return 'mdi-account-question';
				case 'FOLLOW_REQUEST_ACCEPTED':
					return 'mdi-account-check';
				case 'NEW_FOLLOWER':
					return 'mdi-account-plus';
				default:
					return 'mdi-help-circle';
			}
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
