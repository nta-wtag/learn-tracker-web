import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import { useAuthRedux } from "hooks/useAuthRedux";
import { User, Edit3, Save, LogOutIcon } from "lucide-react";
import PageHeader from "components/base-components/PageHeader";
import Button from "components/base-components/Button";
import Input from "components/base-components/Input";
import EmptyState from "components/base-components/EmptyState";

const Profile: React.FC = () => {
  const { user, logoutUser, updateUser } = useAuthRedux();
  const [isEditing, setIsEditing] = useState(false);

  if (!user) {
    return (
      <EmptyState
        title="No User Found"
        description="Please log in to view your profile."
        actionText="Go to Login"
        actionLink="/login"
      />
    );
  }

  const onSubmit = (values: any) => {
    updateUser?.(values);
    setIsEditing(false);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Profile Settings"
        subtitle="Manage your personal information"
      />

      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        <Form
          onSubmit={onSubmit}
          initialValues={{
            username: user.username,
            email: user.email,
            password: "",
          }}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className="p-6 space-y-6">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <div className="bg-lightPrimaryColor text-darkPrimaryColor w-24 h-24 rounded-full flex items-center justify-center text-4xl font-black">
                      {user.username?.[0]?.toUpperCase()}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {user.username}
                    </h3>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field
                    name="username"
                    validate={(v) => (!v ? "Required" : undefined)}
                  >
                    {({ input, meta }) => (
                        <Input
                          input={input}
                          error={meta.error}
                          touched={meta.touched}
                          placeholder="Enter your name"
                          type="text"
                          label="Username"
                        />
                    )}
                  </Field>

                  <Field
                    name="email"
                    validate={(v) => (!v ? "Required" : undefined)}
                  >
                    {({ input, meta }) => (
                        <Input
                          input={input}
                          error={meta.error}
                          touched={meta.touched}
                          placeholder="Enter your email"
                          type="email"
                          label="Email"
                        />
                    )}
                  </Field>
                </div>

                <Field name="password">
                  {({ input, meta }) => (
                      <Input
                        input={input}
                        error={meta.error}
                        touched={meta.touched}
                        placeholder="••••••••"
                        type="password"
                        label="Password"
                      />
                  )}
                </Field>
                <p className="text-xs text-gray-500">
                  Leave blank to keep your current password.
                </p>
              </div>

              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900/40 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                <Button
                  variant="danger"
                  icon={<LogOutIcon />}
                  text="Log Out"
                  onClick={logoutUser}
                />

                {!isEditing ? (
                  <Button
                    variant="secondary"
                    icon={<Edit3 />}
                    text="Edit Profile"
                    onClick={() => setIsEditing(true)}
                  />
                ) : (
                  <Button icon={<Save />} text="Save Changes" type="submit" />
                )}
              </div>
            </form>
          )}
        />
      </div>
    </div>
  );
};

export default Profile;
