import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  IconCash,
  IconClipboardText,
  IconInfoCircle,
} from "@tabler/icons-react";
import formatRupiah from "../../../utils/formatRupiah.util";
import icon1 from "../../../assets/icon/icon1.png";
import icon2 from "../../../assets/icon/icon2.png";
import icon3 from "../../../assets/icon/icon3.png";

const defaultCalculatorCopy = {
  titlePrefix: "Kalkulator",
  titleHighlight: "Keuntungan",
  subtitle: "Hitung potensi keuntungan Anda sebagai reseller Teman Mabar",
  modalLabel: "Harga Modal (Rp)",
  modalTooltip: "Perkiraan harga modal dari produk yang dijual",
  sellingLabel: "Harga Jual (Rp)",
  sellingPlaceholder: "40.000",
  sellingErrorLow: (modal: string) =>
    `Harga jual tidak boleh lebih rendah dari harga modal (Rp ${modal})`,
  sellingErrorHigh: "Harga jual maksimal Rp 100.000",
  salesLabel: "Jumlah Penjualan Per Hari",
  monthlyProfitTitle: "Keuntungan Per Bulan",
  basedOn: (count: number) => `Berdasarkan ${count} transaksi per hari`,
  button: "Daftar Sekarang",
  badges: {
    badge1: {
      title: "Katalog Produk Update Otomatis",
      description: "Sinkronisasi stok & harga langsung dari marketplace.",
    },
    badge2: {
      title: "Komisi Cair 24 Jam",
      description: "Penarikan dana fleksibel tanpa batas minimal.",
    },
  },
};

