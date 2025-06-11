export const API_BASE_URL = import.meta.env.VITE_URL_API;


export async function fetchHackathons() {

  const response = await fetch(`${API_BASE_URL}/hackathons`);

  if (!response.ok) throw new Error("No se pudo obtener la lista de hackathones");

  return response.json();
}


export async function loginUser(credentials) {

  const response = await fetch(`${API_BASE_URL}/users/login`, {

    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),

  });

  if (!response.ok) throw new Error("Error al iniciar sesión");

  return response.json();
}
