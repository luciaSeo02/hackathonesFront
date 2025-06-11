import React, { useEffect, useState } from "react";
import { fetchHackathons } from "../utils/api";
import { Link } from "react-router-dom";

function HackathonsList() {
const [hackathons, setHackathons] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {

    fetchHackathons()

    .then((data) => {
        setHackathons(data.data || data);
        setLoading(false);
    })

    .catch((err) => {
        setError(err.message);
        setLoading(false);
    });

}, []);

if (loading) return <div>Buscando hackathons...</div>;
if (error) return <div>Error: {error}</div>;

return (
    <div>
        <h1>Lista de Hackathons</h1>
            <ul>
                {hackathons.map((hackathon) => (

            <li key={hackathon.id}>

                <Link to={`/hackathons/${hackathon.id}`}>
                    {hackathon.name}
                </Link>

            </li>
            ))}

        </ul>

    </div>

    );

}

export default HackathonsList;