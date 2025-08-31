// Animasi Love Terbang
function createLove() {
  const love = document.createElement("div");
  love.classList.add("love");
  love.innerText = "🌸";
  love.style.left = Math.random() * 100 + "vw";
  love.style.fontSize = Math.random() * 20 + 15 + "px"; // variasi ukuran
  love.style.animationDuration = (Math.random() * 3 + 3) + "s"; // variasi kecepatan

  document.body.appendChild(love);

  // hapus setelah animasi selesai
  setTimeout(() => {
    love.remove();
  }, 6000);
}

// Munculkan love tiap 500ms
setInterval(createLove, 500);

// Love interaktif (klik layar)
document.addEventListener("click", function(e) {
  const love = document.createElement("div");
  love.classList.add("love");
  love.innerText = "🌸";

  // Posisi love sesuai titik klik
  love.style.left = e.clientX + "px";
  love.style.top = e.clientY + "px";
  love.style.position = "absolute";
  love.style.fontSize = Math.random() * 20 + 20 + "px";

  document.body.appendChild(love);

  // Animasi love naik
  love.animate([
    { transform: "translateY(0)", opacity: 1 },
    { transform: "translateY(-100px)", opacity: 0 }
  ], {
    duration: 1500,
    easing: "ease-out"
  });

  // Hapus setelah animasi
  setTimeout(() => love.remove(), 1500);
});
