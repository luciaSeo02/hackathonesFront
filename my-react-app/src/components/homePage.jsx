import React, { useEffect, useState } from 'react';
import Header from './header';
import HackathonCarousel from './hackathonCarousel';
import FeaturedSection from './featuredSection';
import Footer from './footer';
import { API_BASE_URL } from '../utils/api';
import { Link } from "react-router-dom";

const HomePage = () => {

const [hackathons, setHackathons] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);


useEffect(() => {

  fetch(`${API_BASE_URL}/hackathons`)
    .then((res) => res.json())
    .then((data) => {
    setHackathons(data.data || data);
    setLoading(false);
  })

    .catch((err) => {
    setError(err.message);
    setLoading(false);
  });

}, []);

if (error) return <div>Error: {error}</div>;

return (
  <>
  <Header />

    <main>

      <section className="main_title">
        <h1>HackNMeet</h1>
      </section>

      <HackathonCarousel hackathons={hackathons} />

      <FeaturedSection hackathons={hackathons} loading={loading} />

      <section className="hackathons-preview" style={{ margin: "2rem 0" }}>

        <h2>Lista de Hackathones</h2>

        {loading ? (
          <div>Cargando hackathones...</div>
        ) : hackathons.length === 0 ? (
            <div>No hay hackathones disponibles.</div>
          ) : (
            <ul>
              {hackathons.slice(0, 5).map((h) => (
                <li key={h.id}>
                  <strong>{h.name || h.nombre}</strong> — {h.date || h.fecha}
                </li>
              ))}
            </ul>
          )}

          <div style={{ marginTop: "1rem" }}>
            <Link to="/hackathons">Ver todos los hackathones</Link>
          </div>

        </section>

      </main>

    <Footer />
  </>
)


};

export default HomePage;
