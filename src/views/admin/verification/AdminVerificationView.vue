<template>
	<v-container class="content-wrap">
		<v-row justify="center">
			<v-col cols="8">
				<pending-verification-list></pending-verification-list>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import PendingVerificationList from '../../../components/admin/verification/PendingVerificationList';
export default {
	name: 'AdminVerificationView',
	components: { PendingVerificationList }
};
</script>

<style scoped>

</style>
