<template>
	<div>
		<v-container>
			<v-row class="content-wrap" align="center" justify="center">
				<router-view />
			</v-row>
			<v-bottom-navigation :value="value" grow absolute>
				<v-btn to="users" text>
					<span>Find user</span>

					<v-icon>mdi-account-circle</v-icon>
				</v-btn>

				<v-btn to="locations" text>
					<span>Locations</span>

					<v-icon>mdi-map-marker</v-icon>
				</v-btn>

				<v-btn to="tags" text>
					<span>Tags</span>

					<v-icon>mdi-tag</v-icon>
				</v-btn>
			</v-bottom-navigation>
		</v-container>
	</div>
</template>

<script>
export default {
	name: 'Search',
	data: () => ({
		value: 0
	})
};
</script>

<style></style>
