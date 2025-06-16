import FooterComponent from '../components/FooterComponent.jsx';
import HeaderComponent from '../components/HeaderComponent.jsx';
import { Outlet } from 'react-router-dom';

const LayoutPage = () => {
    return (
        <>
            <HeaderComponent />

            <main className="pt-14 sm:pt-36">
                <Outlet />
            </main>

            <FooterComponent />
        </>
    );
};

export default LayoutPage;
