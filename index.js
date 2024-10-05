// Hàm để hiển thị ngày tháng
function displayDate() {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1; // Tháng bắt đầu từ 0 nên cần cộng 1
  const year = today.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  document.getElementById(
    "ngayThang"
  ).textContent = `Ngày hôm nay: ${formattedDate}`;
}

// Hàm điểm danh và xử lý chuỗi ngày tích lũy
function diemDanh() {
  const today = new Date();
  const lastCheckIn = localStorage.getItem("lastCheckIn");

  // Lấy số ngày tích lũy từ localStorage hoặc khởi tạo bằng 0
  let accumulatedDays = Number(localStorage.getItem("accumulatedDays")) || 0;
  let dayStreak = Number(localStorage.getItem("dayStreak")) || 0;
  let chuoiNgay = JSON.parse(localStorage.getItem("chuoiNgay")) || [];

  if (lastCheckIn) {
    const lastDate = new Date(lastCheckIn);
    const dayDiff = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));

    if (dayDiff === 1) {
      // Ngày liên tiếp, tăng chuỗi
      dayStreak++;
    } else {
      // Không liên tiếp, reset chuỗi
      dayStreak = 1;
      chuoiNgay = []; // Xóa chuỗi nếu bỏ lỡ ngày
    }
  } else {
    dayStreak = 1; // Điểm danh lần đầu
  }

  // Tăng số ngày tích lũy
  accumulatedDays++;

  // Lưu ngày hiện tại vào chuỗi
  localStorage.setItem("lastCheckIn", today);
  chuoiNgay.push(
    `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`
  );
  localStorage.setItem("chuoiNgay", JSON.stringify(chuoiNgay));

  // Lưu số ngày tích lũy và liên tiếp vào localStorage
  localStorage.setItem("accumulatedDays", accumulatedDays);
  localStorage.setItem("dayStreak", dayStreak);

  // Hiển thị thông tin cập nhật ngay trên giao diện
  updateDisplay(dayStreak, chuoiNgay);
}

// Hàm cập nhật hiển thị chuỗi và số ngày tích lũy
function updateDisplay(dayStreak, chuoiNgay) {
  document.getElementById(
    "soNgayLienTiep"
  ).textContent = `Số ngày liên tiếp: ${dayStreak}`;
  document.getElementById(
    "chuoiNgayDaTichLuy"
  ).textContent = `Chuỗi ngày đã tích lũy: ${chuoiNgay.join(", ")}`;
}

// Hiển thị số ngày liên tiếp và chuỗi tích lũy khi tải trang
function checkLastCheckIn() {
  const chuoiNgay = JSON.parse(localStorage.getItem("chuoiNgay")) || [];
  const dayStreak = Number(localStorage.getItem("dayStreak")) || 0;

  // Hiển thị chuỗi hiện tại ngay khi tải trang
  updateDisplay(dayStreak, chuoiNgay);
}

// Gọi hàm hiển thị ngày và kiểm tra chuỗi khi trang được tải
window.onload = function () {
  displayDate();
  checkLastCheckIn();
};

// Thêm sự kiện cho nút "Điểm danh"
document.getElementById("diemDanhBtn").addEventListener("click", diemDanh);
