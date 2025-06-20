import useHighlightedHackathons from '../hooks/useHighlightedHackathons';
import HackathonCarousel from './ui/HackathonCarousel';
import Loading from './ui/Loading';
import ErrorDiv from './ui/ErrorDiv';

const HighlightedHackathons = () => {
    const { hackathons, loading, error } = useHighlightedHackathons();

    if (loading) return <Loading />;
    if (error) return <ErrorDiv message={error} />;
    if (!hackathons?.length) return null;

    return (
        <section className="py-8">
            <div className="container mx-auto">
                <h2 className="text-2xl font-bold mb-6 px-2.5 lg:text-4xl lg:px-10">
                    Hackathones Destacados
                </h2>
                <HackathonCarousel hackathons={hackathons} />
            </div>
        </section>
    );
};

export default HighlightedHackathons;