const Calculator: React.FC = () => {
  const { t } = useTranslation("language");
  // State untuk input
  const modalPrice = 25000; // Fixed value
  const [sellingPrice, setSellingPrice] = useState<number | string>("");
  const [dailySales, setDailySales] = useState<number>(10);
  const [showModalTooltip, setShowModalTooltip] = useState(false);

  // State untuk hasil perhitungan
  const [monthlyProfit, setMonthlyProfit] = useState<number>(0);

  const calculateProfit = () => {
    const selling = typeof sellingPrice === "number" ? sellingPrice : 0;
    const sellingTotal = selling * 30 * dailySales;
    const modalTotal = modalPrice * 30 * dailySales;
    return sellingTotal - modalTotal;
  };

  useEffect(() => {
    setMonthlyProfit(calculateProfit());
  }, [sellingPrice, dailySales]);

  // Badge features data
  const badgeFeatures = [
    {
      id: 1,
      icon: IconClipboardText,
      title:
        t("calculator.badges.badge1.title") ||
        defaultCalculatorCopy.badges.badge1.title,
      description:
        t("calculator.badges.badge1.description") ||
        defaultCalculatorCopy.badges.badge1.description,
    },
    {
      id: 2,
      icon: IconCash,
      title:
        t("calculator.badges.badge2.title") ||
        defaultCalculatorCopy.badges.badge2.title,
      description:
        t("calculator.badges.badge2.description") ||
        defaultCalculatorCopy.badges.badge2.description,
    },
  ];

  // Decorative background icons data
  const decorativeIcons = [
    {
      id: 1,
      image: icon1,
      position:
        "absolute -top-4 -right-10 xl:-top-8 xl:-right-20 w-24 h-24 md:w-28 md:h-28",
      rotation: "rotate-12",
      hoverTransform: "group-hover:translate-x-2 group-hover:-translate-y-2",
      zIndex: "z-20",
    },
    {
      id: 2,
      image: icon2,
      position:
        "absolute -bottom-6 -left-6 xl:-bottom-12 xl:-left-12 w-24 h-24 md:w-32 md:h-32",
      rotation: "-rotate-12",
      hoverTransform: "group-hover:-translate-x-1 group-hover:translate-y-2",
      zIndex: "z-20",
    },
    {
      id: 3,
      image: icon3,
      position:
        "absolute -bottom-6 -right-8 md:-bottom-10 md:-right-10 xl:-bottom-4 xl:-right-20 w-24 h-24 md:w-48 md:h-48",
      rotation: "rotate-12",
      hoverTransform: "group-hover:translate-x-2 group-hover:-translate-y-2",
      zIndex: "z-20",
    },
    {
      id: 5,
      image: icon3,
      position:
        "absolute top-2 -left-12 xl:top-4 xl:-left-12 w-24 h-24 md:w-32 md:h-32",
      rotation: "-rotate-12",
      hoverTransform: "group-hover:-translate-x-2 group-hover:-translate-y-2",
      zIndex: "z-20",
    },
  ];

  return (
    <div className="w-full bg-black overflow-hidden">
      <section
        id="calculator-section"
        className="containercustom mx-auto px-4 py-8 md:py-16 xl:py-24"
      >
        <div className="text-center mb-10 md:mb-16 max-w-sm md:max-w-lg xl:max-w-2xl mx-auto">
          <h2 className="relative bg-gradient-to-br from-white from-30% via-[#d5d8f6] via-80% to-[#fdf7fe] bg-clip-text text-transparent font-semibold tracking-tighter text-3xl md:text-4xl lg:text-5xl leading-tight">
            {t("calculator.title_prefix") || defaultCalculatorCopy.titlePrefix}{" "}
            <span className="font-display px-1 italic font-bold text-4xl lg:text-5xl bg-gradient-to-r from-primary-500 via-primary-200 to-primary-500 bg-clip-text text-transparent">
              {t("calculator.title_highlight") ||
                defaultCalculatorCopy.titleHighlight}
            </span>
          </h2>
          <p className="text-[#e9e9e9] leading-tight tracking-tight text-[15px] mt-3">
            {t("calculator.subtitle") || defaultCalculatorCopy.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Left Side - Form Input */}
          <div className="relative bg-primary-900/50 rounded-2xl border border-gray-800 p-2 md:rounded-3xl md:p-3">
            <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 rounded-xl p-4 shadow-[0px_0px_27px_0px_#2D2D2D]">
              <div className="relative flex flex-1 flex-col justify-between gap-8">
                {/* Harga Modal Input */}
                <div className="space-y-2 flex-1 flex flex-col">
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="modal-price"
                      className="text-sm text-neutral-300 font-medium"
                    >
                      {t("calculator.modal_label") ||
                        defaultCalculatorCopy.modalLabel}
                    </label>
                    <button
                      type="button"
                      aria-label="More information about modal price"
                      onMouseEnter={() => setShowModalTooltip(true)}
                      onMouseLeave={() => setShowModalTooltip(false)}
                      onClick={() => setShowModalTooltip(!showModalTooltip)}
                      className="text-neutral-400 cursor-help hover:text-primary-400 transition-colors relative"
                    >
                      <IconInfoCircle className="w-4 h-4" />
                      {showModalTooltip && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-900 border border-gray-700 rounded px-2 py-1 text-xs text-neutral-300 whitespace-normal text-center leading-snug z-20 shadow-lg w-48">
                          {t("calculator.modal_tooltip") ||
                            defaultCalculatorCopy.modalTooltip}
                        </div>
                      )}
                    </button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <IconCash className="w-5 h-5 text-neutral-300" />
                    </div>
                    <input
                      id="modal-price"
                      type="text"
                      value={modalPrice.toLocaleString("id-ID")}
                      readOnly
                      aria-label="Modal price"
                      className="bg-black/50 border border-gray-700 text-white text-sm rounded-lg block w-full pl-10 p-2.5 focus:ring-primary-400 focus:border-primary-400 cursor-not-allowed opacity-75"
                    />
                  </div>
                </div>

                {/* Harga Jual Input */}
                <div className="space-y-2 flex-1 flex flex-col">
                  <label
                    htmlFor="selling-price"
                    className="text-sm text-neutral-300 font-medium"
                  >
                    {t("calculator.selling_label") ||
                      defaultCalculatorCopy.sellingLabel}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <IconCash className="w-5 h-5 text-neutral-300" />
                    </div>
                    <input
                      id="selling-price"
                      type="text"
                      value={
                        typeof sellingPrice === "number"
                          ? sellingPrice.toLocaleString("id-ID")
                          : ""
                      }
                      onChange={(e) => {
                        const numValue = Number(
                          e.target.value.replace(/\D/g, ""),
                        );
                        if (numValue <= 100000 || e.target.value === "") {
                          setSellingPrice(
                            e.target.value === "" ? "" : numValue,
                          );
                        }
                      }}
                      placeholder={
                        t("calculator.selling_placeholder") ||
                        defaultCalculatorCopy.sellingPlaceholder
                      }
                      aria-label="Selling price"
                      className="bg-black/50 border border-gray-700 text-white text-sm rounded-lg block w-full pl-10 p-2.5 focus:ring-primary-400 focus:border-primary-400"
                    />
                  </div>
                  {typeof sellingPrice === "number" &&
                    sellingPrice < modalPrice && (
                      <p className="text-xs text-red-400 mt-1">
                        {t("calculator.selling_error_low", {
                          modal: modalPrice.toLocaleString("id-ID"),
                        }) ||
                          defaultCalculatorCopy.sellingErrorLow(
                            modalPrice.toLocaleString("id-ID"),
                          )}
                      </p>
                    )}
                  {typeof sellingPrice === "number" &&
                    sellingPrice > 100000 && (
                      <p className="text-xs text-red-400 mt-1">
                        {t("calculator.selling_error_high") ||
                          defaultCalculatorCopy.sellingErrorHigh}
                      </p>
                    )}
                </div>

                {/* Jumlah Penjualan Per Hari */}
                <div className="space-y-2 flex-1 flex flex-col justify-end">
                  <label
                    htmlFor="daily-sales"
                    className="text-sm text-neutral-300 font-medium"
                  >
                    {t("calculator.sales_label") ||
                      defaultCalculatorCopy.salesLabel}
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                      <div className="relative h-3 bg-gray-800 rounded-full">
                        <div
                          className="absolute top-0 left-0 h-full bg-primary-500 rounded-full"
                          style={{ width: `${(dailySales / 100) * 100}%` }}
                        ></div>
                      </div>
                      <input
                        id="daily-sales"
                        type="range"
                        min="1"
                        max="100"
                        value={dailySales}
                        onChange={(e) => setDailySales(Number(e.target.value))}
                        aria-label="Daily sales"
                        className="appearance-none absolute inset-0 w-full opacity-0 cursor-pointer"
                        style={{ top: "-6px", height: "36px" }}
                      />
                      <div
                        className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-black border-4 border-primary-500 rounded-full pointer-events-none"
                        style={{
                          left: `calc(${(dailySales / 100) * 100}% - 12px)`,
                        }}
                      ></div>
                    </div>
                    <div className="px-2 py-1 rounded-lg border border-primary-500/40 bg-gradient-to-br from-primary-500/15 to-primary-500/5 backdrop-blur-md shadow-lg shadow-primary-500/10 flex-shrink-0">
                      <span className="text-sm font-semibold text-primary-200">
                        {dailySales}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Results */}
          <div className="relative bg-primary-900/50 rounded-2xl border border-gray-800 p-2 md:rounded-3xl md:p-3 group z-10">
            {/* Decorative Background Icons */}
            {decorativeIcons.map((item) => {
              return (
                <div
                  key={item.id}
                  className={`${item.position} transform ${item.rotation} transition-transform duration-700 ease-in-out ${item.hoverTransform} ${item.zIndex} pointer-events-none select-none`}
                >
                  <img
                    src={item.image}
                    alt={`decorative-icon-${item.id}`}
                    className="w-full h-full object-contain pointer-events-none select-none"
                    loading="lazy"
                  />
                </div>
              );
            })}

            <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-4 shadow-[0px_0px_27px_0px_#2D2D2D] backdrop-blur-sm">
              <div className="relative flex flex-1 flex-col justify-between z-10">
                <div>
                  <h3 className="font-sans text-center text-2xl xs:text-3xl font-bold text-white">
                    {t("calculator.monthly_profit_title") ||
                      defaultCalculatorCopy.monthlyProfitTitle}
                  </h3>

                  <div className="mt-6 mb-8 text-center">
                    <p className="text-4xl xs:text-5xl font-bold text-primary-200">
                      {monthlyProfit > 0 ? formatRupiah(monthlyProfit) : "Rp 0"}
                    </p>
                    <p className="text-sm text-neutral-400 mt-1">
                      {t("calculator.based_on", { count: dailySales }) ||
                        defaultCalculatorCopy.basedOn(dailySales)}
                    </p>
                  </div>

                  {/* Badge Features */}
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {badgeFeatures.map((feature) => {
                      const IconComponent = feature.icon;
                      return (
                        <div
                          key={feature.id}
                          className="flex flex-col items-center text-center gap-3 bg-gradient-to-br from-primary-700/50 to-black/20 p-2 rounded-xl border border-primary-300/20 hover:border-primary-500/40 transition-all duration-300 transform hover:-translate-y-1"
                        >
                          <div className="w-fit rounded-xl text-white/80 border border-primary-300/40 p-1 bg-gradient-to-br from-primary-500/15 to-primary-500/5 backdrop-blur-md shadow-lg shadow-primary-500/10">
                            <IconComponent className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="text-xs font-medium text-white">
                              {feature.title}
                            </p>
                            <p className="text-xs text-neutral-400 mt-1">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Register Button */}
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLScaaZa82NyGscfI4NdiPmz-3n13It94GIypQHl8jVXHN_pPPA/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 flex items-center justify-center gap-1.5 rounded-full border-2 border-primary-400 bg-primary-500 p-2 px-6 text-sm text-white hover:bg-primary-600 transition-all"
                >
                  {t("calculator.button") || defaultCalculatorCopy.button}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Calculator;
