import { Link } from 'react-router-dom';
import NavBar from './ui/NavBar.jsx';

const HeaderComponent = () => {
    return (
        <header className="bg-[#afafaf] m-[10px] p-2 rounded-lg flex justify-between items-center sm:m-10 sm:p-4 sm:rounded-[10px]">
            <Link to={'/'}>
                <h3>LOGO</h3>
            </Link>

            <NavBar />
        </header>
    );
};

export default HeaderComponent;
