<template>
	<v-container>
    <div v-if="!isRejected">
      <h6>Please enter your business website URL. After submitting, an administrator will validate your request.</h6>
      <v-text-field v-model="websiteUrl" placeholder="Enter your website URL"></v-text-field>
      <v-btn color="primary" @click="submit()">Submit</v-btn>
    </div>
    <div v-else>
      <v-row>
        <v-col>
          <h3 style="background-color: white; color: darkred; text-align: center; padding: 10px; margin-top: 20px;">
            Your request for agent has been rejected by the admins.
          </h3>
        </v-col>
      </v-row>
    </div>
	</v-container>
</template>

<script>
	export default {
		name: 'AgentRegistration',
		methods: {
			submit() {
				this.$store.dispatch('requestAgentRegistration');
			}
		},
		computed: {
      isRejected: {
        get() {
          return this.$store.getters.agentRequestRejected;
        }
      },
      websiteUrl: {
        get() {
          return this.$store.getters.agentRegistrationWebsiteUrl;
        },
        set(value) {
          this.$store.commit('setAgentRegistrationWebsiteUrl', value);
        }
      }
		},
    mounted() {
      this.$store.dispatch('checkIsRequestRejected');
    }
	};
</script>

<style scoped>

</style>
