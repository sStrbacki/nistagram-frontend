<template>
	<v-container>
		<v-row align="center" justify="center">
			<h1>New Post</h1>
		</v-row>
		<v-row align="center" justify="center">
			<v-col cols="8">
				<v-form ref="photoForm" v-model="valid" lazy-validation>
					<v-file-input
						v-model="files"
						color="deep-purple accent-4"
						counter
						label="Photos"
						multiple
						placeholder="Select your photos"
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
		<v-row justify="center" align="center">
			<v-chip
				class="ma-3"
				close
				@click:close="removeTag(tag)"
				v-for="(tag, index) in taggedUsers"
				:key="index"
			>
				{{ tag }}
			</v-chip>
		</v-row>
		<v-row justify="center" class="mt-8">
			<v-col cols="1">
				<v-row>
					<v-btn color="success" class="">
						Post
					</v-btn>
				</v-row>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	name: 'NewPost',
	data() {
		return {
			files: null,
			valid: null,
			caption: '',
			searchLocations: '',
			searchTaggableUsers: '',
			locationName: null,
			coordinates: null,
			locationResponses: [],
			service: null,
			geocoder: null,
			isLocationLoading: false,
			areUsersLoading: false,
			selectedUser: null,
			taggedUsers: []
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
				this.taggedUsers.push(val);
			}
		}
	},
	computed: {
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
					return !this.taggedUsers.includes(user);
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
		select(result) {
			this.geocoder.geocode({ address: this.locationName }, (res, status) => {
				if (status == window.google.maps.GeocoderStatus.OK) {
					this.coordinates = {
						latitude: res[0].geometry.location.lat(),
						longitude: res[0].geometry.location.lng()
					};
					this.location = result.description;
				}
			});
		},
		removeTag(tag) {
			this.taggedUsers = this.taggedUsers.filter(taggedUser => {
				return taggedUser !== tag;
			});
		}
	}
};
</script>

<style></style>
