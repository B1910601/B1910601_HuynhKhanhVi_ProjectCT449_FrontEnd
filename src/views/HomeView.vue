<template>
  <v-contaniner>
    <v-alert
      border="left"
      close-text="Close Alert"
      color="green accent-4"
      dark
      dismissiable
      v-if="this.$route.params.message"
    >
      {{ this.$route.params.message }}
    </v-alert>
    <v-row>
      <v-col sm="3" class="pa-3" v-for="post in posts" :key="post._id">
        <v-card class="pa-1" :to="{ name: 'post', params: { id: post._id } }">
          <v-avatar color="primary" size="100" style="margin-left: 30%">
            <v-img height="100" :src="`/${post.image}`"></v-img
          ></v-avatar>
          <v-card-actions class="pb-0">
            <v-title
              small
              outlined
              color="primary"
              style="font-size: 20px; margin-left: 30%"
              >{{ post.work }}</v-title
            >
          </v-card-actions>
          <v-card-title class="headline">
            {{ post.name }}
          </v-card-title>
          <v-card-text class="py-0">
            <p>{{ post.content }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-contaniner>
</template>

<script>
import API from "../serviecs/api";
export default {
  name: "Home",
  data() {
    return {
      posts: [],
    };
  },
  async created() {
    this.posts = await API.getAllPost();
  },
};
</script>
