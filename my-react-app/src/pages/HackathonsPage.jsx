import HackathonsList from '../components/HackathonsList';

const HackathonsPage = () => {
    return (
        <div className="p-4 md:p-8">
            <h2 className="text-2xl font-bold mb-6">Lista de Hackathones</h2>
            <HackathonsList />
        </div>
    );
};

export default HackathonsPage;
