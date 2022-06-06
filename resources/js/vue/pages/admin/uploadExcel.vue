<template>
  <v-container>
    <v-row>
      <v-col>
        <ul>
          <li>ابتدا فایل مورد نظر خود را انتخاب کنید.</li>
          <li>سپس روی کلید بارگزاری کلیک کنید.</li>
        </ul>
      </v-col>
    </v-row>
    <v-row no-gutters justify="center" align="center">
      <v-col cols="8">
        <v-file-input
          :loading="loading"
          show-size
          label="فایل خروجی راهکاران"
          @change="selectFile"
        ></v-file-input>
      </v-col>
      <v-col cols="4" class="pr-2">
        <v-btn color="success" dark small @click="upload">
          بارگزاری
          <v-icon right dark>mdi-cloud-upload</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-alert v-if="message" border="left" color="blue-grey" dark>
      {{ message }}
    </v-alert>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  layout: "default",

  metaInfo() {
    return { title: "صفحه نخست" };
  },
  data() {
    return {
      currentFile: undefined,
      progress: 0,
      message: "",
      fileInfos: [],
      loading: false,
    };
  },
  methods: {
    selectFile(file) {
      this.progress = 0;
      this.currentFile = file;
    },
    uploadToServer(file, onUploadProgress) {},
    async upload() {
      if (!this.currentFile) {
        this.message = "Please select a file!";
        return;
      }
      this.message = "";
      let formData = new FormData();
      let vm = this;
      formData.append("file", this.currentFile);
      this.loading = true;
      let { data } = await axios.post("/api/uploadExcel", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      this.loading = false;
      if (data.success) alert("Success");
      else alert("Error");
    },
  },
};
</script>

<style scoped>
</style>
