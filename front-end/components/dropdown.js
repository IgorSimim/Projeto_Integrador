const dropdownBtn = document.getElementById("dropdown__button");
const dropdownMenu = document.getElementById("dropdown");
const toggleArrow = document.getElementById("arrow");

console.log(dropdownBtn)

const toggleDropdown = function () {
  dropdownMenu.classList.toggle("show");
  toggleArrow.classList.toggle("arrow");
};

dropdownBtn.addEventListener("click", function (e) {
  e.stopPropagation();
  toggleDropdown();
});

//close if any doom element is clicked
document.documentElement.addEventListener("click", function () {
  if (dropdownMenu.classList.contains("show")) {
    toggleDropdown();
  }
});