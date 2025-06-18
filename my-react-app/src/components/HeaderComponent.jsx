import { Link } from 'react-router-dom';
import NavBar from './ui/NavBar.jsx';

const HeaderComponent = () => {
    return (
        <header className="bg-[#afafaf70] backdrop-blur-md sticky top-2.5 z-10 mx-2.5 p-2 rounded-lg flex justify-between items-center lg:top-6 lg:mx-6 lg:p-4 lg:rounded-[10px]">
            <Link to={'/'}>
                <img className="h-5 lg:h-7" src="./logo2.png" alt="Logo HackNMeet" />
            </Link>

            <NavBar />
        </header>
    );
};

export default HeaderComponent;
