import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

interface PaycheckSliderProps {
  min: number;
  max: number;
  fixboost: any;
  setFixBoost: (value: number) => void;
}
const TaxProfile: React.FC<PaycheckSliderProps> = ({
  min,
  max,
  fixboost,
  setFixBoost,
}) => {
  const handleChange = (newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setFixBoost(newValue);
    }
  };

  const handleAfterChange = (newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setFixBoost(newValue);
    }
  };
  return (
    <div className="block">
      <h2 className="text-cyanBlue text-xl font-medium mb-2">
        Your Tax Profile
      </h2>
      <div className="block space-y-0">
        <div className="flex items-center justify-between gap-10 border-b border-b-lightBlue5 py-3">
          <span className="text-base font-normal text-textgray">Country</span>
          <span className="text-base font-medium text-cyanBlue">US</span>
        </div>
        <div className="flex items-center justify-between gap-10 border-b border-b-lightBlue5 py-3">
          <span className="text-base font-normal text-textgray">State</span>
          <span className="text-base font-medium text-cyanBlue">Albama</span>
        </div>
        <div className="flex items-center justify-between gap-10 border-b border-b-lightBlue5 py-3">
          <span className="text-base font-normal text-textgray">
            Dependents
          </span>
          <span className="text-base font-medium text-cyanBlue">2</span>
        </div>
        <div className="flex items-center justify-between gap-10 border-b border-b-lightBlue5 py-3">
          <span className="text-base font-normal text-textgray">
            Filling Status
          </span>
          <span className="text-base font-medium text-cyanBlue">
            Married filling jointly
          </span>
        </div>
        <div className="flex items-center justify-between gap-10 border-b border-b-lightBlue5 py-3">
          <span className="text-base font-normal text-textgray">
            Last Year AGI
          </span>
          <span className="text-base font-medium text-cyanBlue">$12,000</span>
        </div>
        <div className="flex items-center justify-between gap-10 border-b border-b-lightBlue5 py-3">
          <span className="text-base font-normal text-textgray">
            Current Year Incorne
          </span>
          <span className="text-base font-medium text-cyanBlue">$30,000</span>
        </div>
        <div className="flex items-center justify-between gap-10 py-3">
          <span className="text-base font-normal text-textgray">
            Total Tax Due
          </span>
          <span className="text-base font-medium text-cyanBlue">$4,500.00</span>
        </div>
      </div>
      <div className="mt-8 block">
        <h2 className="text-cyanBlue text-xl font-medium mb-4">
          Profile Summary
        </h2>
        <p className="text-slateColor text-base font-normal">
          John Doe is an employee and a business owner with an income of
          annually currently residing in Alabama who manages investments in
          stocks, bonds, or crypto, pays rent, owns a owns rental property, and
          has 2 child dependents is filing taxes as married filing jointly
        </p>
      </div>
      <div className="block mt-8">
        <div className="flex items-center justify-between gap-5 mt-3 mb-3">
          <div className="text-cyanBlue text-xl font-medium">
            Onboarding Progress{" "}
          </div>
          <div className="text-cyanBlue text-xl font-medium"> {fixboost}%</div>
        </div>
        <div className="relative custom-profile-slider mt-1">
          <Slider
            min={min}
            max={max}
            value={fixboost}
            disabled
            trackStyle={{ backgroundColor: "#1084D8" }}
            handleStyle={{ borderColor: "#1084D8" }}
          />
        </div>
      </div>
      <div className="block mt-20">
        <button className="w-full rounded-full bg-mediumBlueGradient py-3 px-10 text-white font-medium text-base">
          Edit Profile
        </button>
      </div>
    </div>
  );
};
export default TaxProfile;
