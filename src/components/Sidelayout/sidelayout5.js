import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { X } from "lucide-react";
import { useTheme } from '../Layout/ThemeContext/ThemeContext'; // Import the theme context
import Export from "../../components/Widgets/Export/Export";
import { useAuth } from "../../Providers/AuthProvider/AuthProvider";

export default function SideLayout5({
  children,
  width = "454.84px",
  // height = "calc(95vh - 2rem)",
  onClose,
  mapview
}) {
  const [isOpen, setIsOpen] = useState(true); // Controls panel visibility
  const [isFullyClosed, setIsFullyClosed] = useState(false);
  const [toggleCount, setToggleCount] = useState(0);
  const panelRef = useRef(null); // Ref to the side panel div
  const { isDarkMode, isLangArab } = useTheme(); // Access the dark mode state
  const {exportWidget} = useAuth();
  const [panelHeight, setPanelHeight] = useState("95%");
  const [ToggleDragHeight,setToggleDragHeight] = useState(false)

  // Toggle function to slide panel in or out
  const toggleSideLayout = () => {
    if (!isFullyClosed) {
      setIsOpen((prev) => !prev); // Toggle visibility
      setToggleCount((prev) => prev + 1); // Increment toggle count
    }
    if (isOpen) {
      // This will hide the panel (slide out)
      setIsOpen(false);
    } else {
      // Re-open the side panel
      setIsOpen(true);
      setIsFullyClosed(false); // In case it was fully closed
    }
  };

  const closePanel = () => {
    if(exportWidget){
      exportWidget.destroy();
    }  
    setIsFullyClosed(true);
    onClose();
  };

  // Function to detect clicks outside of the panel, now disabled to prevent automatic closing
  const handleClickOutside = (event) => {
    if (panelRef.current && !panelRef.current.contains(event.target)) {
      // Do nothing here, we no longer close the panel on outside clicks
    }
  };

 
  

  useEffect(() => {
    // If the panel is fully closed, call onClose after a short delay
    if (isFullyClosed) {
      const timer = setTimeout(() => {
        onClose();
      }, 300); // Adjust this timing to match your transition duration

      return () => clearTimeout(timer);
    }
  }, [isFullyClosed, onClose]);

  useEffect(() => {

   

    // Add event listener to detect clicks outside the panel
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Remove event listener when component unmounts
      document.removeEventListener("mousedown", handleClickOutside);
    };

  }, []);

  useEffect(()=>{
    if (window.innerWidth <= 600) {
      setToggleDragHeight(true)
    }else{
      setToggleDragHeight(false)
    }
  },[])

  const startYRef = useRef(null);
  const startHeightRef = useRef(null);

  const handleDragStart = (e) => {
    startYRef.current = e.touches ? e.touches[0].clientY : e.clientY;
    startHeightRef.current = panelRef.current.getBoundingClientRect().height;
    window.addEventListener("mousemove", handleDragging);
    window.addEventListener("mouseup", handleDragEnd);
    window.addEventListener("touchmove", handleDragging);
    window.addEventListener("touchend", handleDragEnd);
};


  const handleDragging = (e) => {
    const currentY = e.touches ? e.touches[0].clientY : e.clientY;
    const deltaY = currentY - startYRef.current; // Adjust for dragging down
    const newHeight = startHeightRef.current - deltaY; // Reduce height from the top

    if (newHeight < window.innerHeight * 0.2) {
      setPanelHeight("20%"); // Set a minimum height
    } else if (newHeight > window.innerHeight * 0.9) {
      setPanelHeight("90%"); // Set a maximum height
    } else {
      setPanelHeight(newHeight + "px"); // Adjust height dynamically
    }
  };




  const handleDragEnd = () => {
    window.removeEventListener("mousemove", handleDragging);
    window.removeEventListener("mouseup", handleDragEnd);
    window.removeEventListener("touchmove", handleDragging);
    window.removeEventListener("touchend", handleDragEnd);
};

  if (isFullyClosed) return null;

  return (
    <div
    dir={isLangArab && "rtl"}
    style={{ height: ToggleDragHeight && panelHeight }}
      ref={panelRef} // Assign the ref to the side panel div
      className={`fixed -bottom-9  sm:top-16 w-[95%] sm:w-[400px] laptop_s:w-[${width}] 2xl:h-[73%] h-[75%] sm:h-[68%] laptop_s:h-[90%] ${ isLangArab?"right-3 sm:left-16 laptop_s:left-3":"right-3 sm:right-16 laptop_s:right-3"} transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : ( isLangArab?"-translate-x-[104%] sm:-translate-x-[116%] laptop_s:-translate-x-[104%] ":"translate-x-[103%] sm:translate-x-[116%] laptop_s:translate-x-[103%]")
      }`}
      // style={{ width, height }}
    >

      <div className={`relative   sm:h-[65%] tab:h-[90%]  h-[98%]  sm:w-[80%] tab:w-full  sm:float-none w-full float-end rounded-2xl shadow-lg overflow-hidden border transition-colors duration-300 ${

          isDarkMode
            ? "bg-[rgba(96,96,96,0.8)] bg-opacity-80 border-none" // Dark mode styles
            : "bg-white bg-opacity-70 border-white text-gray-700"
        }`}>
          <div
          className="absolute top-2 left-1/2 flex sm:hidden -translate-x-1/2 w-12 h-1 rounded-full bg-gray-400 cursor-pointer"
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
        ></div>
        {/* X Close Button to slide the panel out */}
        <button
          onClick={closePanel}
          className={`absolute top-4 ${isLangArab?"left-4":"right-4"} p-1 transition-colors ${
            isDarkMode ? "text-[#FFFFFFCC] text-opacity-80" : "text-gray-600 hover:text-gray-900"
          }`}
          aria-label="Close side panel"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="p-6 overflow-y-auto  2xl:mb-[50px]  h-full">
          {children || (
            <p className={`font-poppins font-medium text-${isDarkMode ? "[#FFFFFFCC]" : "black"}`}>
             { isLangArab?"تصدير البيانات": " Export Data"}
            </p>
          )}
        </div>
        <div className={` ${panelHeight < "50%" && "hidden"} h-full 2xl:mb-0`} ><Export mapview={mapview}/></div>
      </div>

      {/* Toggle button to slide panel in and out */}
      <div className={`absolute hidden sm:block top-4 ${isLangArab?"-right-7":"-left-6"}`}>
        <button
          onClick={toggleSideLayout}
          className="relative w-8 h-32 focus:outline-none"
          aria-label={isOpen ? "Close side panel" : "Open side panel"}
        >
          {isLangArab ?<svg
      width="32"
      height="128"
      viewBox="0 0 64 371"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: 'relative',
        top: '1px',
        right: '3px',
      }}
    >
      <g
        clipPath="url(#clip0_4011_11301)"
        transform="scale(-1, 1) translate(-64, 0)" // Flipping horizontally
      >
        <path
          d="M3.82642 130.396L3.82598 244.617C3.82594 252.779 6.14893 260.773 10.5235 267.664L70.7275 362.497V8.50244L10.1031 108.027C5.99796 114.766 3.82645 122.505 3.82642 130.396Z"
          fill={isDarkMode ? "rgba(96, 96, 96, 0.8)" : "#EBEFF2"}
          stroke={isDarkMode ? "rgba(96, 96, 96, 0.8)" : "#EEF3F7"}
          strokeWidth="6"
        />
      </g>
      <defs>
        <clipPath id="clip0_4011_11301">
          <rect width="64" height="371" fill="white" />
        </clipPath>
      </defs>
    </svg>:  <svg
              width="32"
              height="128"
              viewBox="0 0 64 371"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                position: "relative",
                top: "1px",
                right: "3px",
              }}
            >
              <g clipPath="url(#clip0_4011_11301)">
                <path
                  d="M3.82642 130.396L3.82598 244.617C3.82594 252.779 6.14893 260.773 10.5235 267.664L70.7275 362.497V8.50244L10.1031 108.027C5.99796 114.766 3.82645 122.505 3.82642 130.396Z"
                  fill={isDarkMode ? "rgba(96, 96, 96, 0.8)" : "#EBEFF2"} // Updated for dark mode
                  stroke={isDarkMode ? "rgba(96, 96, 96, 0.8)" : "#EEF3F7"}
                  strokeWidth="6"
                />
              </g>
              <defs>
                <clipPath id="clip0_4011_11301">
                  <rect width="64" height="371" fill="white" />
                </clipPath>
              </defs>
            </svg>}

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <IoIosArrowForward
              className={`text-black text-xl transition-transform duration-300 ${
                isOpen ? "rotate-360" : ""
              } ${!isOpen && (toggleCount > 0 ? "rotate-180" : "")}`}
              style={{ color: isDarkMode ? "#fff" : "#000" }}
            />
          </div>
        </button>
      </div>
    </div>
  );
}
