import { createNav } from "./components/nav.js";
createNav();
import { baseUrl } from "./settings/api.js";
import { clearStorage } from "./settings/api.js";
import { managePosts } from "./components/managePosts.js";

const button = document.querySelector(".logout-button");

async function getPosts() {
  try {
    const url = baseUrl + "/wp-json/wp/v2/posts";
    const response = await fetch(url);
    const json = await response.json();
    const posts = json;
    managePosts(posts);
  } catch (error) {
    console.log(error);
  }
}
getPosts();

// LOGOUT

if (button) {
  button.onclick = function () {
    const doLogout = confirm(
      "Are you sure you want to end the session and log out?"
    );

    if (doLogout) {
      clearStorage("user");
      clearStorage("token");

      location.href = "index.html";
    }
  };
}
