import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { X } from 'lucide-react'; // X icon import
import Measurements from "../../components/Widgets/Measurement/Measurements";

export default function SideLayout3({ children, width = "454.84px", height = "calc(95vh - 2rem)", onClose, mapview }) {
  const [isOpen, setIsOpen] = useState(true);  // Controls panel visibility
  const [isFullyClosed, setIsFullyClosed] = useState(false);
  const [toggleCount, setToggleCount] = useState(0);
  const panelRef = useRef(null); // Create a reference for the panel

  // Toggle function to slide panel in or out
  const toggleSideLayout = () => {
    if (!isFullyClosed) {
      setIsOpen(prev => !prev); // Toggle visibility
      setToggleCount(prev => prev + 1); // Increment toggle count
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
    // This will fully close the side panel (remove it from view)
    setIsFullyClosed(true);
    onClose();
  };

  useEffect(() => {
    // If the panel is fully closed, call onClose after a short delay
    // This allows for any closing animations to complete
    if (isFullyClosed) {
      const timer = setTimeout(() => {
        onClose();
      }, 300); // Adjust this timing to match your transition duration

      return () => clearTimeout(timer);
    }
  }, [isFullyClosed, onClose]);

  useEffect(() => {
    // Function to handle clicks outside the panel
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        closePanel(); // Close the panel if clicked outside
      }
    };

    // Add event listener to detect clicks outside the panel
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Cleanup event listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (isFullyClosed) return null;

  return (
    <div
      ref={panelRef} // Attach ref to the panel
      className={`fixed top-16 right-3 transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      style={{ width, height }}
    >
      <div className="relative h-[65%] w-full bg-white bg-opacity-70 backdrop-blur-lg rounded-2xl shadow-lg overflow-hidden border border-white">
        {/* X Close Button to slide the panel out */}
        <button
          onClick={closePanel}
          className="absolute top-4 right-4 p-1 text-gray-600 hover:text-gray-900 transition-colors"
          aria-label="Close side panel"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="p-6 overflow-y-auto h-full">
          {children || (
            <p className="text-gray-700 font-poppins font-medium">
              Measurements
            </p>
          )}
        </div>
        <div><Measurements mapview={mapview}/></div>
      </div>

      {/* Toggle button to slide panel in and out */}
      <div className="absolute top-4 -left-6">
        <button
          onClick={toggleSideLayout}
          className="relative w-8 h-32 focus:outline-none"
          aria-label={isOpen ? "Close side panel" : "Open side panel"}
        >
          <svg
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
            <g clipPath="url(#clip0_4011_11301)">
              <path
                d="M3.82642 130.396L3.82598 244.617C3.82594 252.779 6.14893 260.773 10.5235 267.664L70.7275 362.497V8.50244L10.1031 108.027C5.99796 114.766 3.82645 122.505 3.82642 130.396Z"
                fill="#EBEFF2"
                stroke="#EEF3F7"
                strokeWidth="6"
              />
            </g>
            <defs>
              <clipPath id="clip0_4011_11301">
                <rect width="64" height="371" fill="white" />
              </clipPath>
            </defs>
          </svg>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <IoIosArrowForward
              className={`text-black text-xl transition-transform duration-300 ${
                isOpen ? "rotate-360" : ""
              } ${!isOpen && (toggleCount > 0 ? "rotate-180" : "")}`}
            />
          </div>
        </button>
      </div>
    </div>
  );
}
