const settings = document.getElementById("settingsHolder");
const dropdowns = document.getElementsByClassName("drop-btn");
var i = 0;

// settings open-close
function openNav() { settings.style.width = "250px"; }
function closeNav() { settings.style.width = "0"; }

for (i = 0; i < dropdowns.length; i++) {
  dropdowns[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling.nextElementSibling;
    content.classList.toggle("hidden");
  });
}
