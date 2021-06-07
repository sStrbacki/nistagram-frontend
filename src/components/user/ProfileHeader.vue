<template>
  <div class="d-flex flex-wrap justify-center">
    <v-col id="profile-picture">
      <v-avatar size="160">
        <v-img src="https://www.hellomagazin.rs/data/images/2021-01-23/44486_ana-nikolic-printscreen-yputube_f.jpg"></v-img>
      </v-avatar>
    </v-col>
    <div class="d-flex flex-column">
      <v-col id="profile-username-div" class="d-flex flex-wrap justify-space-between">
        <h2 class="d-inline mr-10 align-center">ananikolicofficial</h2>
        <v-btn rounded color="blue accent-1">Follow</v-btn>
      </v-col>
      <v-col class="d-none d-sm-flex justify-space-between" id="profile-stats-div">
        <span class="mx-1">500 posts</span>
        <span class="mx-1">513k followers</span>
        <span class="mx-1">1326 following</span>
      </v-col>
      <v-col id="personal-info-div">
        <h4>Ana Nikolic</h4>
        <div>#KLINKA</div>
        <a class="text-truncate" href="www.youtube.com/playlist?list=PLwNFpCl5wj92yUGRMNf">www.youtube.com/playlist?list=PLwNFpCl5wj92yUGRMNf</a>
      </v-col>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ProfileHeader.vue"
  }
</script>

<style scoped>
  #profile-picture {
    max-width: 180px;
    max-height: 180px;
  }
</style>
