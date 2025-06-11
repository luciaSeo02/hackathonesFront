import FooterComponent from '../components/FooterComponent.jsx';
import HeaderComponent from '../components/HeaderComponent.jsx';

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
