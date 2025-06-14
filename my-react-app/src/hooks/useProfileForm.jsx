import { useState, useEffect } from 'react';

const useProfileForm = (user) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
    });

    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                username: user.username || '',
                email: user.email || '',
            });
        }
    }, [user]);

    return [formData, setFormData];
};

export default useProfileForm;
