document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("search-form")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Ngăn chặn form nạp lại trang
      let query = document.getElementById("nhap_vao").value.toLowerCase();

      // Tạo URL tìm kiếm Google
      let googleSearchUrl =
        "https://www.google.com/search?q=" + encodeURIComponent(query);

      // Mở kết quả tìm kiếm trong một tab mới
      window.open(googleSearchUrl, "_blank");
    });

  function toggleNotification() {
    var notificationBox = document.getElementById("notification-box");
    if (notificationBox.classList.contains("hidden")) {
      notificationBox.classList.remove("hidden");
      notificationBox.style.display = "block";
      generateNotifications(); // Gọi hàm tạo thông báo
    } else {
      notificationBox.classList.add("hidden");
      notificationBox.style.display = "none";
    }
  }

  // Hàm tạo nội dung thông báo
  function generateNotifications() {
    const notificationBox = document.getElementById("notification-box");
    notificationBox.innerHTML = ""; // Xóa nội dung cũ

    const savedEvents = loadSavedEvents();
    const today = new Date();
    const todayKey = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`; // Sửa +1 cho tháng

    if (savedEvents[todayKey]) {
      const notification = document.createElement("p");
      notification.textContent = `Thông báo: ${savedEvents[todayKey]}`;
      notificationBox.appendChild(notification);
    } else {
      const notification = document.createElement("p");
      notification.textContent = "Không có thông báo cho hôm nay.";
      notificationBox.appendChild(notification);
    }
  }

});
