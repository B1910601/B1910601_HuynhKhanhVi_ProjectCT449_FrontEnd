import axios from "axios";
const url = "/api/post";
export default class API {
  //get all
  static async getAllPost() {
    const res = await axios.get(url);
    return res.data;
  }
  static async getPostbyid(id) {
    const res = await axios.get(`${url}/${id}`);
    return res.data;
  }
  static async addPost(post) {
    const res = await axios.post(url, post);
    return res.data;
  }
  static async update(id, post) {
    const res = await axios.patch(`${url}/${id}`, post);
    return res.data;
  }
  static async delete(id) {
    const res = await axios.delete(`${url}/${id}`);
    return res.data;
  }
}
