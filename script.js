// Telefon numarasını ülke koduyla, başında + olmadan güncelleyin.
const WHATSAPP_NUMBER = "905010191975";

document.querySelectorAll(".whatsapp-link").forEach((link) => {
  const message = link.dataset.message || "Merhaba Sultan Teyze, bilgi almak istiyorum.";
  link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});
