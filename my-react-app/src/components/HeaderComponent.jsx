import { Link } from 'react-router-dom';
import NavBar from './ui/NavBar.jsx';

const HeaderComponent = () => {
    return (
        <header className="bg-[#afafaf] fixed top-2.5 right-2.5 left-2.5 p-2 rounded-lg flex justify-between items-center sm:top-10 sm:right-10 sm:left-10 sm:p-4 sm:rounded-[10px]">
            <Link to={'/'}>
                <h3>LOGO</h3>
            </Link>

            <NavBar />
        </header>
    );
};

export default HeaderComponent;
