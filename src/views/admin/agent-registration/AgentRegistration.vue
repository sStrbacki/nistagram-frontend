<template>
	<v-container>
		<v-row class="content-wrap" justify="center">
			<router-view></router-view>
		</v-row>
		<v-bottom-navigation absolute horizontal class="mt-5">
			<v-btn value="post" to="/admin/agent-registration" text>
				<span>Registration requests</span>

				<v-icon>mdi-account-clock</v-icon>
			</v-btn>
			<v-btn
				value="story"
				absolute
				to="/admin/agent-registration/user-promotion"
				text
			>
				<span>Promote an user</span>

				<v-icon>mdi-account-arrow-right</v-icon>
			</v-btn>
		</v-bottom-navigation>
	</v-container>
</template>

<script>
export default {
	name: 'AgentRegistration'
};
</script>

<style></style>
