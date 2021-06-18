<template>
	<v-container>
		<v-row v-if="fileUrls" align-content="center" justify="center">
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

					<v-autocomplete
						v-model="selectedUser"
						:items="users"
						:search-input.sync="searchTaggableUsers"
						:loading="areUsersLoading"
						color="white"
						hide-no-data
						hide-selected
						label="Tag users"
						placeholder="Start typing to find users..."
						prepend-icon="mdi-account"
						return-object
					>
					</v-autocomplete>
				</v-form>
			</v-col>
		</v-row>
		<v-row justify="center" no-gutters>
			<v-col cols="8">
				<v-chip
					class="ma-3"
					close
					@click:close="removeTag(tag)"
					v-for="(tag, index) in tags"
					:key="index"
				>
					{{ tag }}
				</v-chip>
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
import 'vue-md-player/dist/vue-md-player.css';
export default {
	name: 'NewPost',
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

	watch: {
		files(val) {
			if (val) {
				if (val.length == 0) this.$store.dispatch('clearUrls');
				else this.$store.dispatch('postFiles');
			}
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
		searchTaggableUsers(val) {
			if (val) {
				if (this.areUsersLoading) return;

				this.areUsersLoading = true;
				this.taggableUserQuery = val;
				try {
					this.$store.dispatch('findTaggableUsersByUsername');
				} catch (err) {
					this.areUsersLoading = false;
				}
				this.areUsersLoading = false;
			}
		},
		locationName(val) {
			if (val) {
				this.select(val);
			}
		},
		selectedUser(val) {
			if (val) {
				this.selectedUser = null;
				this.$store.dispatch('addTag', val);
			}
		}
	},
	computed: {
		isValid: {
			get() {
				return this.$store.getters.isPostDataValid;
			}
		},
		tags: {
			get() {
				return this.$store.getters.tags;
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
		taggableUserQuery: {
			get() {
				return this.$store.getters.taggableUserQuery;
			},
			set(value) {
				this.$store.commit('setTaggableUserQuery', value);
			}
		},
		foundUsers: {
			get() {
				return this.$store.getters.foundUsers;
			},
			set(value) {
				this.$store.commit('setUsers', value);
			}
		},
		users() {
			return this.foundUsers
				.map(user => {
					return user.username;
				})
				.filter(user => {
					return !this.tags.includes(user);
				});
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
				if (status === window.google.maps.GeocoderStatus.OK) {
				  const responseLocation = res[0];
				  const coordinates = responseLocation.geometry.location;

					this.$store.dispatch('setLatitude', coordinates.lat());
					this.$store.dispatch('setLongitude', coordinates.lng());
					this.$store.dispatch('setLocationName', responseLocation.formatted_address);
				}
			});
		},
		removeTag(tag) {
			this.$store.dispatch('removeTag', tag);
		},
		async post() {
			await this.$store.dispatch('createPost');
			this.$refs.postForm.reset();
			this.$refs.postForm.resetValidation();
		}
	},
	mounted() {
		this.mapsInit();
	}
};
</script>

<style></style>
