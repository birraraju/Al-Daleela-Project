import React, { useState } from "react";
import { Button } from "../../../../../../../../../../components/ui/button";
import { useAuth } from "../../../../../../../../../../Providers/AuthProvider/AuthProvider";
import { useTheme } from '../../../../../../../../../Layout/ThemeContext/ThemeContext'; // Import the theme context
// import SampleImageProfile from "../../../../../../../../../../assets/Header/Profile/ProfileDetails/Profile.svg"

export default function ProfileContent({ 
  isEditProfile, 
  setIsEditProfile, 
  setIsChangePassword, 
  setIsProfile,
  setChangeCloseProfile,
  setProfileImage,
  profileImage,
  setFile
}) {
  const { profiledetails } = useAuth();
  const { isDarkMode, isLangArab } = useTheme(); // Access the dark mode state
  // const [profileImage, setProfileImage] = useState(SampleImageProfile); // State to manage the profile image
  // const [file, setFile] = useState(null);

  // Handle file change
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result); // Update profile image preview
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <>
      {!isEditProfile ? (
        <div className="flex justify-between items-center gap-4">
          <div className="w-[20%]">
            <img 
              // src={`${process.env.PUBLIC_URL}/Header/Profile/ProfileDetails/Profile.svg`}
              src={profiledetails && profiledetails.imageUrl ? profiledetails.imageUrl : `${process.env.PUBLIC_URL}/Header/Profile/ProfileDetails/Profile.svg`}
              alt="Profile"
              className="sm:w-16 w-18 h-18 sm:h-16 rounded-full sm:rounded-full object-cover"
            />
          </div>

          <div className="w-[80%]">
            <div className="tracking-wide">
              <h1 className={`sm:text-[14px] text-sm font-medium text-${isDarkMode ? 'white' : 'gray-600'} `}>
                {profiledetails.username ? profiledetails.username : profiledetails.firstName}
              </h1>
              <p className={`sm:text-[14px] text-xs font-light text-${isDarkMode ? '[#FFFFFFCC]' : 'gray-600'} `}>
                {profiledetails.email}
              </p>
            </div>

            <div className="flex justify-between items-center gap-4">
              <Button onClick={() => { setIsEditProfile(true); }} asChild>
                <div className="w-2/3 h-10 py-5 cursor-pointer btn-gradient text-white text-base rounded-xl mt-4 tracking-wide">
                  {isLangArab ? "تعديل المعلومات" : "Edit Info"}
                </div>
              </Button>

              <Button
                onClick={() => {
                  setIsChangePassword(true);
                  setIsProfile(false);
                  setChangeCloseProfile(true);
                }}
                variant="outline"
                className={`w-1/2 sm:h-10 h-9 bg-none shadow-none sm:rounded-xl rounded-md mt-4 tracking-wide font-normal sm:text-sm text-xs border border-[#909090] text-${isDarkMode ? '[#FFFFFFCC]' : 'black'} `}
              >
                {isLangArab ? "تغيير كلمة المرور" : "Change Password"}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <div className="relative h-28 w-28 rounded-full overflow-hidden">
            <img
              src={profiledetails && profiledetails.imageUrl ? profiledetails.imageUrl : profileImage}
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
            <p
              className="text-white absolute bottom-2 left-10 cursor-pointer"
              onClick={() => document.getElementById("fileInput").click()} // Open file input on click
            >
              {isLangArab ? "تعديل" : "Edit"}
            </p>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
        </div>
      )}
    </>
  );
}
