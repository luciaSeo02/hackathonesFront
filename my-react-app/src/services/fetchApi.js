const fetchApi = async (url) => {

    const response = await fetch(url);
    const json = await response.json();

    if(!response.ok) throw new Error(json.message);

    return json;
}

export default fetchApi;