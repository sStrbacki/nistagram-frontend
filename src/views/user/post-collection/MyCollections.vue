<template>
	<v-container>
		<v-row class="content-wrap" align="center" justify="center">
			<h2>Post collections</h2>
		</v-row>
		<v-row>
			<v-col>
				<v-row no-gutters align="start" justify="start">
					<v-col cols="4">
						<v-card
							class="mx-auto mt-2"
							max-width="300"
							min-height="100"
							outlined
							rounded
						>
							<v-card-text>
								<v-row align="center" justify="center">
									<v-col cols="2" class="ml-1">
										<v-icon color="blue">
											mdi-folder
										</v-icon>
									</v-col>
									<v-col cols="9" class="mt-1"> Default collection </v-col>
								</v-row>
								<v-row justify="end">
									<v-btn text @click="rerouteToDefaultCollectionsPage()">
										> Open
									</v-btn>
								</v-row>
							</v-card-text>
						</v-card>
					</v-col>
					<v-col
						cols="4"
						v-for="(collection, index) in collections"
						:key="index"
					>
						<v-card
							class="mx-auto mt-2"
							max-width="300"
							min-height="100"
							outlined
							rounded
						>
							<v-card-text>
								<v-row align="center" justify="center">
									<v-col cols="2" class="ml-1">
										<v-icon color="teal">
											mdi-folder
										</v-icon>
									</v-col>
									<v-col class="mt-1"> {{ collection.name }} </v-col>
									<v-col cols="2">
										<v-btn
											icon
											color="red"
											small
											@click="deleteCollection(collection.name)"
										>
											<v-icon>
												mdi-close
											</v-icon>
										</v-btn>
									</v-col>
								</v-row>
								<v-row justify="end">
									<v-btn text @click="rerouteToCollectionPage(collection.name)">
										> Open
									</v-btn>
								</v-row>
							</v-card-text>
						</v-card>
					</v-col>
					<v-col cols="4" v-if="!creatingCollection">
						<v-card
							class="mx-auto mt-2"
							max-width="300"
							min-height="100"
							outlined
							rounded
							@click="creatingCollection = !creatingCollection"
						>
							<v-card-text>
								<v-row align="start" justify="start">
									<v-col cols="2" class="ml-1">
										<v-icon color="teal">
											mdi-plus
										</v-icon>
									</v-col>
									<v-col cols="9" class="mt-1"> New collection </v-col>
								</v-row>
							</v-card-text>
						</v-card>
					</v-col>
				</v-row>
				<v-row
					no-gutters
					align="center"
					justify="center"
					class="mt-4"
					v-if="creatingCollection"
				>
					<v-col cols="10">
						<v-card class="mx-auto" max-width="500" outlined rounded>
							<v-row align="start" justify="start">
								<v-col cols="1" class="ml-4 mt-5">
									<v-icon color="yellow">
										mdi-folder
									</v-icon>
								</v-col>
								<v-col cols="8">
									<v-text-field v-model="collectionName"></v-text-field>
								</v-col>
								<v-col cols="1" class="mt-5">
									<v-btn
										icon
										@click="createCollection"
										:disabled="!createCollectionEnabled"
									>
										<v-icon> mdi-check </v-icon>
									</v-btn>
								</v-col>
								<v-col cols="1" class="mt-5">
									<v-btn icon @click="cancelCollectionCreation">
										<v-icon> mdi-close </v-icon>
									</v-btn>
								</v-col>
							</v-row>
						</v-card>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	name: 'MyCollections',
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
		}
	},
	methods: {
		cancelCollectionCreation() {
			this.collectionName = '';
			this.creatingCollection = false;
		},
		async createCollection() {
			this.creatingCollection = false;
			await this.$store.dispatch('createCollection');
			await this.$store.dispatch('fetchCollections');
			this.collectionName = '';
		},
		async deleteCollection(collectionName) {
			await this.$store.dispatch('deleteCollection', collectionName);
		},
		rerouteToDefaultCollectionsPage() {
			this.$router.push('/home/collection/default');
		},
		rerouteToCollectionPage(name) {
			this.$router.push('/home/collection/' + name);
		}
	},
	mounted() {
		this.$store.dispatch('fetchCollections');
	}
};
</script>

<style></style>
