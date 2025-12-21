import React from 'react';
import { useNotification } from '../context/NotificationContext';
import './Notification.css';

const NotificationContainer = () => {
    const { notification, isFadingOut } = useNotification();

    if (!notification) return null;

    return (
        <div className={`notification-toast ${notification.type} ${isFadingOut ? 'fade-out' : ''}`}>
            {notification.message}
        </div>
    );
};

export default NotificationContainer;
