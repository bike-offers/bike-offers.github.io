

const host = "https://parseapi.back4app.com";
export async function request(url, options) {
  try {
    const response = await fetch(host + url, options); 
    if (response.ok == false) {
      const error = await response.json();
 
      if(error.code==101){
        let usernameInput = document.querySelector("#username");
        let passwordInput = document.querySelector("#login-password");
        passwordInput.classList.add("error-input");
        usernameInput.classList.add("error-input");
}
if(error.code==202){
  let usernameInput = document.querySelector("#username");
  usernameInput.classList.add("error-input");

}
if(error.code==203){
  let emailInput = document.querySelector("#email");
  emailInput.classList.add("error-input");

}
      throw new Error(error.error);
    }

    return response.json();
  } catch (err) {
    // alert(err.message);
    throw err;
  }
}
function createOptions(method = "get", data) {
  const options = {
    method,
    headers: {
      "X-Parse-Application-Id": "9eORpp1vlW7iRtLb0ysiTIwEqCDQmWuxhcOaaglg",
      "X-Parse-REST-API-Key": "9J6w5l5v8ZdsG6tilhJjRkxTyFdEpNUgCQRtvQbC",
    },
  };
  const userData = getUserData();
  if (userData) {
    options.headers["X-Parse-Session-Token"] = userData.token;
  }
  if (data) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }
  return options;

}
export function get(url) {
  return request(url, createOptions());
}
export async function post(url, data) {
  return request(url, createOptions("post", data));
}
export async function put(url, data) {
  return request(url, createOptions("put", data));
}
export async function del(url) {
  return request(url, createOptions("delete"));
}

export function setSession(data) {
  sessionStorage.setItem("userData", JSON.stringify(data));
}
export function clearUserData() {
  sessionStorage.clear();
}
export function getAuthToken() {
  const { token } = JSON.parse(sessionStorage.getItem("userData"));
  return token;
}

export function getUserEmail() {
  const { email } = JSON.parse(sessionStorage.getItem("userData"));
  return email;
}
export function getUserName() {
  const { username } = JSON.parse(sessionStorage.getItem("userData"));
  return username;
}

export function getUserId() {
  const { id } = JSON.parse(sessionStorage.getItem("userData"));
  return id;
}
export function getUserData() {
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  return userData;
}

export function isLoggedIn() {
  return JSON.parse(sessionStorage.getItem("userData"));
}

export async function loginUser(username, password) {
  const result = await post("/login", { username, password });
  const userData = {
    username: result.username,
    email:result.email,
    id: result.objectId,
    token: result.sessionToken,
  };
  setSession(userData);
  return result;
}

export async function registerUser(username, email, password) {
  const result = await post("/users", { username, email, password });
const userData = {
    username:username,
    email: result.email,
    id: result.objectId,
    token: result.sessionToken,
  };

  setSession(userData);
  return result;
}
export async function logOutUser() {
  await post("/logout");
  sessionStorage.clear();


}
