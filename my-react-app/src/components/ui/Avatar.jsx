import { useContext } from 'react';
import AuthContext from '../../context/AuthContextProvider.jsx';

const Avatar = () => {
    const { userLogged } = useContext(AuthContext);

    if (!userLogged) return null;

    return (
        <div className="border-light-gradient dark:border-dark-gradient border-2 rounded-lg overflow-hidden w-8 h-8">
            <img
                src={userLogged.avatar || '/defaultAvatar.png'}
                alt="Avatar"
                className="w-full h-full object-cover"
            />
        </div>
    );
};

export default Avatar;
