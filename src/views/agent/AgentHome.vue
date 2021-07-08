<template>
	<div>
		<agent-app-bar></agent-app-bar>
		<div class="content-wrap">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import AgentAppBar from '../../components/agent/AgentAppBar';
export default {
	name: 'AgentHome',
	components: { AgentAppBar }
};
</script>

<style scoped>

</style>
