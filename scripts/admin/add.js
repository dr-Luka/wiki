import { getToken } from "../settings/api.js";
import { baseUrl } from "../settings/api.js";
import { createNav } from "../components/nav.js";
createNav();

const form = document.querySelector("form");
form.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();
  try {
    const title = document.querySelector("#title");
    const description = document.querySelector("#description");
    const example = document.querySelector("#example");

    const titleValue = title.value.trim();
    const descriptionValue = description.value.trim();
    const exampleValue = example.value.trim();

    if (
      titleValue.length === 0 ||
      exampleValue.length === 0 ||
      descriptionValue.length === 0
    ) {
      console.log("empty FIelds");
      return;
      //   return displayMessage(
      //     "warning",
      //     "Please enter proper values",
      //     ".message-container"
      //   );
    }

    addPost(titleValue, descriptionValue, exampleValue);
  } catch (error) {
    console.log(error);
  }
}

export async function addPost(title, description, example) {
  const url = baseUrl + "/wp-json/wp/v2/posts";
  const form = document.querySelector("form");

  const data = JSON.stringify({
    title: title,
    content: description,
    example: example,
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
    console.log(json);

    if (json.id) {
      console.log("added");
      form.reset();
    }

    if (json.error) {
      //   displayMessage("error", json.message, ".message-container");
    }
  } catch (error) {
    console.log(error);
    // displayMessage("error", "An error occured", ".message-container");
  }
}
