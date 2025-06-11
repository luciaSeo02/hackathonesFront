import { useState } from 'react';
import HackathonCard from './hackathonCard';

const HackathonCarousel = ({ hackathons }) => {

    const [index, setIndex] = useState(0);

    if (!hackathons.length) return null;

    const prev = () =>

        setIndex((i) => (i === 0 ? hackathons.length - 1 : i - 1));

    const next = () =>

        setIndex((i) => (i === hackathons.length - 1 ? 0 : i + 1));

    return (

        <div className="carousel">

            <button onClick={prev}>{'<'}</button>

            <HackathonCard {...hackathons[index]} />

            <button onClick={next}>{'>'}</button>

        </div>
    );
    
};

export default HackathonCarousel;
