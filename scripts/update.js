import { getToken } from "./settings/api.js";
import { baseUrl } from "./settings/api.js";
import { createNav } from "./components/nav.js";
createNav();

const updateForm = document.querySelector(".updateForm");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const postUrl = baseUrl + "/wp-json/wp/v2/posts/" + id;

const form = document.querySelector("form");
const title = document.querySelector("#title");
const content = document.querySelector("#content");
const idInput = document.querySelector("#id");

async function getDetails() {
  try {
    const response = await fetch(postUrl);
    const details = await response.json();

    title.value = details.title.rendered;
    content.value = details.content.rendered;
    idInput.value = details.id;
  } catch (error) {
    console.log(error);
  }
}
getDetails();

form.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();
  const doUpdate = confirm("Are you sure you want to update this post?");
  if (doUpdate) {
    const titleValue = title.value.trim();
    const contentValue = content.value.trim();
    const idValue = idInput.value;

    if (titleValue.length === 0 || contentValue.length === 0) {
      // return displayMessage(
      //   "warning",
      //   "Please supply proper values",
      //   ".message-container"
      // );
      console.log("updated");
    }

    updateProduct(titleValue, contentValue, idValue);
  }
}

async function updateProduct(title, content, id) {
  const url = baseUrl + "/wp-json/wp/v2/posts/" + id;
  const data = JSON.stringify({
    title: title,
    content: content,
    status: "publish",
  });

  const token = getToken();

  const options = {
    method: "PUT",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();
    console.log(json);

    if (json.updated_at) {
      // displayMessage("success", "Product updated", ".message-container");
      console.log("sucess");
    }

    if (json.error) {
      // displayMessage("error", json.message, ".message-container");
      console.log("nope");
    }
  } catch (error) {
    console.log(error);
  } finally {
    location.href = "admin.html";
  }
}
