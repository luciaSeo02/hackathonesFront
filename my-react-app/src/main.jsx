import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContextProvider.jsx';
import App from './App.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import './styles/style.css';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <AuthContextProvider>
                <ErrorBoundary>
                    <App />
                </ErrorBoundary>
            </AuthContextProvider>
        </BrowserRouter>
    </StrictMode>
);
