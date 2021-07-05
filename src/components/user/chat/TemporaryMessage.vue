<template>
	<v-row justify="center">
		<v-col cols="8">
			<v-row justify="center">
				<h2>Compose a temporary media message</h2>
			</v-row>
			<v-row v-if="fileUrl" align-content="center" justify="center">
				<v-col class="d-flex child-flex">
					<v-img
						:src="fileUrl"
						contain
						aspect-ratio="1"
						class="grey lighten-2"
						height="320px"
						v-if="!isVideo(fileUrl)"
					>
						<template v-slot:placeholder>
							<v-row class="fill-height ma-0" align="center" justify="center">
								<v-progress-circular
									indeterminate
									color="grey lighten-5"
								></v-progress-circular>
							</v-row>
						</template>
					</v-img>
					<video-player v-else>
						<source :src="fileUrl" />
					</video-player>
				</v-col>
			</v-row>
			<v-row justify="center">
				<user-search mode="recepientSearch" />
			</v-row>
			<v-row align="center" justify="center">
				<v-col cols="12" class="pl-0 pr-0">
					<v-form ref="mediaForm" v-model="valid" lazy-validation>
						<v-file-input
							v-model="file"
							color="deep-purple accent-4"
							counter
							label="Photo/Video"
							placeholder="Select your photo/video"
							prepend-icon="mdi-paperclip"
							:show-size="1000"
						>
							<template v-slot:selection="{ index, text }">
								<v-chip
									v-if="index < 2"
									color="deep-purple accent-4"
									dark
									label
									small
								>
									{{ text }}
								</v-chip>
							</template>
						</v-file-input>
					</v-form>
				</v-col>
			</v-row>
			<v-row justify="center">
				<v-btn :disabled="!submitEnabled" @click="send">
					Send
					<v-icon class="ml-2">mdi-send</v-icon>
				</v-btn>
			</v-row>
		</v-col>
	</v-row>
</template>

<script>
import UserSearch from '../../common/search/UserSearch.vue';
import { videoPlayer } from 'vue-md-player';
import 'vue-md-player/dist/vue-md-player.css';
export default {
	components: { UserSearch, videoPlayer },
	name: 'TemporaryMessage',
	data() {
		return {
			valid: null
		};
	},
	watch: {
		file(val) {
			if (val) this.$store.dispatch('postFile');
			else this.$store.dispatch('clearUrl');
		}
	},
	computed: {
		submitEnabled() {
			return this.fileUrl && this.$store.getters.userQuery;
		},
		fileUrl: {
			get() {
				return this.$store.getters.fileUrl;
			}
		},
		file: {
			get() {
				return this.$store.getters.file;
			},
			set(value) {
				this.$store.commit('setFile', value);
			}
		}
	},
	methods: {
		isVideo(url) {
			return url.includes('videos');
		},
		async send() {
			await this.$store.dispatch('pushTemporaryMessage');
			this.$refs.mediaForm.reset();
			this.$refs.mediaForm.resetValidation();
		}
	}
};
</script>

<style></style>
