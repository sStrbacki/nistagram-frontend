<template>
  <v-card class="d-flex">
    <v-navigation-drawer
        permanent
    >
      <v-list>
        <!--v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
          </v-list-item-avatar>
        </v-list-item-->
        <router-link to="/profile"
                     v-slot="{href, navigate, isActive}">
          <v-list-item link :active="isActive" :href="href" @click="navigate">
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                Nikola Pantelic
              </v-list-item-title>
              <v-list-item-subtitle>nikolapantelic@mail.com</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </router-link>
      </v-list>

      <v-divider></v-divider>

      <v-list
          nav
          dense
      >
        <router-link to="/profile"
                     v-slot="{href, navigate, isActive}">
          <v-list-item link :active="isActive" :href="href" @click="navigate">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Personal Info</v-list-item-title>
          </v-list-item>
        </router-link>
        <router-link to="/profile/privacy"
                     v-slot="{href, navigate, isActive}">
          <v-list-item link :active="isActive" :href="href" @click="navigate">
            <v-list-item-icon>
              <v-icon>mdi-lock</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Privacy</v-list-item-title>
          </v-list-item>
        </router-link>
        <router-link to="/profile/notifications"
                     v-slot="{href, navigate, isActive}">
          <v-list-item link :active="isActive" :href="href" @click="navigate">
            <v-list-item-icon>
              <v-icon>mdi-bell</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Notification Preferences</v-list-item-title>
          </v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>
    <v-spacer></v-spacer>
    <div class="col-6">
      <router-view/>
    </div>
    <v-spacer></v-spacer>
  </v-card>
</template>

<script>
  export default {
    name: "UserProfile"
  }
</script>

<style scoped>

</style>
