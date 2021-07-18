import { saveToken, saveUser } from "../settings/api.js";
import { baseUrl } from "../settings/api.js";
import { createNav } from "./nav.js";
createNav();

const button = document.querySelector(".login-button");
const username = document.querySelector("#username");
const password = document.querySelector("#password");

button.onclick = function submitForm(event) {
  event.preventDefault();

  const usernameValue = username.value.trim();
  const passwordValue = password.value.trim();
  if (usernameValue.length === 0 || passwordValue.length === 0) {
    // HERE ADD FIELD CHECK MESSAGE
    return;
  }
  doLogin(usernameValue, passwordValue);
};

async function doLogin(username, password) {
  const url = baseUrl + "/wp-json/jwt-auth/v1/token";

  const data = JSON.stringify({ username: username, password: password });

  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (json.token) {
      document.location = "admin.html";
      saveToken(json.token);
      saveUser(json.user_nicename);
    }

    if (json.error) {
      //   displayMessage("warning", "Invalid login details", ".message-container");
    }
  } catch (error) {
    console.log(error);
  }
}
