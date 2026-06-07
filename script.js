// Telefon numarasını ülke koduyla, başında + olmadan güncelleyin.
const WHATSAPP_NUMBER = "905010191975";

document.querySelectorAll(".whatsapp-link").forEach((link) => {
  const message = link.dataset.message || "Merhaba Sultan Teyze, bilgi almak istiyorum.";
  link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

const quickProducts = ["Börek", "Poğaça", "Tatlı Atıştırmalık", "Mantı", "Erişte", "Yaprak Sarma"];
const quantities = Object.fromEntries(quickProducts.map((product) => [product, 0]));
const quickItems = document.querySelector(".quick-items");
const summaryLines = document.querySelector(".summary-lines");
const quickSubmit = document.querySelector(".quick-submit");
const orderNote = document.querySelector("#order-note");

quickItems.innerHTML = quickProducts.map((product) => `
  <div class="quick-item" data-product="${product}">
    <strong>${product}</strong>
    <div class="quantity-control">
      <button type="button" data-action="decrease" aria-label="${product} miktarını azalt">−</button>
      <output aria-label="${product} miktarı">0</output>
      <button type="button" data-action="increase" aria-label="${product} miktarını artır">+</button>
    </div>
  </div>
`).join("");

function renderQuickOrder() {
  const selected = quickProducts.filter((product) => quantities[product] > 0);

  summaryLines.innerHTML = selected.length
    ? selected.map((product) => `<p><span>${product}</span><strong>${quantities[product]} adet/paket</strong></p>`).join("")
    : "<p>Henüz ürün seçmediniz.</p>";

  quickProducts.forEach((product) => {
    document.querySelector(`.quick-item[data-product="${product}"] output`).textContent = quantities[product];
  });

  document.querySelectorAll(".quick-add").forEach((button) => {
    button.classList.toggle("is-added", quantities[button.dataset.product] > 0);
    button.textContent = quantities[button.dataset.product] > 0 ? `Seçildi: ${quantities[button.dataset.product]} +` : "Hızlı seçime ekle +";
  });

  if (!selected.length) {
    quickSubmit.removeAttribute("href");
    quickSubmit.setAttribute("aria-disabled", "true");
    return;
  }

  const productLines = selected.map((product) => `- ${product}: ${quantities[product]} adet/paket`);
  const note = orderNote.value.trim();
  const message = [
    "Merhaba Sultan Teyze, hızlı sipariş vermek istiyorum:",
    "",
    ...productLines,
    ...(note ? ["", `Not: ${note}`] : []),
    "",
    "Ankara içi elden teslim için detayları konuşabilir miyiz?"
  ].join("\n");

  quickSubmit.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  quickSubmit.target = "_blank";
  quickSubmit.rel = "noopener noreferrer";
  quickSubmit.setAttribute("aria-disabled", "false");
}

quickItems.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  const product = button.closest(".quick-item").dataset.product;
  quantities[product] = button.dataset.action === "increase"
    ? quantities[product] + 1
    : Math.max(0, quantities[product] - 1);
  renderQuickOrder();
});

document.querySelectorAll(".quick-add").forEach((button) => {
  button.addEventListener("click", () => {
    quantities[button.dataset.product] += 1;
    renderQuickOrder();
    document.querySelector("#hizli-siparis").scrollIntoView({ behavior: "smooth", block: "center" });
  });
});

orderNote.addEventListener("input", renderQuickOrder);
renderQuickOrder();
