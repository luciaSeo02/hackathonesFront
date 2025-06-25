const ProfileView = ({ user }) => {
    return (
        <div className="space-y-2 text-sm lg:text-base">
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
