<template>
	<v-container>
		<v-row class="content-wrap" justify="center">
			<h1>Receieved content reports</h1>
		</v-row>
		<v-row
			v-if="postReports.length == 0 && storyReports.length == 0"
			justify="center"
		>
			<v-alert border="top" colored-border type="info" elevation="2">
				There are no content reports at the moment
			</v-alert>
		</v-row>
		<v-row justify="center" class="mt-6" v-if="postReports.length !== 0">
			<h3>Post reports:</h3>
		</v-row>
		<v-row class="mt-6" justify="center">
			<v-card tile min-width="650">
				<v-list-item v-for="postReport in postReports" :key="postReport.id">
					<v-list-item-content>
						<v-list-item-title>
							<v-row>
								<v-col cols="2">
									<v-icon>mdi-account-circle</v-icon>
								</v-col>
								<v-col class="mt-1" cols="2">
									{{ postReport.reportedBy }}
								</v-col>
							</v-row>
						</v-list-item-title>
						<v-list-item-subtitle class="mt-2">
							<v-row>
								<v-col cols="2">
									<v-icon>mdi-calendar</v-icon>
								</v-col>
								<v-col class="mt-1" cols="2">
									{{ formatDate(postReport.creationDate) }}
								</v-col>
							</v-row>
						</v-list-item-subtitle>
						<v-list-item-subtitle class="mt-2">
							<v-row>
								<v-col cols="2">
									<v-icon>mdi-comment</v-icon>
								</v-col>
								<v-col class="mt-1" cols="2">
									{{ postReport.reason }}
								</v-col>
							</v-row>
						</v-list-item-subtitle>
					</v-list-item-content>
					<v-list-item-action>
						<v-btn text @click="previewReportedPost(postReport.postId)">
							Inspect reported post
						</v-btn>
					</v-list-item-action>
				</v-list-item>
			</v-card>
		</v-row>
		<v-row justify="center" class="mt-6" v-if="storyReports.length !== 0">
			<h3>Story reports:</h3>
		</v-row>
		<v-row class="mt-6" justify="center">
			<v-card tile min-width="650">
				<v-list-item v-for="storyReport in storyReports" :key="storyReport.id">
					<v-list-item-content>
						<v-list-item-title>
							<v-row>
								<v-col cols="2">
									<v-icon>mdi-account-circle</v-icon>
								</v-col>
								<v-col class="mt-1">
									{{ storyReport.reportedBy }}
								</v-col>
							</v-row>
						</v-list-item-title>
						<v-list-item-subtitle class="mt-2">
							<v-row>
								<v-col cols="2">
									<v-icon>mdi-calendar</v-icon>
								</v-col>
								<v-col class="mt-1">
									{{ formatDate(storyReport.creationDate) }}
								</v-col>
							</v-row>
						</v-list-item-subtitle>
						<v-list-item-subtitle class="mt-2">
							<v-row>
								<v-col cols="2">
									<v-icon>mdi-comment</v-icon>
								</v-col>
								<v-col class="mt-1">
									{{ storyReport.reason }}
								</v-col>
							</v-row>
						</v-list-item-subtitle>
					</v-list-item-content>
					<v-btn text @click="previewReportedStory(storyReport.storyId)">
						Inspect reported story
					</v-btn>
				</v-list-item>
			</v-card>
		</v-row>
	</v-container>
</template>

<script>
import moment from 'moment';
export default {
	name: 'ReportsView',
	computed: {
		postReports: {
			get() {
				return this.$store.getters.postReports;
			}
		},
		storyReports: {
			get() {
				return this.$store.getters.storyReports;
			}
		}
	},
	methods: {
		formatDate(date) {
			let dateMoment = moment(date);
			return dateMoment.format('MM-DD-YYYY HH:mm');
		},
		previewReportedPost(postId) {
			this.$router.push({ name: 'ReportedPost', params: { postId: postId } });
		},
		previewReportedStory(storyId) {
			this.$router.push({
				name: 'ReportedStory',
				params: { storyId: storyId }
			});
		}
	},
	async mounted() {
		await this.$store.dispatch('getAllPostReports');
		await this.$store.dispatch('getAllStoryReports');
	}
};
</script>

<style></style>
