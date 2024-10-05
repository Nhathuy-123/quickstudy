document.addEventListener("DOMContentLoaded", function () {
  const notificationBox = document.getElementById("notification-box");
  const notificationToggle = document.querySelector(".demuc0"); // Thay đổi selector nếu cần

  function displayTodayEvents() {
    const savedEvents = loadSavedEvents();
    const today = new Date();
    const todayKey = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;

    notificationBox.innerHTML = ""; // Xóa nội dung cũ

    // Tạo phần tử thông báo cho hôm nay
    if (savedEvents[todayKey]) {
      const notificationText = savedEvents[todayKey];
      const notification = document.createElement("p");

      // Thêm ngày tháng năm vào thông báo
      const dateText = `${today.getDate()}/${
        today.getMonth() + 1
      }/${today.getFullYear()}`;

      // Đặt tiêu đề ngày tháng năm in đậm
      notification.innerHTML = `<strong>Thông báo (${dateText}):</strong> ${notificationText.replace(
        /\n/g,
        "<br>"
      )}`;

      notificationBox.appendChild(notification);
    } else {
      const notification = document.createElement("p");
      notification.textContent = "Không có thông báo cho hôm nay.";
      notificationBox.appendChild(notification);
    }

    // Ẩn hộp thông báo khi khởi động
    notificationBox.classList.add("hidden");
  }

  function loadSavedEvents() {
    return JSON.parse(localStorage.getItem("events")) || {};
  }

  // Hàm mở/đóng hộp thông báo
  function toggleNotification() {
    if (notificationBox.classList.contains("hidden")) {
      notificationBox.classList.remove("hidden");
      notificationBox.style.display = "block"; // Hiển thị hộp thông báo
    } else {
      notificationBox.classList.add("hidden");
      notificationBox.style.display = "none"; // Ẩn hộp thông báo
    }
  }

  // Thêm sự kiện click vào biểu tượng thông báo
  notificationToggle.addEventListener("click", toggleNotification);

  displayTodayEvents(); // Gọi hàm để hiển thị sự kiện của hôm nay
});
