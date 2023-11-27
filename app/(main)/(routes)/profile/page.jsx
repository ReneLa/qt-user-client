"use client";

import PasswordChangeForm from "../../_components/password-change-form";
import ProfileForms from "../../_components/profile-forms";

const ProfilePage = () => {
  return (
    <div className="flex flex-col w-full h-full space-y-4">
      <div className="w-full bg-[rgb(20,21,25)] flex flex-col border shadow-sm rounded-xl space-y-6 p-4">
        Account settings
        <p className="text-sm font-regular text-neutral-300/50 mt-1">
          Apply any changes to yu profile the way you like it. Take any approach
        </p>
        <ProfileForms />
      </div>
      <div className="w-full bg-[rgb(20,21,25)] flex flex-col border shadow-sm rounded-xl space-y-6 p-4">
        Change password
        <p className="text-sm font-regular text-neutral-300/50 mt-1">
          Security for your data is an essential. keep you data safe
        </p>
        <PasswordChangeForm />
      </div>
    </div>
  );
};

export default ProfilePage;
