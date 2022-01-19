import { instance_v1 } from "./configure";

export const API_v1 = {
  postAuthLogin(data) {
    let formData = new FormData();
    formData.append("login", data.login);
    formData.append("password", data.password);

    return instance_v1.post(`auth/login`, formData);
  },

  getUser(id) {
    return instance_v1.get(`user/${id}`);
  },

  postUserMeSubscription(data) {
    let formData = new FormData();
    formData.append("id", data.id);
    formData.append("action", data.action);

    return instance_v1.post(`user/me/subscribtion`, formData);
  },

  postLike(data) {
    let formData = new FormData();
    formData.append("id", data.id);
    formData.append("type", data.type);
    formData.append("sign", data.sign);

    return instance_v1.post(`like`, formData);
  },

  getCommentLikes(id) {
    return instance_v1.get(`comment/likers/${id}`);
  },

  addComment(data) {
    let formData = new FormData();
    formData.append("id", data.id);
    formData.append("text", data.text);
    formData.append("reply_to", data.reply_to);

    return instance_v1.post(`comment/add`, formData);
  },

  getNotifications() {
    return instance_v1.get(`user/me/updates?is_read=1`);
  },

  getNotificationsCount() {
    return instance_v1.get(`user/me/updates/count`);
  },
};
