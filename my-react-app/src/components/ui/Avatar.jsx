import { useContext } from 'react';
import AuthContext from '../../context/AuthContextProvider.jsx';

const Avatar = ({ className = '' }) => {
    const { userLogged } = useContext(AuthContext);

    if (!userLogged) return null;

    return (
        <div
            className={`border-[#5F3DC4] border-2 rounded-lg overflow-hidden w-9 h-9 ${className}`}
        >
            <img
                src={userLogged.avatar || '/defaultAvatar.png'}
                alt="Avatar"
                className="w-full h-full object-cover"
            />
        </div>
    );
};

export default Avatar;
