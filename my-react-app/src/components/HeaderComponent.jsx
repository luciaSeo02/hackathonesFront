import { Link } from 'react-router-dom';
import NavBar from './ui/NavBar.jsx';

const HeaderComponent = () => {
    return (
        <header className="bg-[#a7a7a7] backdrop-blur-sm sticky top-2.5 mx-10 p-2 rounded-lg flex justify-between items-center sm:top-10 sm:right-10 sm:left-10 sm:p-4 sm:rounded-[10px]">
            <Link to={'/'}>
                <h4>HackNMeet</h4>
            </Link>

            <NavBar />
        </header>
    );
};

export default HeaderComponent;
