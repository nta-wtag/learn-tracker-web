import { useState } from "react";

export interface AuthData {
    email: string;
    password: string;
    username: string;
}

export interface AuthErrors {
    email?: string;
    password?: string;
    username?: string;
}

export const useAuthForm = () => {
    const [authData, setAuthData] = useState<AuthData>({
        email: "",
        password: "",
        username: "",
    });

    const [errors, setErrors] = useState<AuthErrors>({});

    const validate = (isLogin: boolean) => {
        const newErrors: AuthErrors = {};

        if (!isLogin && !authData.username) newErrors.username = "Username is required";
        else if (!isLogin && authData.username.length < 3) newErrors.username = "Username must be at least 3 characters";

        if (!authData.email) newErrors.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(authData.email)) newErrors.email = "Invalid email format";

        if (!authData.password) newErrors.password = "Password is required";
        else if (authData.password.length < 6) newErrors.password = "Password must be at least 6 characters";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (
        e: React.FormEvent,
        isLogin: boolean
    ) => {
        e.preventDefault();

        if (!validate(isLogin)) return;

        try {
            if (isLogin) {
                alert(`Login success\nEmail: ${authData.email}`);
            } else {
                alert(`Registration success\nUsername: ${authData.username}`);
            }
        } catch (err: any) {
            alert(err.response?.data?.message || err.message || "Something went wrong");
        }
    };


    return { authData, setAuthData, errors, handleSubmit };
};
