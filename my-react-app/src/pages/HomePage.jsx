import CategoryList from '../components/CategoryList.jsx';
import HackathonsList from '../components/HackathonsList.jsx';
import Banner from '../components/ui/Banner.jsx';

const HomePage = () => {
    return (
        <>
            <section className="bg-[url('/hero.jpg')] bg-cover bg-center h-[60vh] -mt-20 flex justify-center items-center">
                <h1>HackNMeet</h1>
            </section>

            <section className="mt-10 flex flex-col gap-3 lg:mt-20">
                <h2 className="text-center px-10">Nuestras temáticas</h2>
                <p className="text-center px-11 lg:px-80">
                    Descubre las diferentes temáticas de hackathones que
                    HackNMeet ofrece, desde lo más básico hasta lo más
                    innovador, estando siempre a la última con todas las
                    tecnologías del mercado.
                </p>
                <CategoryList />
            </section>

            <section className="mt-10 lg:mt-20">
                <Banner />
            </section>

            <section className="mt-24 flex flex-col gap-3 lg:mt-20">
                <h2 className="text-center px-10">Nuestros destacados</h2>
                <p className="text-center px-11 lg:px-80">
                    Selección de nuestros hackathones más destacados
                    actualmente, en los que podrás conocer todo acerda de las
                    novedades más interesantes del momento en el mundo
                    tecnológico.
                </p>
                <HackathonsList
                    searchParams={
                        new URLSearchParams({
                            isFavourite: 'true',
                            orderBy: 'startDate',
                        })
                    }
                />
            </section>
        </>
    );
};

export default HomePage;
