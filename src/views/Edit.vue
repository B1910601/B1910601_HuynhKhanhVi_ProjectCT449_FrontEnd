<template>
  <v-container>
    <v-row no-gutters>
      <v-col sm="10" class="mx-auto">
        <v-card class="pa-5">
          <v-card-title style="margin-left: 40%">Edit</v-card-title>
          <v-divider></v-divider>
          <v-form
            @submit.prevent="UpdateForm"
            ref="form"
            class="pa-5"
            enctype="multipart/form-data"
          >
            <v-text-field
              label="Tên"
              v-model="post.name"
              prepend-icon="mdi-note"
              :rules="rules"
            ></v-text-field>
            <v-text-field
              label="Ngày sinh"
              v-model="post.date"
              type="date"
              prepend-icon="mdi-note"
              :rules="rules"
            >
            </v-text-field>

            <v-text-field
              label="Công việc"
              v-model="post.category"
              prepend-icon="mdi-view-list"
              :rules="rules"
            ></v-text-field>
            <v-text-field
              label="Địa chỉ"
              v-model="post.content"
              prepend-icon="mdi-note-plus"
              :rules="RuleTester"
            ></v-text-field>
            <v-radio-group
              v-bind="props"
              label="Giới tính"
              v-model="post.gender"
            >
              <v-radio label="Nam" value="1"></v-radio>
              <v-radio label="Nữ" value="2"></v-radio>
            </v-radio-group>
            <v-file-input
              @change="selectFile"
              show-size
              counter
              multiple
              label="Image"
            ></v-file-input>
            <v-img :src="`/${post.image}`" width="120"></v-img>
            <v-btn type="submit" class="mt-3" color="primary">Update</v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import API from "../serviecs/api";

export default {
  data() {
    return {
      rules: [(value) => !!value || "This field is required"],
      post: {
        name: "",
        category: "",
        gender: "",
        content: "",
        date: "",
        image: "",
      },
      image: "",
    };
  },
  async created() {
    const response = await API.getPostbyid(this.$route.params.id);
    this.post = response;
  },
  methods: {
    selectFile(file) {
      this.image = file[0];
    },
    async UpdateForm() {
      const formData = new FormData();
      formData.append("image", this.image);
      formData.append("name", this.post.name);
      formData.append("date", this.post.date);
      formData.append("category", this.post.category);
      formData.append("content", this.post.content);
      formData.append("gender", this.post.gender);
      formData.append("old_image", this.post.image);

      if (this.$refs.form.validate()) {
        const response = await API.update(this.$route.params.id, formData);
        this.$router.push({
          name: "home",
          params: { message: response.message },
        });
      }
    },
  },
};
</script>
