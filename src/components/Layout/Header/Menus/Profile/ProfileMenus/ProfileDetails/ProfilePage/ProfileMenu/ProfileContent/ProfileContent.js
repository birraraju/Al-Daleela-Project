import React from "react";
import { Button } from "../../../../../../../../../../components/ui/button";
import { useAuth } from "../../../../../../../../../../Providers/AuthProvider/AuthProvider";

export default function ProfileContent({ 
  isEditProfile, 
  setIsEditProfile, 
  setIsChangePassword, 
  setIsProfile 
}) {
  const {profiledetails} = useAuth()
  return (
    <>
      {!isEditProfile ? (
        <div className="flex justify-between items-center gap-4">
          <div className="w-[20%]">
            <img
              src={`${process.env.PUBLIC_URL}/Header/Profile/ProfileDetails/Profile.svg`}
              alt="Profile"
              className="w-20"
            />
          </div>

          <div className="w-[80%]">
            <div className="tracking-wide">
              <h1 className="text-lg font-medium">{profiledetails.username}</h1>
              <p className="text-base font-light">{profiledetails.email}</p>
            </div>

            <div className="flex justify-between items-center gap-4">
              <Button onClick={() => setIsEditProfile(true)} asChild>
                <div className="w-1/2 h-12 py-5 cursor-pointer btn-gradient text-white text-base rounded-xl mt-4 tracking-wide">
                  Edit Info
                </div>
              </Button>

              <Button
                onClick={() => {
                  setIsChangePassword(true);
                  setIsProfile(false);
                }}
                variant="outline"
                className="w-1/2 h-10 bg-none shadow-none rounded-xl mt-4 tracking-wide font-normal text-sm border border-[#909090]"
              >
                Change Password
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <div className="relative h-28 w-28 rounded-full overflow-hidden">
            <img
              src="/Header/Profile/admin.png"
              alt="Admin"
              className="w-full h-full rounded-full"
            />
            <div className="absolute bottom-0 right-0">
              <svg
                width="118"
                height="39"
                viewBox="0 0 118 39"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.00585938 0.556641C9.87425 23.143 32.4117 38.9273 58.6357 38.9273C84.8598 38.9273 107.397 23.143 117.266 0.556641H0.00585938Z"
                  fill="black"
                  fillOpacity="0.7"
                />
              </svg>
            </div>
            <p className="text-white absolute bottom-2 left-10">Edit</p>
          </div>
        </div>
      )}
    </>
  );
}
