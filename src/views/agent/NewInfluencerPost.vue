<template>
	<v-container>
		<v-row v-if="fileUrls" align-content="center" justify="center">
			<h1>Request influencer</h1>
			<v-col
				v-for="(url, index) in fileUrls"
				:key="index"
				class="d-flex child-flex"
				cols="4"
			>
				<v-img
					:src="url"
					contain
					aspect-ratio="1"
					class="grey lighten-2"
					height="320px"
					v-if="!isVideo(url)"
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
					<source :src="url" />
				</video-player>
			</v-col>
		</v-row>
		<v-row align="center" justify="center">
			<v-col cols="8">
				<v-form ref="postForm" v-model="valid" lazy-validation>
					<v-file-input
						v-model="files"
						color="deep-purple accent-4"
						counter
						multiple
						label="Photo(s)/Video(s)"
						accept="image/*,video/*"
						placeholder="Select your photo(s)/video(s)"
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

							<span
								v-else-if="index === 2"
								class="text-overline grey--text text--darken-3 mx-2"
							>
								+{{ files.length - 2 }} File(s)
							</span>
						</template>
					</v-file-input>

					<v-text-field
						v-model="username"
						:rules="[v => !!v || 'Influencer\'s username is required']"
						label="Influencer username"
						required
						prepend-icon="mdi-account"
					></v-text-field>

					<v-text-field
						v-model="caption"
						:rules="[v => !!v || 'Caption is required']"
						label="Caption"
						required
						prepend-icon="mdi-comma-box-outline"
					></v-text-field>
				</v-form>
			</v-col>
		</v-row>
		<v-row justify="center" class="mt-2">
			<v-col cols="1">
				<v-row>
					<v-btn color="success" :disabled="!isValid" @click="post">
						Post
					</v-btn>
				</v-row>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	import { videoPlayer } from 'vue-md-player';

	export default {
		name: 'NewInfluencerPost',
		components: { videoPlayer },
		data() {
			return {
				valid: null,
				searchLocations: '',
				searchTaggableUsers: '',
				locationName: null,
				locationResponses: [],
				service: null,
				geocoder: null,
				isLocationLoading: false,
				areUsersLoading: false,
				selectedUser: null
			};
		},
		methods: {
			isVideo(url) {
				return url.includes('videos');
			},
			// eslint-disable-next-line no-unused-vars
			select(result) {
				this.geocoder.geocode({ address: this.locationName }, (res, status) => {
					if (status === window.google.maps.GeocoderStatus.OK) {
						const responseLocation = res[0];
						const coordinates = responseLocation.geometry.location;

						this.$store.dispatch('setLatitude', coordinates.lat());
						this.$store.dispatch('setLongitude', coordinates.lng());
						this.$store.dispatch(
							'setLocationName',
							responseLocation.formatted_address
						);
					}
				});
			},
			async post() {
				await this.$store.dispatch('createInfluencerPost');
				this.$refs.postForm.reset();
				this.$refs.postForm.resetValidation();
			}
		},
		watch: {
			files(val) {
				if (val) {
					if (val.length == 0) this.$store.dispatch('clearUrls');
					else this.$store.dispatch('postFiles');
				}
			},
		},
		computed: {
			isValid: {
				get() {
					return this.$store.getters.isPostDataValid;
				}
			},
			fileUrls: {
				get() {
					return this.$store.getters.fileUrls;
				}
			},
			files: {
				get() {
					return this.$store.getters.files;
				},
				set(value) {
					this.$store.commit('setFiles', value);
				}
			},
			username: {
				get() {
					return this.$store.getters.influencerUsername;
				},
				set(value) {
					this.$store.commit('setInfluencerUsername', value);
				}
			},
			caption: {
				get() {
					return this.$store.getters.caption;
				},
				set(value) {
					this.$store.commit('setCaption', value);
				}
			}
		}
	};
</script>

<style scoped>

</style>
