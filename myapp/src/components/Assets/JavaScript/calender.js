// document.addEventListener("DOMContentLoaded", function () {
//     const prevBtn = document.getElementById("prevBtn");
//     const nextBtn = document.getElementById("nextBtn");
//     const currentMonth = document.getElementById("currentMonth");
//     const daysContainer = document.querySelector(".days");
  
//     let currentDate = new Date();
  
//     function renderCalendar() {
//       const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
//       const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
//       const lastDayOfPrevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
  
//       currentMonth.textContent = firstDayOfMonth.toLocaleString("default", { month: "long", year: "numeric" });
  
//       daysContainer.innerHTML = "";
  
//       for (let i = firstDayOfMonth.getDay() - 1; i >= 0; i--) {
//         const day = document.createElement("div");
//         day.textContent = lastDayOfPrevMonth.getDate() - i;
//         day.classList.add("day", "disabled");
//         daysContainer.appendChild(day);
//       }
  
//       for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
//         const day = document.createElement("div");
//         day.textContent = i;
//         day.classList.add("day");
//         if (i === currentDate.getDate() && currentDate.getMonth() === new Date().getMonth()) {
//           day.classList.add("today");
//         }
//         daysContainer.appendChild(day);
//       }
//     }
  
//     renderCalendar();
  
//     prevBtn.addEventListener("click", function () {
//       currentDate.setMonth(currentDate.getMonth() - 1);
//       renderCalendar();
//     });
  
//     nextBtn.addEventListener("click", function () {
//       currentDate.setMonth(currentDate.getMonth() + 1);
//       renderCalendar();
//     });
//   });
  