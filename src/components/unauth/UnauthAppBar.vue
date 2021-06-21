<template>
	<div>
		<v-app-bar absolute elevate-on-scroll>
			<v-img
				alt="Nistagram Logo"
				class="shrink mr-2"
				contain
				src="../../assets/nistagram-logo.png"
				transition="scale-transition"
				width="40"
			/>

			<v-toolbar-title class="logo-name">Ништаграм</v-toolbar-title>

			<v-spacer></v-spacer>

			<v-btn icon to="/search">
				<v-icon>mdi-magnify</v-icon>
			</v-btn>

			<v-btn icon @click="drawer = !drawer">
				<v-icon>mdi-dots-vertical</v-icon>
			</v-btn>
		</v-app-bar>

		<v-navigation-drawer v-model="drawer" absolute bottom right temporary>
			<v-list nav dense>
				<v-list-item-group>
					<v-list-item to="/register">
						<v-list-item-icon>
							<v-icon>mdi-account-plus</v-icon>
						</v-list-item-icon>
						<v-list-item-title>Register</v-list-item-title>
					</v-list-item>

					<v-list-item to="/">
						<v-list-item-icon>
							<v-icon>mdi-login</v-icon>
						</v-list-item-icon>
						<v-list-item-title>Login</v-list-item-title>
					</v-list-item>
				</v-list-item-group>
			</v-list>
		</v-navigation-drawer>
	</div>
</template>

<script>
export default {
	name: 'UnauthAppBar',
	data() {
		return {
			drawer: false
		};
	}
};
</script>

<style>
.logo-name {
	font-family: 'Amatic SC', cursive !important;
	font-size: 2rem !important;
}
</style>
