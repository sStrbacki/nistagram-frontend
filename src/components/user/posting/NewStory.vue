<template>
	<v-container>
		<v-row v-if="fileUrl" align-content="center" justify="center">
			<v-col class="d-flex child-flex" cols="4">
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
		<v-row align="center" justify="center">
			<v-col cols="8">
				<v-form ref="storyForm" v-model="valid" lazy-validation>
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

					<v-text-field
						v-model="caption"
						:rules="[v => !!v || 'Caption is required']"
						label="Caption"
						required
						prepend-icon="mdi-comma-box-outline"
					></v-text-field>

					<v-autocomplete
						v-model="locationName"
						:items="locations"
						:loading="isLocationLoading"
						:search-input.sync="searchLocations"
						color="white"
						hide-no-data
						hide-selected
						label="Location"
						placeholder="Start typing to find location..."
						prepend-icon="mdi-map-marker"
						return-object
					></v-autocomplete>
					<v-switch
						v-model="closeFriends"
						flat
						:label="closeFriends ? 'Close friends only' : 'Public'"
					></v-switch>
				</v-form>
			</v-col>
		</v-row>
		<v-row justify="center" align="center" class="mt-2">
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
import 'vue-md-player/dist/vue-md-player.css';
export default {
	name: 'NewStory',
	components: { videoPlayer },
	data() {
		return {
			valid: null,
			searchLocations: '',
			locationName: null,
			locationResponses: [],
			service: null,
			geocoder: null,
			isLocationLoading: false
		};
	},
	metaInfo() {
		return {
			script: [
				{
					src: `https://maps.googleapis.com/maps/api/js?key=${process.env.VUE_APP_PLACES_API_KEY}&libraries=places`,
					async: true,
					defer: true,
					callback: () => this.mapsInit()
				}
			]
		};
	},
	watch: {
		file(val) {
			if (val) this.$store.dispatch('postFile');
			else this.$store.dispatch('clearUrl');
		},
		searchLocations(val) {
			if (val) {
				if (this.isLocationLoading) return;

				this.isLocationLoading = true;

				this.service
					.getPlacePredictions({
						input: val
					})
					.then(res => {
						this.displaySuggestions(res.predictions);
						this.isLocationLoading = false;
					})
					.finally(() => (this.isLoading = false));
			}
		},
		locationName(val) {
			if (val) {
				this.select(val);
			}
		}
	},
	computed: {
		isValid: {
			get() {
				return this.$store.getters.isStoryDataValid;
			}
		},
		caption: {
			get() {
				return this.$store.getters.caption;
			},
			set(value) {
				this.$store.commit('setCaption', value);
			}
		},
		closeFriends: {
			get() {
				return this.$store.getters.closeFriends;
			},
			set(value) {
				this.$store.commit('setCloseFriends', value);
			}
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
		},
		locations() {
			return this.locationResponses.map(locationResponse => {
				return locationResponse.description;
			});
		}
	},
	methods: {
		mapsInit() {
			this.service = new window.google.maps.places.AutocompleteService();
			this.geocoder = new window.google.maps.Geocoder();
		},
		displaySuggestions(predictions) {
			this.locationResponses = predictions;
		},
		isVideo(url) {
			return url.includes('videos');
		},
		select(result) {
			this.geocoder.geocode({ address: this.locationName }, (res, status) => {
				if (status == window.google.maps.GeocoderStatus.OK) {
					this.$store.dispatch('setLatitude', res[0].geometry.location.lat());
					this.$store.dispatch('setLongitude', res[0].geometry.location.lng());
					this.$store.dispatch('setLocationName', result);
				}
			});
		},
		async post() {
			await this.$store.dispatch('createStory');
			this.$refs.storyForm.reset();
			this.$refs.storyForm.resetValidation();
		}
	}
};
</script>

<style></style>
