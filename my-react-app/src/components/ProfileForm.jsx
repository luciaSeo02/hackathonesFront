const ProfileForm = ({ formData, setFormData, isAdmin }) => {
    const inputClass =
        'w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white';

    const labelClass =
        'text-sm font-medium text-gray-700 dark:text-gray-200 mb-1';

    return (
        <div className="space-y-4">
            {!isAdmin && (
                <>
                    <div>
                        <label className={labelClass}>Nombre</label>
                        <input
                            type="text"
                            value={formData.firstName}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    firstName: e.target.value,
                                })
                            }
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label className={labelClass}>Apellidos</label>
                        <input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    lastName: e.target.value,
                                })
                            }
                            className={inputClass}
                        />
                    </div>
                </>
            )}

            <div>
                <label className={labelClass}>Username</label>
                <input
                    type="text"
                    value={formData.username}
                    disabled={isAdmin}
                    onChange={(e) =>
                        setFormData({ ...formData, username: e.target.value })
                    }
                    className={inputClass}
                />
            </div>

            <div>
                <label className={labelClass}>Email</label>
                <input
                    type="email"
                    value={formData.email}
                    disabled={isAdmin}
                    onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                    }
                    className={inputClass}
                />
            </div>
        </div>
    );
};
export default ProfileForm;
