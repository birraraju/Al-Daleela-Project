import { X } from "lucide-react";
import { useState } from "react";
import LoginLogo from '../../../../../assets/PopLoginAuth/Logo.svg'
import { useTheme } from '../../../../Layout/ThemeContext/ThemeContext'; // Import the theme context
import { useAuth } from "../../../../../Providers/AuthProvider/AuthProvider";



export default function FooterLogin({setPopup,setResetFooter}) {
  // const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup forms
  const [showPopup, setShowPopup] = useState(true); // State to control popup visibility
  const { setIsLogin,setsSignup } = useTheme(); // Access the dark mode state
  const {setIsEditPOI} = useAuth();


  if (!showPopup) return null; // If popup is not shown, render nothing

  const handleClose = () => {
    setPopup(null);
    setIsEditPOI(false)
    setResetFooter(true);
    setTimeout(() => setResetFooter(false), 100);
    setShowPopup(false)
  };

  return (
    <div className="fixed top-12 left-[38%] overflow-y-auto max-h-[670px] w-[350px] bg-gray-200 rounded-xl shadow-lg m-4 mt-40">
      <div className='p-5 text-black bg-white rounded-lg shadow-md relative'>
        
        {/* Cancel Button */}
        <X
          className='absolute top-4 right-4 text-gray-600 hover:text-black cursor-pointer' // Added cursor pointer for better UX
          onClick={() => {handleClose();}} // Close the popup
          aria-label="Cancel"
        />

        <div className='flex justify-center py-2'>
          <img src={LoginLogo} alt="Logo" /> {/* Directly reference the logo in the public directory */}
        </div>

            <h1 className='text-center py-4'>Login required for<br />bookmarks</h1>

            <button
              className='w-full bg-[#38a4d2] py-2 rounded-lg text-white'
              onClick={() => {setIsLogin(true);handleClose();setShowPopup(false)}} // Placeholder for login functionality
              aria-label="Login"
            >
              Login
            </button>

            <h1 className='text-center py-2'>or</h1>

            <button
              className='w-full custom-gradient py-2 rounded-lg text-white'
              onClick={() => {setsSignup(true);handleClose();setShowPopup(false)}} // Switch to signup UI
              aria-label="Create new account"
            >
              Create new account
            </button>
      </div>
    </div>
  );
}
