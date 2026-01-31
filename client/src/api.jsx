// export const createPaste = async (data) => {
//   console.log("Creating paste with data:", data);
//   const res = await fetch("/api/pastes", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });

//   if (!res.ok) {
//     const text = await res.text();
//     throw new Error(`Error ${res.status}: ${text}`);
//   }

//   return res.json();
// };

// export const getPaste = (id) =>
//   fetch(`/api/pastes/${id}`).then((res) => res.json());


const API = import.meta.env.VITE_API_URL;

export const createPaste = (data) =>{
  console.log("API URL:", API);
   return fetch(`${API}/api/pastes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(res => res.json())
}
 ;

export const getPaste = (id) =>
  fetch(`${API}/api/pastes/${id}`).then(res => res.json());

