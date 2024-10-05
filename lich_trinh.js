document.addEventListener("DOMContentLoaded", function () {
  let currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();
  const monthYear = document.getElementById("month-year");
  const calendarBody = document.getElementById("calendar-body");

  const prevMonthBtn = document.getElementById("prev-month");
  const nextMonthBtn = document.getElementById("next-month");

  const today = new Date();
  const months = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];

  function updateMonthYear() {
    monthYear.innerHTML = `${months[currentMonth]} - ${currentYear}`;
  }

  function getDaysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
  }

  function loadSavedEvents() {
    return JSON.parse(localStorage.getItem("events")) || {};
  }

  function saveEvent(dateKey, event) {
    const savedEvents = loadSavedEvents();
    if (event) {
      savedEvents[dateKey] = event;
    } else {
      delete savedEvents[dateKey];
    }
    localStorage.setItem("events", JSON.stringify(savedEvents));
  }

  function generateCalendar(month, year) {
    calendarBody.innerHTML = "";
    const firstDay = new Date(year, month).getDay();
    const daysInMonth = getDaysInMonth(month, year);
    let date = 1;
    const savedEvents = loadSavedEvents();

    for (let i = 0; i < 6; i++) {
      const row = document.createElement("tr");

      for (let j = 0; j < 7; j++) {
        const cell = document.createElement("td");

        if (i === 0 && j < firstDay) {
          cell.innerHTML = "";
        } else if (date > daysInMonth) {
          cell.innerHTML = "";
        } else {
          const dateKey = `${year}-${month + 1}-${date}`;
          cell.innerHTML = date;
          cell.setAttribute("data-date", date);

          if (savedEvents[dateKey]) {
            const marker = document.createElement("span");
            marker.textContent = "•";
            marker.style.color = "red";
            marker.style.fontSize = "24px";
            marker.classList.add("event-marker");
            cell.appendChild(marker);
          }

          cell.addEventListener("click", function () {
            showPopup(cell, dateKey, date, savedEvents);
          });

          date++;
        }
        row.appendChild(cell);
      }
      calendarBody.appendChild(row);
    }
  }

  function showPopup(cell, dateKey, date, savedEvents) {
    const popup = document.createElement("div");
    popup.classList.add("popup-box");

    const textarea = document.createElement("textarea");
    textarea.value = savedEvents[dateKey] || "";
    textarea.rows = 3;
    textarea.cols = 15;

    const saveButton = document.createElement("button");
    saveButton.textContent = "Lưu";

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Xóa";

    const closeButton = document.createElement("button");
    closeButton.textContent = "Đóng";

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");
    buttonContainer.appendChild(saveButton);
    buttonContainer.appendChild(deleteButton);
    buttonContainer.appendChild(closeButton);

    popup.appendChild(textarea);
    popup.appendChild(buttonContainer);
    document.body.appendChild(popup);

    popup.style.top = `${cell.getBoundingClientRect().top + window.scrollY}px`;
    popup.style.left = `${
      cell.getBoundingClientRect().left + window.scrollX
    }px`;

    saveButton.addEventListener("click", function () {
      const event = textarea.value;
      saveEvent(dateKey, event);

      // Sau khi lưu, cập nhật lại lịch để hiển thị thay đổi
      popup.remove(); // Xóa popup
      generateCalendar(currentMonth, currentYear); // Cập nhật lịch
    });

    deleteButton.addEventListener("click", function () {
      saveEvent(dateKey, "");

      // Sau khi xóa, cập nhật lại lịch để hiển thị thay đổi
      popup.remove(); // Xóa popup
      generateCalendar(currentMonth, currentYear); // Cập nhật lịch
    });

    closeButton.addEventListener("click", function () {
      popup.remove(); // Đóng popup mà không lưu hay xóa
    });
  }

  prevMonthBtn.addEventListener("click", function () {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    updateMonthYear();
    generateCalendar(currentMonth, currentYear);
  });

  nextMonthBtn.addEventListener("click", function () {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    updateMonthYear();
    generateCalendar(currentMonth, currentYear);
  });

  updateMonthYear();
  generateCalendar(currentMonth, currentYear);
});
