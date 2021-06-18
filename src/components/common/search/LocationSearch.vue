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
		<v-row v-if="foundPosts.length !== 0" dense no-gutters>
			<v-card
				class="mx-auto"
				max-width="400"
				v-for="post in foundPosts"
				:key="post.id">

        <post-card :post="post"/>

			</v-card>
		</v-row>
	</v-col>
</template>

<script>
import PostCard from "@/components/user/feed/PostCard";
export default {
    name: 'LocationSearch',
  components: {PostCard},
  data: () => ({
      items: [],
      autoCompleteService: null,
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
      street: {
          get() {
              return this.$store.getters.street;
          },
          set(value) {
              this.$store.commit('setLocationStreet', value);
          }
      },
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
    mounted: function() {
        this.initGoogleServices();
    },
    methods: {
        initGoogleServices() {
            this.autoCompleteService = new window.google.maps.places.AutocompleteService();
            this.geocoder = new window.google.maps.Geocoder();
        },
        select(result) {
          this.geocoder.geocode(
              {
                address: this.model
              },
              (response, status) =>
              {
                console.log("Geocoder", response);
                if (status === window.google.maps.GeocoderStatus.OK) {
                      // If the response is status OK, update $store variables
                      const responseLocation = response[0];
                      const coordinates = responseLocation.geometry.location;
                      this.coordinates = {
                          latitude: coordinates.lat(),
                          longitude: coordinates.lng()
                      };
                      this.location = responseLocation.formatted_address;
                      this.$store.commit('setLocationStreet', responseLocation.formatted_address);
                      this.selected = true;
                      // And then dispatch the search function
                      this.$store.dispatch('findPostsByLocation');
                  }
              });
        }
    },
    watch: {
        search(val) {
            // if search is empty or already loading, do not do anything
            if (!val) return;
            if (this.isLoading) return;

            this.isLoading = true;

            // Else, go ahead and query predictions
            this.autoCompleteService.getPlacePredictions(
                {
                  input: val
                }
            ).then(res => {
                  // When you get predictions, show them within the v-autocomplete
                  this.isLoading = false;
              })
              .finally(() => (this.isLoading = false));
        },
        model(val) {
          // This is called whenever the v-model from v-autocomplete is changed, meaning on click and on enter
          if (val) {
            this.select(val);
          }
        }
    },
};
</script>

<style></style>
