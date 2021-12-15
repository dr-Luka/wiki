import { createNav } from "./components/nav.js";
createNav();
import { baseUrl } from "./settings/api.js";
import { renderPosts } from "./components/renderPosts.js";
import { searchPosts } from "./components/searchPosts.js";

async function getPosts() {
  try {
    const url = baseUrl + "/wp-json/wp/v2/posts";
    const response = await fetch(url);
    const json = await response.json();
    const posts = json;
    renderPosts(posts);
    searchPosts(posts);
  } catch (error) {
    console.log(error);
  }
}
getPosts();
