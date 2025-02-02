import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./styles.css";
import { GlobalProvider } from './contexts/globalContext';

const Index = () => {
    useEffect(() => {
        document.scrollingElement?.scrollTo({top: 0});
        const preventTouch = (e: TouchEvent) => {
            // e.preventDefault();
        }
        history.scrollRestoration = 'manual';
        const preventBack = () => history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', preventBack);
        document.addEventListener('touchmove', preventTouch, { passive: false });
        return () => {
            window.removeEventListener('popstate', preventBack);
            document.removeEventListener('touchmove', preventTouch)
        };
    }, [])
    return <GlobalProvider>
        <App />
    </GlobalProvider>
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<Index />);
