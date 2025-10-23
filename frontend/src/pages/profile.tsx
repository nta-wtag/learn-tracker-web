import React from "react";
import PageHeader from "components/base-components/PageHeader";
import EmptyState from "components/base-components/EmptyState";
import { useAuth } from "hooks/useAuth";
import ProfileForm from "components/protected-components/profile-components/ProfileForm";
import { useProfileActions } from "hooks/useProfileActions";

const Profile: React.FC = () => {
  const { user } = useAuth();
  const {
    isEditing,
    handleUpdateProfile,
    handleLogout,
    startEditing,
    cancelEditing,
  } = useProfileActions();

  if (!user) {
    return (
      <EmptyState
        title="No User Found"
        description="Please log in to view your profile."
        actionText="Go to Login"
        actionLink="/auth"
      />
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Profile Settings"
        subtitle="Manage your personal information"
      />

      <ProfileForm
        user={user}
        isEditing={isEditing}
        onSubmit={handleUpdateProfile}
        onEdit={startEditing}
        onCancel={cancelEditing}
        onLogout={handleLogout}
      />
    </div>
  );
};

export default Profile;
