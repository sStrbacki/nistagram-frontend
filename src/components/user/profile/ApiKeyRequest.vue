<template>
  <div class="mt-5">
    <div v-if="!apiKeyGenerated">
      <v-row>
        <v-col>
          <h3>Request an API Key for your application</h3>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn color="green" @click="requestApiKey">Request</v-btn>
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <v-row>
        <v-col>
          <span>
            Here is your API Key.
          </span>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <span style="font-size: 24px; color: darkgray">{{apiKey}}</span>
        </v-col>
        <v-col>
          <v-btn color="success" style="border-radius: 3px;" @click="copyApiKey">
            <v-icon>
              mdi-content-copy
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <span>
            How to use: <br>
            Save this code as an ENV variable in your application's backend.
            For requests which target Nistagram marketing endpoints, attach
            this API Key as a header under the key 'apiKey'.
          </span>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "ApiKeyRequest",
  computed: {
    apiKey: {
      get() {
        return this.$store.getters.apiKey;
      }
    },
    apiKeyGenerated: {
      get() {
        return this.$store.getters.apiKeyGenerated;
      },
    }
  },
  methods: {
    requestApiKey() {
      this.$store.dispatch('generateApiKey');
    },
    copyApiKey() {
      this.$store.dispatch('copyKeyToClipboard');
    }
  },
  mounted() {
    this.$store.dispatch('getApiKey');
  }
}
</script>

<style scoped>

</style>
