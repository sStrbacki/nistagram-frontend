<template>
	<v-container class="content-wrap">
		<v-row>
			<v-col cols="2">
				<chat-sessions />
			</v-col>
			<v-col>
				<router-view />
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import ChatSessions from '../../../components/user/chat/ChatSessions.vue';
export default {
	components: { ChatSessions },
	name: 'Chat'
};
</script>

<style></style>
