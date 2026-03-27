export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(value);

export const statusLabel = (status: string) => {
  if (status === "available") return "Tersedia";
  if (status === "limited") return "Terbatas";
  return "Habis";
};

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
  const text = `Halo SteamSpace, saya ingin order produk:%0A%0AProduk: ${productName}%0AKategori: ${category}%0AHarga: ${price}%0A%0AApakah masih tersedia?`;
  return `https://wa.me/${phone}?text=${text}`;
};
