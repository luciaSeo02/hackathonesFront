import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AuthContext from '../context/AuthContextProvider';
import { Plus } from 'lucide-react';

import HackathonsList from '../components/HackathonsList';
import HackathonFilters from '../components/HackathonFilters';

const HackathonsPage = () => {
    const { userLogged } = useContext(AuthContext);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [footerVisible, setFooterVisible] = useState(false);
    const buttonRef = useRef();

    // Detecta si el footer está visible
    useEffect(() => {
        const footer = document.querySelector('footer');
        if (!footer) return;

        const observer = new window.IntersectionObserver(
            ([entry]) => {
                setFooterVisible(entry.isIntersecting);
            },
            {
                root: null,
                threshold: 0.01,
            }
        );
        observer.observe(footer);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const updatedParams = new URLSearchParams(searchParams);
        let modified = false;

        if (!updatedParams.has('orderBy')) {
            if (userLogged?.role === 'admin') {
                updatedParams.set('orderBy', 'createdAt');
                modified = true;
            } else {
                updatedParams.set('orderBy', 'startDate');
                modified = true;
            }
        }

        if (!updatedParams.has('orderDirection')) {
            if (userLogged?.role === 'admin') {
                updatedParams.set('orderDirection', 'desc');
                modified = true;
            } else {
                updatedParams.set('orderDirection', 'asc');
                modified = true;
            }
        }

        if (modified) {
            setSearchParams(updatedParams, { replace: true });
        }
    }, [userLogged, searchParams, setSearchParams]);

    const filtersObject = Object.fromEntries([...searchParams.entries()]);

    const handleFiltersChange = (filters) => {
        const newParams = new URLSearchParams();
        if (filters.search) newParams.set('search', filters.search);
        Object.entries(filters).forEach(([key, value]) => {
            if (key !== 'search' && value) newParams.set(key, value);
        });
        setSearchParams(newParams);
    };

    const handleCreateClick = () => {
        navigate('/hackathons/create');
    };

    return (
        <div className="p-4 lg:mt-8 relative min-h-screen">
            <div className="mb-6 text-center px-10">
                <h2>Nuestros Hackathones</h2>
            </div>
            <HackathonFilters
                filters={filtersObject}
                onChange={handleFiltersChange}
                isAdmin={userLogged?.role === 'admin'}
            />

            <HackathonsList
                searchParams={searchParams}
                redirectIfEmpty={false}
            />
            {userLogged?.role === 'admin' && (
                <div
                    ref={buttonRef}
                    className={`z-40 ${
                        footerVisible
                            ? 'absolute right-4  lg:right-8 '
                            : 'fixed bottom-24 right-4 lg:bottom-24 lg:right-8'
                    }`}
                    style={{ transition: 'none' }}
                >
                    <button
                        onClick={handleCreateClick}
                        className="bg-light-gradient hover:bg-indigo-700 text-white p-2 rounded-full shadow-lg lg:p-4"
                        title="Crear nuevo hackathon"
                    >
                        <Plus className="w-5 h-5 lg:w-6 lg:h-6" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default HackathonsPage;
