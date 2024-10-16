import { useAuth } from "../../../../../../../Providers/AuthProvider/AuthProvider";
export default function ProfileDetails({
  role,
  setIsPopoverOpen,
  setIsProfileData,
}) {
  const {profiledetails} = useAuth()
  return (
    <>
      {((role !== null)&&(profiledetails !== null)) && (
        <div
          onClick={() => {
            setIsPopoverOpen(false);
            setIsProfileData(true);
          }}
          className="flex justify-start items-center gap-2"
        >
          <div className=" w-8 h-7">
            <img src={`${process.env.PUBLIC_URL}/Header/Profile/ProfileDetails/Profile.svg`} alt="" className=" w-full h-full" />
          </div>

          <div className="flex flex-col cursor-pointer gap-1">
            <p className="font-bold text-black text-opacity-100 text-lg tracking-wider">
              {profiledetails.username ? profiledetails.username : profiledetails.firstName}
            </p>
            <p className="text-base sm:text-sm">{profiledetails.email}</p>
          </div>
        </div>
      )}
    </>
  );
}
