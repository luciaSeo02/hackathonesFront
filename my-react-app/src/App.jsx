import { Route, Routes } from 'react-router-dom';
import LayoutPage from './pages/LayoutPage.jsx';
import HomePage from './pages/HomePage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import HackathonsPage from './pages/HackathonsPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import AdminCreateHackathon from './pages/AdminCreateHackathon.jsx';
import ValidatePage from './pages/ValidatePage.jsx';
import MenuPage from './pages/MenuPage.jsx';
import PublishRankingPage from './pages/PublishRankingPage';
import ViewClassificationPage from './pages/ViewClassificationPage';
import RecoverPasswordPage from './pages/RecoverPasswordPage.jsx';
import ChangePasswordPage from './pages/ChangePasswordPage.jsx';
import MyInscriptionsPage from './pages/MyInscriptionPage.jsx';
import LayoutPage2 from './pages/LayoutPage2.jsx';

import ProtectedRoute from './components/ProtectedRoute.jsx';
import NotAuthorizedPage from './pages/NotAuthorizedPage.jsx';

function App() {
    return (
        <Routes>
            <Route element={<LayoutPage2 />}>
                <Route path="/register" element={<RegisterPage />} />
                <Route
                    path="/users/validate/:registrationCode"
                    element={<ValidatePage />}
                />
                <Route path="/login" element={<LoginPage />} />
                <Route
                    path="/password/recover"
                    element={<RecoverPasswordPage />}
                />
                <Route
                    path="/password/change"
                    element={<ChangePasswordPage />}
                />
                <Route
                    path="/hackathons/create"
                    element={
                        <ProtectedRoute requiredRole="admin">
                            <AdminCreateHackathon />
                        </ProtectedRoute>
                    }
                />
                <Route path="/menu" element={<MenuPage />} />
            </Route>
            <Route path="/" element={<LayoutPage />}>
                <Route index element={<HomePage />} />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                />

                <Route path="/hackathons" element={<HackathonsPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route
                    path="/hackathons/:hackathonId/classification"
                    element={<PublishRankingPage />}
                />
                <Route
                    path="/hackathons/:hackathonId/classification/view"
                    element={<ViewClassificationPage />}
                />
                <Route
                    path="/my-inscriptions"
                    element={<MyInscriptionsPage />}
                />
                <Route path="*" element={<NotFoundPage />} />
                <Route path="/not-authorized" element={<NotAuthorizedPage />} />
            </Route>
        </Routes>
    );
}

export default App;
