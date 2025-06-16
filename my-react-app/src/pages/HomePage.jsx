import CategoryList from '../components/CategoryList.jsx';
import useTopics from '../hooks/useTopics.jsx';

const HomePage = () => {
    const topics = useTopics();

    return (
        <>
            <section className="bg-[url('/hero.jpg')] bg-cover bg-center h-[60vh] -mt-10 flex justify-center items-center">
                <h1>HackNMeet</h1>
            </section>

            <section>
                <h2>Nuestas temáticas</h2>
                <p>
                    Descubre las diferentes temáticas de hackathones que
                    HackNMeet ofrece, desde lo más básico hasta lo más innovado,
                    estando siempre a la última con todas las tecnologías del
                    mercado.
                </p>
                {topics && topics?.map()}
            </section>
        </>
    );
};

export default HomePage;
