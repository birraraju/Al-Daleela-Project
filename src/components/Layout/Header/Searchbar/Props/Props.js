import { Label } from "../../../../ui/label";

export default function Props({
  inputClicked,
  setInputClicked,
  setIscategory,
  handleCloseResponsiveSearch,
  iscategory
}) {
  return (
    <>
      {/* Search Icon */}
      <div className="relative z-[2]">
        <Label htmlFor="search" className="absolute mobile_s:-top-7 laptop_m:-top-[26px] left-3">
          <img
            src={`${process.env.PUBLIC_URL}/Header/Searchbar/search-${inputClicked || iscategory ? "black.svg" : "white.svg"}`}
            alt=""
            className="h-4"
          />
        </Label>

        {/* Line */}
        <Label htmlFor="search" className="absolute mobile_s:-top-[30px] laptop_m:-top-[28px] left-11">
          <img
            src={`${process.env.PUBLIC_URL}/Header/Searchbar/line-${inputClicked || iscategory ? "black.svg" : "white.svg"}`}
            alt=""
          />
        </Label>

        {/* Close */}
        {(inputClicked || iscategory) && (
          <div
            onClick={() => {
              setInputClicked(false);
              setIscategory(false);
              handleCloseResponsiveSearch();
            }}
            className="absolute mobile_s:-top-7 laptop_m:-top-[26px] sm:right-36 right-32 cursor-pointer"
          >
            <img src={`${process.env.PUBLIC_URL}/Header/Searchbar/close.svg`} alt="" className="w-5" />
          </div>
        )}

        {/* Line */}
        {(inputClicked || iscategory) && (
          <Label htmlFor="search" className="absolute mobile_s:-top-[30px] laptop_m:-top-[28px] sm:right-32 right-28">
            <img src={`${process.env.PUBLIC_URL}/Header/Searchbar/line-black.svg`} alt="" />
          </Label>
        )}
      </div>
    </>
  );
}
