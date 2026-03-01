// user.js
import { fetchUser } from "./api.js";

export function getUserName(id) {
  const user = fetchUser(id);
  return user.name;
}

// REMOVE this from top-level when using mock 
// console.log(getUserName(1));
