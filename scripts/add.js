import { getToken } from "./settings/api.js";
import { baseUrl } from "./settings/api.js";
import { createNav } from "./components/nav.js";
createNav();

const form = document.querySelector("form");
form.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();

  try {
    const title = document.querySelector("#title");
    const content = document.querySelector("#content");
    const messageContainer = document.querySelector(".message");

    const titleValue = title.value.trim();
    const contentValue = content.value.trim();

    if (titleValue.length === 0 || contentValue.length === 0) {
      return (messageContainer.innerHTML = "Fields can not be empty");
    } else {
      const doUpdate = confirm("Are you sure you want to update this post?");
      if (doUpdate) {
        addPost(titleValue, contentValue);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export async function addPost(title, content) {
  const url = baseUrl + "/wp-json/wp/v2/posts";
  const form = document.querySelector("form");

  const data = JSON.stringify({
    title: title,
    content: content,
    status: "publish",
  });

  const token = getToken();

  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (json.id) {
      form.reset();
    }

    if (json.error) {
      //   displayMessage("error", json.message, ".message-container");
    }
  } catch (error) {
    console.log(error);
    // displayMessage("error", "An error occured", ".message-container");
  } finally {
    location.href = "admin.html";
  }
}
