export const baseUrl = "https://wiki.learnx.no";

const tokenKey = "token";
const userKey = "user";

export function saveToken(token) {
  saveToStorage(tokenKey, token);
}
export function saveUser(user) {
  saveToStorage(userKey, user);
}

export function getToken() {
  return getFromStorage(tokenKey);
}

export function getUsername() {
  const user = getFromStorage(userKey);

  if (user) {
    return user;
  }
  return null;
}
export function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getFromStorage(key) {
  const value = localStorage.getItem(key);

  if (!value) {
    return null;
  }
  return JSON.parse(value);
}
export function clearStorage(item) {
  localStorage.removeItem(item);
}
