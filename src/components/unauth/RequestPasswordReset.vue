<template>
  <v-container>
    <v-row class="content-wrap" align="center" justify="center">
      <h2>Let's recover your password.</h2>
    </v-row>
    <div style="width: 50%; margin: 0 auto;">
      <v-row class="content-wrap" align="center" justify="center">
        <v-text-field placeholder="Email" label="Email" v-model="email"></v-text-field>
      </v-row>
      <v-row>
        <v-btn @click='requestReset' color="green" style="margin: 0 auto;">Request reset</v-btn>
      </v-row>
    </div>
  </v-container>
</template>

<script>
export default {
    name: 'RequestPasswordReset',
    computed: {
        email: {
            get: function() {
                return this.$store.getters.requestPasswordResetEmail;
            },
            set: function(value) {
                this.$store.commit("setRequestPasswordResetEmail", value);
            }
        },
        isEmailValid: function() {
            return this.email.regex('')
        },
    },
    methods: {
        requestReset: function () {
            this.$store.dispatch('requestPasswordReset');
        },
    }

}
</script>

<style scoped>

</style>