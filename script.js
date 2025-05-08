// 향후 폼 제출이나 페이지 효과 추가 용도
console.log("Page Loaded");
document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.querySelector(".sidebar");
    const toggleBtn = document.getElementById("toggle-btn");
  
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("closed");
    });
  });
  