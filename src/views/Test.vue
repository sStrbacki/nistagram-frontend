<template>
  <div style="margin: 50px auto 0;">
    <input id="image-upload" type="file" placeholder="Upload file">
    <button style="background-color: green; margin-top:20px;" @click="upload">Upload image</button>
    <img src="" alt="An image" id="an-image"/>
  </div>
</template>

<script>


import {postImage} from "@/services/storageService";

export default {
    name: "Test",
    methods: {
        upload() {
            let img = document.getElementById("an-image");

            fetch(img.src)
              .then(res => res.blob())
                  .then(blobResponse => {
                      postImage(blobResponse, img.name)
                          .then(storageResponse => {
                              storageResponse.ref.getDownloadURL()
                                  .then(url => console.log(url))
                          })
                  });
        }
    },
    mounted() {
        document.getElementById('image-upload').onchange =
            function(e) {
                this.img = document.getElementById("an-image");

                let file = e.target.files[0]

                this.img.src = window.URL.createObjectURL(file);
                this.img.name = file.name;
        }
    }
}
</script>

<style scoped>

</style>