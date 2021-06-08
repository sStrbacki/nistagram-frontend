<template>
  <div style="margin: 50px auto 0;">
    <input id="image-upload" multiple type="file" placeholder="Upload file">
  </div>
</template>

<script>


import {getUploadUrls, upload} from "@/services/storageService";

export default {
    name: "Test",
    mounted() {
        document.getElementById('image-upload').onchange =
            function (e) {
                getUploadUrls(upload(e.target.files))
                    .then(urlPromises => {
                        urlPromises.forEach(urlPromise => {
                            urlPromise.then(url => console.log(url));
                        })
                    })

            }
    }
}
</script>

<style scoped>

</style>