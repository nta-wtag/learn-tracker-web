import React from "react";
import { Edit3, Save, LogOutIcon, X } from "lucide-react";
import Button from "components/base-components/Button";

interface ProfileActionsProps {
  isEditing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onLogout: () => void;
}

const ProfileActions: React.FC<ProfileActionsProps> = ({
  isEditing,
  onEdit,
  onCancel,
  onLogout,
}) => {
  return (
    <div className="mt-8 flex justify-between">
      <Button
        variant="danger"
        icon={<LogOutIcon />}
        text="Log Out"
        onClick={onLogout}
        type="button"
      />

      <div className="flex gap-2">
        {isEditing ? (
          <>
            <Button
              variant="secondary"
              icon={<X />}
              text="Cancel"
              onClick={onCancel}
              type="button"
            />
            <Button icon={<Save />} text="Save Changes" type="submit" />
          </>
        ) : (
          <Button
            variant="secondary"
            icon={<Edit3 />}
            text="Edit Profile"
            onClick={onEdit}
            type="button"
          />
        )}
      </div>
    </div>
  );
};

export default ProfileActions;
