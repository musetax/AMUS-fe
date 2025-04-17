import { useState } from "react";
import TaxBenefitDetail from "./taxBenefit";
import PaycheckSlider from "./taxSlider";
import TaxProfile from "./taxProfile";

const TaxDetails = () => {
  const [fixboost, setFixBoost] = useState<number>(30);
  const [profileBoost, setProfileBoost] = useState<number>(40);
  const [activeTab, setActiveTab] = useState<"benefit" | "profile">("benefit");
  return (
    <>
      <div className="bg-bgGradientBox rounded-2xl p-4 min-h-[750px] mb-5">
        <div className="flex items-center justify-between space-x-4 mb-6 border border-[#6A57F6] border-opacity-20 rounded-full p-2">
          <button
            onClick={() => setActiveTab("benefit")}
            className={`px-6 py-2  rounded-full text-base font-medium flex items-center justify-center transition-all duration-200 ${
              activeTab === "benefit"
                ? "bg-mediumBlueGradient text-white"
                : "text-textgray "
            }`}
          >
            Tax Benefits
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-6 py-2  rounded-full text-base font-medium flex items-center justify-center transition-all duration-200 ${
              activeTab === "profile"
                ? "bg-mediumBlueGradient text-white"
                : "text-textgray"
            }`}
          >
            Tax Profile
          </button>
        </div>

        <div className="block">
          {activeTab === "benefit" ? (
            <TaxBenefitDetail />
          ) : (
            <TaxProfile
              fixboost={profileBoost}
              setFixBoost={setProfileBoost}
              min={30}
              max={100}
            />
          )}
        </div>
      </div>
      {activeTab === "benefit" && (
        <PaycheckSlider
          fixboost={fixboost}
          setFixBoost={setFixBoost}
          min={0}
          max={100}
        />
      )}
    </>
  );
};
export default TaxDetails;
