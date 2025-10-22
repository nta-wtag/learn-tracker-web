import React from "react";
import { Form } from "react-final-form";
import { AuthData } from "types/auth-types";
import ProfileAvatar from "../ProfileAvatar";
import ProfileFormFields from "../ProfileFormFields";
import ProfileActions from "../ProfileActions";
import { validateAuth } from "utils/auth-validation";

export interface ProfileFormValues {
    username: string;
    email: string;
    password: string;
}

interface ProfileFormProps {
    user: AuthData;
    isEditing: boolean;
    onSubmit: (values: ProfileFormValues) => Promise<void>;
    onEdit: () => void;
    onCancel: () => void;
    onLogout: () => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
    user,
    isEditing,
    onSubmit,
    onEdit,
    onCancel,
    onLogout,
}) => {
    return (
        <div className="p-6 gap-8 flex flex-col bg-white shadow-lg rounded-2xl overflow-hidden">
            <ProfileAvatar username={user.username} email={user.email} />
            <Form
                onSubmit={async (values, form) => {
                    await onSubmit(values);
                    form.restart(values);
                }}
                initialValues={{
                    username: user.username,
                    email: user.email,
                    password: "",
                }}
                validate={(values) => validateAuth(values, false, true, user.email)}
                render={({ handleSubmit, submitting, pristine }) => (
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">

                            <fieldset disabled={!isEditing}>
                                <ProfileFormFields />
                            </fieldset>
                        </div>

                        <ProfileActions
                            isEditing={isEditing}
                            onEdit={onEdit}
                            onCancel={onCancel}
                            onLogout={onLogout}
                        />
                    </form>
                )}
            />
        </div>
    );
};

export default ProfileForm;
