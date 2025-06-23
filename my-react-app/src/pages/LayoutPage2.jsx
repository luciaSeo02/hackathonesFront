import { Outlet } from 'react-router-dom';

const LayoutPage2 = () => {
    return (
        <>
            <main className="bg-light-gradient dark:bg-dark-gradient w-screen h-screen flex justify-center items-center">
                <Outlet />
            </main>
        </>
    );
};

export default LayoutPage2;
