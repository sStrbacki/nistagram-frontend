<template>
	<v-dialog v-model="postReportDialog" width="700">
		<v-card>
			<v-card-title>
				Report an inappropriate post.
			</v-card-title>
			<v-card-text>
				<v-row align="center" justify="center">
					<post-card-small :post="reportedPost" />
				</v-row>
				<v-row align="center" justify="center" class="mt-4">
					<v-col cols="8">
						<v-text-field
							v-model="reason"
							label="Reason"
							:rules="rules"
							hide-details="auto"
						></v-text-field>
					</v-col>
				</v-row>
				<v-row align="center" justify="center" class="mt-4">
					<v-btn depressed :disabled="!submitEnabled" @click="reportPost">
						Submit
					</v-btn>
				</v-row>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script>
import PostCardSmall from '../feed/PostCardSmall.vue';

export default {
	name: 'postReportDialog',
	components: { PostCardSmall },
	data: () => ({
		rules: [
			value => !!value || 'Required.',
			value => (value && value.length >= 3) || 'Min 3 characters'
		]
	}),
	methods: {
		reportPost() {
			this.$store.dispatch('reportPost');
			this.postReportDialog = !this.postReportDialog;
		}
	},
	computed: {
		submitEnabled() {
			return this.reason && this.reason.length >= 3;
		},
		postReportDialog: {
			get() {
				return this.$store.getters.postReportDialog;
			},
			set(value) {
				this.$store.commit('setPostReportDialog', value);
			}
		},
		reportedPost: {
			get() {
				return this.$store.getters.reportedPost;
			}
		},
		reason: {
			get() {
				return this.$store.getters.postReportReason;
			},
			set(value) {
				this.$store.commit('setPostReportReason', value);
			}
		}
	}
};
</script>

<style></style>
