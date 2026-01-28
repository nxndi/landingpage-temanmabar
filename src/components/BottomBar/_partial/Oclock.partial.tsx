import React, { useState, useEffect } from "react";

const OclockPartial: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    // Fungsi untuk memformat waktu dengan AM/PM
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";

      // Konversi ke format 12 jam
      const formattedHours = hours % 12 || 12; // 0 jam akan menjadi 12

      // Pastikan menit selalu dua digit
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

      setCurrentTime(`${formattedHours} : ${formattedMinutes} ${ampm}`);
    };

    // Update waktu setiap detik
    updateTime(); // Panggil sekali untuk menghindari delay 1 detik
    const intervalId = setInterval(updateTime, 1000);

    // Cleanup interval saat komponen unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="text-[15px] font-medium text-black dark:text-white backdrop-blur-sm">
      {currentTime}
    </div>
  );
};

export default OclockPartial;
