<template>
	<v-dialog v-model="reshareDialog" width="700">
		<v-card>
			<v-card-text>
				<v-row align="center" justify="center">
					<v-col cols="8">
						<post-card-small :post="resharePost" />
					</v-col>
				</v-row>
				<v-row align="center" justify="center">
					<v-col cols="8">
						<v-form ref="reshareForm" lazy-validation>
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
							<v-btn color="success" :disabled="!isValid" @click="reshare">
								Share
							</v-btn>
						</v-row>
					</v-col>
				</v-row>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script>
import PostCardSmall from '../feed/PostCardSmall.vue';
export default {
	components: { PostCardSmall },
	name: 'ReshareDialog',
	data() {
		return {
			searchLocations: '',
			locationName: null,
			locationResponses: [],
			service: null,
			geocoder: null,
			isLocationLoading: false
		};
	},
	watch: {
		reshareDialog(val) {
			if (val) {
				this.mapsInit();
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
		locationName(val) {
			if (val) {
				this.select(val);
			}
		}
	},
	computed: {
		reshareDialog: {
			get() {
				return this.$store.getters.reshareDialog;
			},
			set(value) {
				this.$store.commit('setReshareDialog', value);
			}
		},
		resharePost: {
			get() {
				return this.$store.getters.resharePost;
			}
		},
		isValid: {
			get() {
				return this.$store.getters.isReshareDataValid;
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
		select(result) {
			this.geocoder.geocode({ address: this.locationName }, (res, status) => {
				if (status == window.google.maps.GeocoderStatus.OK) {
					this.$store.dispatch('setLatitude', res[0].geometry.location.lat());
					this.$store.dispatch('setLongitude', res[0].geometry.location.lng());
					this.$store.dispatch('setLocationName', result);
				}
			});
		},
		async reshare() {
			await this.$store.dispatch('createReshareStory');
			this.reshareDialog = false;
			this.$refs.reshareForm.reset();
			this.$refs.reshareForm.resetValidation();
		}
	}
};
</script>

<style></style>
