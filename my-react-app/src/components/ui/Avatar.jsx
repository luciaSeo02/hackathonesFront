import { useContext } from 'react';
import AuthContext from '../../context/AuthContextProvider.jsx';

const Avatar = () => {
    const { userLogged } = useContext(AuthContext);

    return (
        <div className="border-light-gradient dark:border-dark-gradient border-2 rounded-lg">
            <img
                src={'/defaultAvatar.png'}
                alt="Avatar"
                className="size-8 object-cover"
            />
        </div>
    );
};

export default Avatar;
