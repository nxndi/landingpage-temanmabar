import React, { useContext, useState } from "react";
import Button from "../../Ui/Button";
import useDarkMode from "../../../hooks/useDarkMode";
import DARK_MODE from "../../../constants/darkMode.constant";
import { motion, AnimatePresence } from "framer-motion";

interface SettingModalPartialProps {}

const SettingModalPartial: React.FC<SettingModalPartialProps> = ({}) => {
  const { darkModeStatus, setDarkModeStatus } = useDarkMode();
  const [isAnimating, setIsAnimating] = useState(false);

  // Fungsi untuk mengubah mode secara siklikal
  const handleCycleMode = () => {
    setIsAnimating(true);

    // Delay the actual mode change to allow animation to complete
    setTimeout(() => {
      if (darkModeStatus === DARK_MODE.DARK) {
        setDarkModeStatus(DARK_MODE.LIGHT);
      } else if (darkModeStatus === DARK_MODE.LIGHT) {
        setDarkModeStatus(DARK_MODE.SYSTEM);
      } else {
        setDarkModeStatus(DARK_MODE.DARK);
      }
      setIsAnimating(false);
    }, 150); // Half of the animation duration
  };

  // Pilih teks sesuai mode
  let modeText = "DRK";
  if (darkModeStatus === DARK_MODE.LIGHT) modeText = "LGT";
  if (darkModeStatus === DARK_MODE.SYSTEM) modeText = "SYS";

  return (
    <Button
      className="!bg-transparent !border-none !rounded-none !text-black dark:!text-white !px-1 !py-0"
      variant="solid"
      size="sm"
      color="primary"
      aria-label="Toggle theme mode"
      onClick={handleCycleMode}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={modeText}
          initial={{ opacity: 0, filter: "blur(8px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.2 }}
          className="font-medium text-[15px]"
        >
          {modeText}
        </motion.div>
      </AnimatePresence>
    </Button>
  );
};

export default SettingModalPartial;
