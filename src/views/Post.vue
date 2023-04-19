<template>
  <v-container>
    <v-row no-gutters>
      <v-col sm="10" class="mx-auto">
        <v-card class="pa-5">
          <v-card-title style="margin-left: 35%"
            >Thông tin nhân viên</v-card-title
          >
          <v-avatar color="primary" size="150" style="margin-left: 40%">
            <v-img height="150" :src="`/${post.image}`"></v-img
          ></v-avatar>
          <v-divider></v-divider>
          <v-form
            @submit.prevent=""
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
          </v-form>
          <v-col sm="10" class="d-flex justify-start">
            <v-btn
              color="success"
              :to="{ name: 'edit', params: { id: post._id } }"
              >Edit</v-btn
            >
            <v-btn color="red" @click="removePost(post._id)">Delete</v-btn>
          </v-col>
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
      post: {},
    };
  },
  async created() {
    const response = await API.getPostbyid(this.$route.params.id);
    this.post = response;
  },
  methods: {
    async removePost(id) {
      const response = await API.delete(id);
      this.$router.push({
        name: "home",
        params: { message: response.message },
      });
    },
  },
};
</script>
