<template>
	<div>
		<v-container>
			<v-row class="content-wrap" align="center" justify="center"> </v-row>
			<v-row align="center" justify="center">
				<router-view />
			</v-row>
		</v-container>
		<v-bottom-navigation absolute horizontal>
			<v-btn value="post" to="/home/publish/post" text>
				<span>Publish a post</span>

				<v-icon>mdi-image</v-icon>
			</v-btn>
			<v-btn value="story" absolute to="/home/publish/story" text>
				<span>Publish a story</span>

				<v-icon>mdi-history</v-icon>
			</v-btn>
		</v-bottom-navigation>
	</div>
</template>

<script>
export default {
	name: 'Publish'
};
</script>

<style></style>
