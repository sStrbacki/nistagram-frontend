<template>
	<v-dialog v-model="collectionDialog" width="700">
		<v-card>
			<v-card-title>
				My collections
			</v-card-title>

			<v-card-text>
				<v-col>
					<v-row no-gutters align="start" justify="start">
						<v-col cols="3">
							<v-card
								class="mx-auto mt-2"
								max-width="140"
								outlined
								rounded
								@click="saveToDefaultCollection()"
							>
								<v-row align="start" justify="start">
									<v-col cols="2" class="ml-1">
										<v-icon color="blue">
											mdi-folder
										</v-icon>
									</v-col>
									<v-col cols="9" class="mt-1"> Default collection </v-col>
								</v-row>
							</v-card>
						</v-col>
						<v-col
							cols="3"
							v-for="(collection, index) in collections"
							:key="index"
						>
							<v-card
								class="mx-auto mt-2"
								max-width="140"
								max-height="80"
								outlined
								rounded
								@click="saveToCustomCollection(collection.name)"
							>
								<v-row align="start" justify="start">
									<v-col cols="2" class="ml-1">
										<v-icon color="teal">
											mdi-folder
										</v-icon>
									</v-col>
									<v-col class="mt-1"> {{ collection.name }} </v-col>
								</v-row>
							</v-card>
						</v-col>
						<v-col cols="3" v-if="!creatingCollection">
							<v-card
								class="mx-auto mt-2"
								max-width="140"
								outlined
								rounded
								@click="creatingCollection = !creatingCollection"
							>
								<v-row align="start" justify="start">
									<v-col cols="2" class="ml-1">
										<v-icon color="teal">
											mdi-plus
										</v-icon>
									</v-col>
									<v-col cols="9" class="mt-1"> New collection </v-col>
								</v-row>
							</v-card>
						</v-col>
					</v-row>
					<v-row
						no-gutters
						align="start"
						justify="start"
						class="mt-4"
						v-if="creatingCollection"
					>
						<v-col cols="10">
							<v-card class="mx-auto" max-width="500" outlined rounded>
								<v-row align="start" justify="start">
									<v-col cols="1" class="ml-1 mt-7">
										<v-icon color="yellow">
											mdi-folder
										</v-icon>
									</v-col>
									<v-col cols="8" class="mt-1">
										<v-text-field v-model="collectionName"></v-text-field>
									</v-col>
									<v-col cols="1" class="mt-7">
										<v-btn
											icon
											@click="createCollection"
											:disabled="!createCollectionEnabled"
										>
											<v-icon> mdi-check </v-icon>
										</v-btn>
									</v-col>
									<v-col cols="1" class="mt-7">
										<v-btn icon @click="cancelCollectionCreation">
											<v-icon> mdi-close </v-icon>
										</v-btn>
									</v-col>
								</v-row>
							</v-card>
						</v-col>
					</v-row>
				</v-col>
			</v-card-text>

			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn
					color="primary"
					text
					@click="collectionDialog = !collectionDialog"
				>
					Close
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	name: 'CollectionDialog',
	data() {
		return {
			creatingCollection: false
		};
	},
	computed: {
		createCollectionEnabled() {
			return (
				this.collectionName !== '' &&
				this.collectionName !== 'default' &&
				this.collectionName !== 'Default collection'
			);
		},
		collectionName: {
			get() {
				return this.$store.getters.collectionName;
			},
			set(value) {
				this.$store.commit('setCollectionName', value);
			}
		},
		collections: {
			get() {
				return this.$store.getters.collections;
			}
		},
		collectionDialog: {
			get() {
				return this.$store.getters.collectionDialog;
			},
			set(value) {
				this.$store.commit('setCollectionDialog', value);
			}
		}
	},
	watch: {
		collectionDialog(value) {
			if (value) {
				this.$store.dispatch('fetchCollections');
			}
		}
	},
	methods: {
		cancelCollectionCreation() {
			this.collectionName = '';
			this.creatingCollection = false;
		},
		async saveToDefaultCollection() {
			await this.$store.dispatch('saveToDefaultCollection');
			this.collectionDialog = false;
		},
		async saveToCustomCollection(collectionName) {
			await this.$store.dispatch('saveToCustomCollection', collectionName);
			this.collectionDialog = false;
		},
		async createCollection() {
			await this.$store.dispatch('createCollection');
			await this.$store.dispatch('fetchCollections');
			this.collectionName = '';
			this.creatingCollection = false;
		}
	}
};
</script>

<style></style>
