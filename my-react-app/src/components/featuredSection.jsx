import React, { useState } from 'react';
import HackathonCard from './hackathonCard';

const getUnique = (arr, key) => [...new Set(arr.map((item) => item[key]))];

function FeaturedSection({ hackathons, loading }) {

    const topics = getUnique(hackathons, 'topic');
    const modalities = getUnique(hackathons, 'modality');
    const allTechnologies = Array.from(
        new Set(
            hackathons
                .flatMap((h) =>
                h.technologies ? h.technologies.split(',') : []
                )
                .map((t) => t.trim())
        )
    );

const [topic, setTopic] = useState('');
const [modality, setModality] = useState('');
const [technology, setTechnology] = useState('');

const filtered = hackathons.filter((h) => {
    const topicMatch = topic ? h.topic === topic : true;

const modalityMatch = modality ? h.modality === modality : true;

const techMatch = technology
    ? h.technologies &&
    h.technologies
    .split(',')
    .map((t) => t.trim())
    .includes(technology)
    : true;

    return topicMatch && modalityMatch && techMatch;
});

if (loading) return <div> Buscando hackathon... </div>;

return (
    <section>
        <h2> Destacados </h2>

        <div className="filters">
            <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
            >
            <option value=""> Tema </option>
                {topics.map((t) => (
                <option key={t} value={t}>
                {t}
                </option>
                ))}
            </select>

            <select
                value={modality}
            onChange={(e) => setModality(e.target.value)}
                >
                <option value=""> Modalidad </option>
                    {modalities.map((m) => (
                    <option key={m} value={m}>
                        {m}
                    </option>
                ))}
            </select>

            <select
                value={technology}
                onChange={(e) => setTechnology(e.target.value)}
                >
                <option value=""> Tecnología </option>
                    {allTechnologies.map((tech) => (
                    <option key={tech} value={tech}>
                        {tech}
                    </option>
                ))}
            </select>
        </div>

        <div className="featured-list">
            {filtered.length === 0 ? (
                <div>
                    {' '}
                    No hay hackathones destacados con estos filtros.{' '}
                </div>
            ) : (
                filtered.map((hackathon) => (
                    <HackathonCard key={hackathon.id} {...hackathon} />
                ))
            )}
        </div>
    </section>
);
}

export default FeaturedSection;
