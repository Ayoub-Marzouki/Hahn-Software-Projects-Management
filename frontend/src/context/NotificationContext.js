import React, { createContext, useState, useContext, useCallback } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState(null);
    const [isFadingOut, setIsFadingOut] = useState(false);

    const showNotification = useCallback((message, type = 'info') => {
        setNotification({ message, type });
        setIsFadingOut(false);
        
        // Start fade out after 2.5 seconds
        setTimeout(() => {
            setIsFadingOut(true);
        }, 2500);

        // Remove completely after 3 seconds (2.5s + 0.5s fade)
        setTimeout(() => {
            setNotification(null);
            setIsFadingOut(false);
        }, 3000);
    }, []);

    return (
        <NotificationContext.Provider value={{ notification, showNotification, isFadingOut }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => useContext(NotificationContext);
