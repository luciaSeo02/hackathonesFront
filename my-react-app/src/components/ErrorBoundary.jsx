import { Component } from 'react';
import Button from './ui/Button';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error capturado por ErrorBoundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div
                    className="bg-light-gradient dark:bg-dark-gradient min-h-screen flex items-center justify-center p-4"
                    style={{ fontFamily: 'Orbitron, monospace' }}
                >
                    <div className="bg-white rounded-3xl shadow-2xl p-10 flex flex-col items-center w-full max-w-md">
                        <h1 className="text-5xl font-extrabold text-red-600 mb-4">
                            ¡Error!
                        </h1>
                        <p className="text-lg text-gray-600 mb-6 text-center">
                            Algo salió mal al cargar esta parte de la
                            aplicación.
                        </p>
                        <Button
                            text="Recargar"
                            onClick={() => window.location.reload()}
                        />
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
