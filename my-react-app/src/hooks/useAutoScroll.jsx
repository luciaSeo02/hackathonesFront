import { useCallback } from 'react';

const useAutoScroll = () => {
    const scrollToTop = useCallback((delay = 0) => {
        const performScroll = () => {
            window.scrollTo({
                top: 0,
                behavior: 'instant',
            });
        };

        if (delay > 0) {
            setTimeout(performScroll, delay);
        } else {
            performScroll();
        }
    }, []);

    return { scrollToTop };
};

export default useAutoScroll;
