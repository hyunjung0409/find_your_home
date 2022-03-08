import { apiInstance } from "./index.js";

const api = apiInstance();

async function login(user, success, fail) {
  await api
    .post(`/member/user/login`, JSON.stringify(user))
    .then(success)
    .catch(fail);
}

async function join(joinData, success, fail) {
  api.post(`/member/user`, JSON.stringify(joinData)).then(success).catch(fail);
}

async function changePwd(data, suceess, fail) {
  api
    .put(`/member/user/password`, JSON.stringify(data))
    .then(suceess)
    .catch(fail);
}

async function doubleCheck({ ckid }, success, fail) {
  api.post(`/member/user/id?ckid=${ckid}`).then(success).catch(fail);
}

async function modify(data, success, fail) {
  console.log(data);
  api.put(`/member/user`, JSON.stringify(data)).then(success).catch(fail);
}

async function deleteMember({ ckid }, success, fail) {
  console.log(ckid);
  await api.delete(`/member/user?ckid=${ckid}`).then(success).catch(fail);
}

async function findById(userid, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.get(`/member/info/${userid}`).then(success).catch(fail);
}

async function findPwd(userPwd, success, fail) {
  api
    .post(`/member/user/password`, JSON.stringify(userPwd))
    .then(success)
    .catch(fail);
}

// function logout(success, fail)

export {
  login,
  join,
  doubleCheck,
  modify,
  deleteMember,
  findById,
  changePwd,
  findPwd,
};
