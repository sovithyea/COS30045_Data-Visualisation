// main.js
document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(".content");

  links.forEach(link => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const page = this.getAttribute("data-page");

      sections.forEach(section => section.classList.remove("active"));
      document.getElementById(page).classList.add("active");
    });
  });

  document.getElementById("logo").addEventListener("click", function () {
    document.querySelector("[data-page='home']").click();
  });

  // ✅ Draw chart immediately when page loads
  d3.csv("data/televisions.csv").then(data => {
    const formattedData = data.map(d => ({
      brand: d["Brand_Reg"],
      modelCount: +d["Count(Model_No)"]
    }));
    createBarChart(formattedData);
  });
});
