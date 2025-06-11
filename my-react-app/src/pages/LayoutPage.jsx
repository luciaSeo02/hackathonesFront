import FooterComponent from '../components/FooterComponent.jsx';
import HeaderComponent from '../components/HeaderComponent.jsx';
import { Outlet } from 'react-router-dom';

const LayoutPage = () => {
    return (
        <>
            <HeaderComponent />

            <main>
                <Outlet />
            </main>

            <FooterComponent />
        </>
    );
};

export default LayoutPage;
