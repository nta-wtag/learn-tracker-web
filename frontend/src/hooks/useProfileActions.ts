import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAppDispatch } from "redux-toolkit/store";
import { logoutUser, updateUser } from "redux-toolkit/thunks/authThunk";
import { AuthFormValues } from "types/auth-types";
import { ROUTES } from "routes/paths";

export const useProfileActions = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    const [isEditing, setIsEditing] = useState(false);

    const handleUpdateProfile = useCallback(
        async (values: AuthFormValues) => {
            try {
                const updateData: any = {
                    username: values.username,
                    email: values.email,
                };

                if (values.password) {
                    updateData.password = values.password;
                }

                await dispatch(updateUser(updateData)).unwrap();

                toast.success("Profile updated successfully");
                setIsEditing(false);
            } catch (error) {
                toast.error(error as string || "Failed to update profile");
            }
        },
        [dispatch]
    );

    const handleLogout = useCallback(async () => {
        try {
            await dispatch(logoutUser()).unwrap();

            toast.success("Logged out successfully");

            navigate(ROUTES.AUTH.path, { replace: true });
        } catch (error) {
            toast.error(error as string || "Failed to logout");
        }
    }, [dispatch, navigate]);

    const startEditing = useCallback(() => {
        setIsEditing(true);
    }, []);

    const cancelEditing = useCallback(() => {
        setIsEditing(false);
    }, []);

    return {
        isEditing,
        handleUpdateProfile,
        handleLogout,
        startEditing,
        cancelEditing,
    };
};
