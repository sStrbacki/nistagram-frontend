<template>
	<v-card class="mx-auto" min-width="344" max-width="344" v-if="data">
		<v-img
			v-if="!isVideo(data.mediaUrls[0])"
			:src="data.mediaUrls[0]"
			height="200px"
		>
			<v-icon
				v-if="data.mediaUrls.length > 1"
				dark
				fab
				top
				left
				color="gray"
				class="mt-2 ml-2"
			>
				mdi-image-multiple
			</v-icon>
		</v-img>
		<video-player v-else>
			<source :src="data.mediaUrls[0]" />
		</video-player>

		<v-card-title>
			<v-row>
				<v-col cols="1">
					<v-icon dark>
						mdi-account-circle
					</v-icon>
				</v-col>
				<v-col class="subtitle-2 mt-2">
					<p>{{ data.author }}</p>
				</v-col>
				<v-col cols="2">
					<v-menu bottom right open-on-hover transition="slide-x-transition">
						<template v-slot:activator="{ on, attrs }">
							<v-btn icon v-bind="attrs" v-on="on">
								<v-icon>mdi-dots-vertical</v-icon>
							</v-btn>
						</template>

						<v-list class="text-h5">
							<v-list-item class="list-item">
								<v-list-item-icon>
									<v-icon>mdi-content-save</v-icon>
								</v-list-item-icon>

								<v-list-item-content>
									<v-list-item-title>Save</v-list-item-title>
								</v-list-item-content>
							</v-list-item>

							<v-list-item class="list-item">
								<v-list-item-icon>
									<v-icon>mdi-alert</v-icon>
								</v-list-item-icon>

								<v-list-item-content>
									<v-list-item-title>Report</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
						</v-list>
					</v-menu>
				</v-col>
			</v-row>
		</v-card-title>

		<v-card-subtitle>
			<v-row no-gutters>
				<v-col>
					{{ data.caption }}
				</v-col>
				<v-col cols="1" class="mr-2">
					<v-btn icon small color="primary">
						<v-icon dark>
							mdi-thumb-up
						</v-icon>
					</v-btn>
				</v-col>
				<v-col cols="1">
					<v-btn icon small color="error">
						<v-icon dark>
							mdi-thumb-down
						</v-icon>
					</v-btn>
				</v-col>
			</v-row>
		</v-card-subtitle>

		<v-card-actions>
			<v-btn color="orange lighten-2" text>
				See More
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import { videoPlayer } from 'vue-md-player';
import 'vue-md-player/dist/vue-md-player.css';
export default {
	name: 'PostCard',
	props: {
		data: Object
	},
	components: { videoPlayer },
	methods: {
		isVideo(url) {
			return url.includes('videos');
		}
	}
};
</script>

<style>
.list-item {
	cursor: pointer;
}
.player-container {
	height: 200px !important;
}
</style>
