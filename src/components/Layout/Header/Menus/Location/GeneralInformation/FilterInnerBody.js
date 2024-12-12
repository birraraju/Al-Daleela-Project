import { useTheme } from "../../../../../Layout/ThemeContext/ThemeContext";
import { useState } from "react";
import RedClose from '../../../../../../assets/Header/GeneralInformation/CloseFilterRed.svg'
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { late } from "zod";

export default function FilterInnerBody() {
  const { isDarkMode, isLangArab } = useTheme();
  const [LayerOneData, setLayerOneData] = useState("--empty--");
  const [LayerTwoData, setLayerTwoData] = useState("--empty--");
  const [LayerThreeData, setLayerThreeData] = useState("--empty--");
  const [activeLayer1, setActiveLayer1] = useState(false); // Track which layer dropdown is active
  const [activeLayer2, setActiveLayer2] = useState(false);
  const [activeLayer3, setActiveLayer3] = useState(false);

  const SampleData = {
    Layers: ["Marine", "Terrestrial", "Island"],
    Layer2: ["fields-1", "fields-2", "fields-3"],
    Layer3: ["domain-1", "domain-2", "domain-3"],
  };

  const handleCancel =()=>{
    setLayerOneData("--empty--")
    setLayerTwoData("--empty--")
    setLayerThreeData("--empty--")
  }

  const handleCloseRedClick = ()=>{
    alert("RedCancelClicked !")
  }
 
  const handleSubmitForm = ()=>{
     alert("Submit Filter !")
  }
  

  return (
    <div className=" relative h-full" dir={isLangArab ? "rtl" : "ltr"}>
      <div className={`z-50 ${isDarkMode ? "text-white" : "text-black"}`}>
        <div className=" max-h-[calc(100vh-100px)] overflow-y-auto">
          {/* Layer 1 */}
          <div className="flex justify-between gap-3 w-full ">
            <span className="space-y-2 w-full">
              <div
                className="flex items-center justify-between cursor-pointer text-[13px] h-9 w-full rounded-md p-2 text-black bg-[#FFFFFF] border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                onClick={() => setActiveLayer1(!activeLayer1)}
              >
                <p>{LayerOneData}</p>
                <span>{activeLayer1 ? <FaChevronUp className="text-gray-500" /> : <FaChevronDown className="text-gray-500" />}</span>
              </div>
              {activeLayer1 && (
                <div
                  className={`block text-[13px] min-h-[100px] w-full rounded-md p-2 text-black bg-[#FFFFFF] border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
                >
                  {SampleData.Layers.map((item) => (
                    <div
                      key={item}
                      className="cursor-pointer hover:bg-gray-200 p-1"
                      onClick={() => setLayerOneData(item)}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </span>

            {/* Layer 2 */}
            <span className="space-y-2 w-full">
              <div
                className="flex items-center justify-between cursor-pointer block text-[13px] h-9 w-full rounded-md p-2 text-black bg-[#FFFFFF] border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                onClick={() => setActiveLayer2(!activeLayer2)}
              >
                <p>{LayerTwoData}</p>
                <span>{activeLayer2 ? <FaChevronUp className="text-gray-500" /> : <FaChevronDown className="text-gray-500" />}</span>
              </div>
              {activeLayer2 && (
                <div
                  className={`block text-[13px] min-h-[100px] w-full rounded-md p-2 text-black bg-[#FFFFFF] border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
                >
                  {SampleData.Layer2.map((item) => (
                    <div
                      key={item}
                      className="cursor-pointer hover:bg-gray-200 p-1"
                      onClick={() => setLayerTwoData(item)}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </span>

            {/* Layer 3 */}
            <span className="space-y-2 w-full">
              <div
                className="flex items-center justify-between cursor-pointer block text-[13px] h-9 w-full rounded-md p-2 text-black bg-[#FFFFFF] border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                onClick={() => setActiveLayer3(!activeLayer3)}
              >
                <p>{LayerThreeData}</p>
                <span>{activeLayer3  ? <FaChevronUp className="text-gray-500" /> : <FaChevronDown className="text-gray-500" />}</span>
              </div>
              {activeLayer3 && (
                <div
                  className={`block text-[13px] min-h-[100px] w-full rounded-md p-2 text-black bg-[#FFFFFF] border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
                >
                  {SampleData.Layer3.map((item) => (
                    <div
                      key={item}
                      className="cursor-pointer hover:bg-gray-200 p-1"
                      onClick={() => setLayerThreeData(item)}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </span>
            <span  className=" w-[10%] flex justify-center relative items-center"> <button onClick={handleCloseRedClick} className=" absolute top-2 w-[100%]" ><img  src={RedClose} className="w-[100%]"  alt="" /></button></span>
          </div>
          
        </div>

        {/* Action Buttons */}
        <div className="flex pt-6 absolute gap-3 right-2 bottom-0 justify-between items-baseline px-4 sm:px-2">
          <button
           onClick={handleCancel}
            className={`sm:px-12 px-9 font-500 sm:py-2 py-2 border rounded-lg transition-colors ${
              isLangArab ? "text-[14px]" : "text-[14px]"
            } ${
              isDarkMode
                ? "bg-transparent border border-white text-white"
                : "border-[#909090] text-[#505050]"
            }`}
          >
            {isLangArab ? "إلغاء" : "Cancel"}
          </button>
          <button
          onClick={handleSubmitForm}
            className={`sm:px-12 px-9 font-500 sm:py-2 text-[14px] py-2 rounded-lg transition-colors ${
              LayerOneData !== "--empty--" ||
              LayerTwoData !== "--empty--" ||
              LayerThreeData !== "--empty--"
                ? "bg-custom-gradient text-white"
                : "bg-gray-600/65 text-white"
            }`}
            disabled={
              LayerOneData === "--empty--" &&
              LayerTwoData === "--empty--" &&
              LayerThreeData === "--empty--"
            }
          >
            {isLangArab ? "إرسال" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}