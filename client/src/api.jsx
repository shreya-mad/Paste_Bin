import { BASE_URL } from "./dynamicApi";
const API = import.meta.env.VITE_API_URL;

export const createPaste = (data) =>{
  console.log("API URL:", BASE_URL);
   return fetch(`${BASE_URL}/api/pastes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(res => res.json())
}
 ;

export const getPaste = (id) =>
  fetch(`${BASE_URL}/api/pastes/${id}`).then(res => res.json());

