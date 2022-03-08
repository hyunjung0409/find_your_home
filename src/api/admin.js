import { apiInstance } from "./index.js";

const api = apiInstance();

function userList(success, fail) {
  api.get(`/admin/user`).then(success).catch(fail);
}

function userInfo(userId, success, fail) {
  api.get(`/admin/user/${userId}`).then(success).catch(fail);
}

async function userRegister(user, success, fail) {
  api.post(`/admin/user/`, JSON.stringify(user)).then(success).catch(fail);
}

function userModify(user, success, fail) {
  api.put(`/admin/user/`, JSON.stringify(user)).then(success).catch(fail);
}

function userDelete(userid, success, fail) {
  api.delete(`/admin/user/${userid}`).then(success).catch(fail);
}

export { userList, userInfo, userRegister, userModify, userDelete };
