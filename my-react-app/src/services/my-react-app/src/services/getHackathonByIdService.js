const getHackathonByIdService = async (id) => {
  const url = `${import.meta.env.VITE_API_URL}/hackathons/${id}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("No se pudo cargar el hackathon");
  return await response.json();
};

export default getHackathonByIdService;