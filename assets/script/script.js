// Dots
const track = document.getElementById("hero-slider");
const slides = Array.from(track.children);
const prev = document.getElementById("prevBtn");
const next = document.getElementById("nextBtn");
const dotsWrap = document.getElementById("dots");

let index = 0;

// Tạo dots theo số slide
slides.forEach((_, i) => {
  const b = document.createElement("button");
  b.setAttribute("role", "tab");
  b.setAttribute("aria-label", `Chuyển tới ảnh ${i + 1}`);
  b.addEventListener("click", () => goTo(i));
  dotsWrap.appendChild(b);
});

const dots = Array.from(dotsWrap.children);

function goTo(i) {
  index = (i + slides.length) % slides.length;
  track.style.transform = `translateX(-${index * 100}%)`;
  updateDots();
}

function updateDots() {
  dots.forEach((d, i) => {
    d.classList.toggle("active", i === index);
    d.setAttribute("aria-selected", i === index ? "true" : "false");
  });
}

prev.addEventListener("click", () => goTo(index - 1));
next.addEventListener("click", () => goTo(index + 1));

// Hỗ trợ phím mũi tên
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") goTo(index - 1);
  if (e.key === "ArrowRight") goTo(index + 1);
});

// (Tuỳ chọn) Vuốt trên mobile
let startX = null;
track.addEventListener("pointerdown", (e) => {
  startX = e.clientX;
});
track.addEventListener("pointerup", (e) => {
  if (startX === null) return;
  const dx = e.clientX - startX;
  if (Math.abs(dx) > 40) {
    if (dx < 0) goTo(index + 1);
    else goTo(index - 1);
  }
  startX = null;
});
// End dots

// Khởi tạo
goTo(0);

// --- Search popup ---
document.addEventListener("DOMContentLoaded", function () {
  const searchTop = document.querySelector(".search-top");
  const searchPopup = document.querySelector(".search-popup");

  searchTop.addEventListener("click", function (e) {
    e.stopPropagation();
    searchPopup.classList.toggle("show"); // Bật/tắt class 'show' để hiện/ẩn popup
  });

  // Ẩn popup khi click ra ngoài
  document.addEventListener("click", function (e) {
    // Nếu click không nằm trong popup và cũng không nằm trên nút tìm kiếm
    if (!searchPopup.contains(e.target) && !searchTop.contains(e.target)) {
      searchPopup.classList.remove("show"); // Ẩn popup
    }
  });
});
// --- End search popup ---

// --- Auto slide ---
let autoPlayInterval = 3500; // thời gian giữa các slide (ms)
let autoPlay = setInterval(() => goTo(index + 1), autoPlayInterval);

// Hàm reset autoplay khi user thao tác
function resetAutoPlay() {
  clearInterval(autoPlay);
  autoPlay = setInterval(() => goTo(index + 1), autoPlayInterval);
}

// Gắn reset khi click nút hoặc dots
prev.addEventListener("click", resetAutoPlay);
next.addEventListener("click", resetAutoPlay);
dots.forEach(d => d.addEventListener("click", resetAutoPlay));

// Dừng khi hover, chạy lại khi rời chuột
track.addEventListener("mouseenter", () => clearInterval(autoPlay));
track.addEventListener("mouseleave", resetAutoPlay);
// --- End auto slide ---

// AOS cho item-image
const imagesAOS = document.querySelectorAll(".item-image");
imagesAOS.forEach(img => {  
  img.setAttribute("data-aos", "zoom-in");
  img.setAttribute("data-aos-duration", "1000");
  img.setAttribute("data-aos-delay", "0");
});
AOS.init();




