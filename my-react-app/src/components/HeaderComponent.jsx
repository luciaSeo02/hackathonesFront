import { Link } from 'react-router-dom';
import NavBar from './ui/NavBar.jsx';

const HeaderComponent = () => {
    return (
        <header className="bg-[#afafaf70] backdrop-blur-sm sticky top-2.5 mx-10 p-2 rounded-lg flex justify-between items-center sm:top-10 sm:right-10 sm:left-10 sm:p-4 sm:rounded-[10px]">
            <Link to={'/'}>
                <h3>HackNMeet</h3>
            </Link>

            <NavBar />
        </header>
    );
};

export default HeaderComponent;
