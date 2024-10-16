import { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import Logo from "../../../../assets/GreenLogo.svg";
import Input from "../Input/Input";
import CountryDropdown from "../../../../../src/assets/CountryDropdown.svg";
import { IoEyeOff,IoEye } from "react-icons/io5";
import { useTheme } from '../../../Layout/ThemeContext/ThemeContext'; // Import the theme context


export default function Signup({ onClose, onSigninClick }) {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    password: '',
    email: '',
    phoneNumber: 0,
    organization: '',
    country: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { isDarkMode } = useTheme(); // Access the dark mode state
  const [txtusername, settxtUsername] = useState('');
  const [usernameExists, setUsernameExists] = useState(false);


  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const isFormFilled = () => {
    return Object.values(formData).every(value => value !== '');
  };

  const onSignupClick = async() =>{    
    if (!usernameExists) {
      try {
        const signupObj ={
          username: formData.username,
          firstName: formData.firstName,
          password: formData.password,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          organization: formData.organization,
          country: formData.country,
          role: "user"
        }
        const response = await fetch(`${process.env.REACT_APP_API_URL}/Registration/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(signupObj),
        });
        if (response.ok) {
            // Handle successful signup
            console.log(response);
        } else {
            // Handle error
            console.log(response);
        }
        const data = await response.text();
        if(data){
          console.log(data)
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    } else {
      alert('Username already exists');
    }
    
  }

  useEffect(() => {
    const checkUsername = async () => {
        if (txtusername) {
            try {
                //const response = await fetch(`${process.env.REACT_APP_API_URL}/Registration/check-username/${txtusername}`);
                const response = await fetch(`${process.env.REACT_APP_API_URL}/Registration/check-username`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(txtusername),
              });
                const exists = await response.json();
                setUsernameExists(exists);
            } catch (err) {
                console.log('Error checking username');
            }
        } else {
            setUsernameExists(false);
        }
    };

    const delayDebounceFn = setTimeout(() => {
        checkUsername();
    }, 500); // Debounce the API call

    return () => clearTimeout(delayDebounceFn);
}, [txtusername]);

  return (
    <div className="fixed sm:inset-10 inset-1 flex items-center justify-center z-50 mb-6">
      <div
        ref={modalRef}
        className={`p-4 rounded-2xl border shadow-lg w-full max-w-xl relative transition-colors duration-300 ${isDarkMode ? "bg-[rgba(96,96,96,0.8)] text-white" : "bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg text-black"} `}
        >
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 hover:text-gray-800 ${
            isDarkMode ? "text-[#FFFFFFFF] text-opacity-80" : "text-gray-800"
          }`}        >
          <X className="w-5 h-5" />
        </button>
        <div className="flex flex-col items-center justify-between max-h-[80vh] overflow-y-auto">
          <div className="w-full">
            <div className="flex justify-center mb-4">
              <img src={Logo} alt="Logo" className="h-14" />
            </div>
            <h2 className={`font-omnes text-[28px] font-medium leading-tight text-left mb-1 ${
              isDarkMode ? "text-white" : "text-black"
            }`}>
              Sign Up
            </h2>
            <p className={`font-omnes text-[15px] font-light leading-tight text-left mb-3 text-${isDarkMode ? '[#FFFFFFCC]' : 'gray-600'} `}>
              Please create your account
            </p>
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="grid sm:grid-cols-2 grid-cols-1 gap-2">
                <Input
                  type="text"
                  name="username"
                  placeholder="Username"
                  required
                  onChange={(e)=>{handleChange(e); settxtUsername(e.target.value)}}
                />
                {/* {usernameExists && <p style={{ color: 'red' }}>Username already exists</p>} */}
                {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
                <Input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="grid sm:grid-cols-2 grid-cols-1 gap-2">
                <div className='relative'>
                  <Input
                    type={`${ showPassword?"text":"password"}`}
                    name="password"
                    placeholder="Password"
                    required
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword?<IoEye className={`text-2xl ${
                        isDarkMode ? "text-black" : "text-black"
                      } opacity-50`} />:<IoEyeOff className={`text-2xl ${
                        isDarkMode ? "text-black" : "text-black"
                      } opacity-50`} />}
                  </button>
                </div>
                <div className='relative'>
                  <Input
                    type={`${ showConfirmPassword?"text":"password"}`}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    required
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    // aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword?<IoEye className={`text-2xl ${
                        isDarkMode ? "text-black" : "text-black"
                      } opacity-50`}/>:<IoEyeOff className={`text-2xl ${
                        isDarkMode ? "text-black" : "text-black"
                      } opacity-50`}/>}
                  </button>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 grid-cols-1 gap-2">
                <Input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  onChange={handleChange}
                />
                <Input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  onChange={handleChange}
                />
              </div>
              <div className="grid sm:grid-cols-2 grid-cols-1 gap-2">
                <Input
                  type="text"
                  name="organization"
                  placeholder="Organization"
                  onChange={handleChange}
                />
                <div className="relative">
                  <select
                    name="country"
                    className={`w-full h-[48px] px-3 py-1.5 rounded-xl text-sm appearance-none border transition-colors ${
                      isDarkMode
              ? "bg-[#FFFFFF] bg-opacity-30 text-white border-transparent "
              : "bg-white text-black border-transparent"
          }`}
                    onChange={handleChange}
                  >

                    <option className={`${
                      isDarkMode
              ? "text-black"
              :  "text-black"
          }`} value="">Country</option>
                    <option className={`${
                      isDarkMode
              ? "text-black"
              :  "text-black"
          }`} value="United Arab Emirates">United Arab Emirates</option>
                    <option className={`${
                      isDarkMode
              ? "text-black"
              :  "text-black"
          }`} value="United States">United States</option>
                    <option className={`${
                      isDarkMode
              ? "text-black"
              :  "text-black"
          }`} value="United Kingdom">United Kingdom</option>
                  </select>
                  <img src={CountryDropdown} alt="Dropdown" className="absolute top-1/2 right-3 -translate-y-1/2" />
                </div>
              </div>
            </form>
          </div>
          <div className="w-full mt-2">
            <button
              type="submit"
              className={`sm:w-[308px] w-[270px] h-[48px] mx-auto block py-2 rounded-xl transition duration-300 text-sm mt-10
                ${
                  isFormFilled()
                  ? isDarkMode
                      ? "bg-gradient-to-r from-[#036068] via-[#596451] to-[#1199A8] text-white"
                      : "bg-gradient-to-r from-[#036068] via-[#596451] to-[#1199A8] text-white"
                    : isDarkMode
                    ? "bg-[white] bg-opacity-20 text-white"
                    : "bg-[#828282] opacity-50 text-white"
                }
              `}
              disabled={!isFormFilled()}
              onClick={onSignupClick}
            >
              Sign Up
            </button>
            <p className={`text-center mt-2 text-[14px] text-${isDarkMode ? '[#FFFFFFCC]' : 'gray-600'} `}>
              Already have an account?{' '}
              <button onClick={onSigninClick} className={`bg-clip-text text-transparent bg-gradient-to-r from-[#036068] via-[#1199A8] to-[#036068] text-[14px] font-medium hover:underline`}
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
