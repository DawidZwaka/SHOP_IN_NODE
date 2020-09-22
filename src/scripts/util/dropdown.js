document.querySelector(".dropdown-toggle").addEventListener("click", (ev) => {
  $(ev.target).find("~ .dropdown-menu").removeClass("disable");
});

document
  .querySelector(".dropdown-menu")
  .addEventListener("animationend", (ev) => {
    const dropdown = $(ev.target);
    if (!dropdown.hasClass("show")) dropdown.addClass("disable");
    //else dropdown.addClass("disable");
  });
