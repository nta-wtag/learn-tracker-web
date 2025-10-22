import React from "react";

interface ProfileAvatarProps {
  username: string;
  email: string;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ username, email }) => {
  const initial = username?.[0]?.toUpperCase() || "?";

  return (
    <div className="flex items-center space-x-6">
      <div className="relative">
        <div className="bg-lightPrimaryColor text-darkPrimaryColor w-24 h-24 rounded-full flex items-center justify-center text-4xl font-black">
          {initial}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-900 capitalize">{username}</h3>
        <p className="text-sm text-gray-500">{email}</p>
      </div>
    </div>
  );
};

export default ProfileAvatar;
