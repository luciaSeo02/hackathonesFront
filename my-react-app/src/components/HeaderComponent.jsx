import { Link } from 'react-router-dom';
import NavBar from './ui/NavBar.jsx';

const HeaderComponent = () => {
    return (
        <header className="bg-[#00000095] backdrop-blur-md sticky top-2.5 z-10 mx-2.5 p-2 rounded-lg flex justify-between items-center lg:top-10 lg:mx-10 lg:p-4 lg:rounded-[10px]">
            <Link to={'/'}>
                <h4>HackNMeet</h4>
            </Link>

            <NavBar />
        </header>
    );
};

export default HeaderComponent;
