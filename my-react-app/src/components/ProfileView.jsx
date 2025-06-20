const ProfileView = ({ user }) => {
    return (
        <div className="text-gray-800 dark:text-gray-200 space-y-2 text-sm md:text-base">
            {user.role !== 'admin' && (
                <>
                    <p>
                        <strong>Nombre:</strong> {user.firstName}
                    </p>
                    <p>
                        <strong>Apellidos:</strong> {user.lastName}
                    </p>
                </>
            )}
            <p>
                <strong>Usuario:</strong> {user.username}
            </p>
            <p>
                <strong>Email:</strong> {user.email}
            </p>
        </div>
    );
};

export default ProfileView;
