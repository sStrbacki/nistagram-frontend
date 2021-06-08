<template>
	<v-col cols="12">
		<v-row>
			<v-autocomplete
				v-model="model"
				:items="locations"
				:loading="isLoading"
				:search-input.sync="search"
				color="white"
				hide-no-data
				hide-selected
				label="Location"
				placeholder="Start typing to find location..."
				prepend-icon="mdi-map-marker"
				return-object
			></v-autocomplete>
		</v-row>
		<v-row v-if="selected && foundPosts.length !== 0" dense no-gutters>
			<v-card
				class="mx-auto"
				max-width="400"
				v-for="post in foundPosts"
				:key="post.id"
			>
				<v-img :src="post.mediaUrls[0].url" height="200px"></v-img>

				<v-card-title>
					{{ post.author }}
				</v-card-title>

				<v-card-subtitle>
					{{ post.caption }}
				</v-card-subtitle>

				<v-card-actions>
					<v-btn text>
						See more
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-row>
	</v-col>
</template>

<script>
export default {
	name: 'LocationSearch',
	data: () => ({
		items: [],
		service: null,
		geocoder: null,
		submitting: true,
		selected: false,
		entries: [],
		isLoading: false,
		model: null,
		search: null,
		location: null
	}),
	computed: {
		coordinates: {
			set(value) {
				this.$store.commit('setLocationQuery', value);
			},
			get() {
				return this.$store.getters.locationQuery;
			}
		},
		foundPosts: {
			get() {
				return this.$store.getters.foundPosts;
			}
		},
		locations() {
			return this.items.map(item => {
				return item.description;
			});
		}
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
	methods: {
		mapsInit() {
			this.service = new window.google.maps.places.AutocompleteService();
			this.geocoder = new window.google.maps.Geocoder();
		},
		displaySuggestions(predictions) {
			this.items = predictions;
		},
		select(result) {
			this.geocoder.geocode({ address: this.model }, (res, status) => {
				if (status == window.google.maps.GeocoderStatus.OK) {
					this.coordinates = {
						latitude: res[0].geometry.location.lat(),
						longitude: res[0].geometry.location.lng()
					};
					this.location = result.description;
					this.selected = true;
					this.$store.dispatch('findPostsByLocation');
				}
			});
		}
	},
	watch: {
		search(val) {
			if (val) {
				if (this.isLoading) return;

				this.isLoading = true;

				this.service
					.getPlacePredictions({
						input: val
					})
					.then(res => {
						this.displaySuggestions(res.predictions);
						this.isLoading = false;
					})
					.finally(() => (this.isLoading = false));
			}
		},
		model(val) {
			if (val) {
				this.select(val);
			}
		}
	}
};
</script>

<style></style>
