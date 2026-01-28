/**
 * Format angka menjadi format rupiah dengan prefix Rp dan pemisah ribuan
 * @param value - Nilai angka yang akan diformat
 * @returns String dalam format Rupiah (contoh: Rp 10.000)
 */
const formatRupiah = (value: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

export default formatRupiah;
