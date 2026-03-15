export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(value);

export const createWhatsAppLink = ({
  phone,
  productName,
  category,
  price
}: {
  phone: string;
  productName: string;
  category: string;
  price: string;
}) => {
  const text = `Halo admin, saya ingin order aplikasi premium.%0A%0AProduk: ${productName}%0AKategori: ${category}%0AHarga: ${price}%0A%0AMohon info langkah pembeliannya.`;
  return `https://wa.me/${phone}?text=${text}`;
};
