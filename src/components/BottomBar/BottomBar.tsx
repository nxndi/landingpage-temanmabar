import React from "react";
import SettingModalPartial from "./_partial/Setting.partial";
import OclockPartial from "./_partial/Oclock.partial";

const BottomBar: React.FC = () => {
  return (
    <>
      {/* Left side - Theme toggle button */}
      <div className="fixed bottom-2 left-3 z-10">
        <SettingModalPartial />
      </div>

      {/* Right side - Email link */}
      <div className="fixed bottom-2 right-3 z-10">
        {/* <a
          href="mailto:nandirifaldi25@gmail.com"
          className="text-[15px] font-medium text-black dark:text-white hover:opacity-70 transition-opacity backdrop-blur-sm"
        >
          Email Us
        </a> */}
        <OclockPartial />
      </div>
    </>
  );
};

export default BottomBar;
