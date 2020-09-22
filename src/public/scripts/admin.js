"use strict";

var displayImage = function displayImage(ev) {
  var image = $(".imageUploader__dist");
  image.attr("src", URL.createObjectURL(ev.target.files[0]));
};

$(".imageUploader__src").on("change", displayImage);
document.querySelector(".dropdown-toggle").addEventListener("click", function (ev) {
  $(ev.target).find("~ .dropdown-menu").removeClass("disable");
});
document.querySelector(".dropdown-menu").addEventListener("animationend", function (ev) {
  var dropdown = $(ev.target);
  if (!dropdown.hasClass("show")) dropdown.addClass("disable"); //else dropdown.addClass("disable");
}); //simple delete modal script

$("#simpleDeleteModal").on("show.bs.modal", function (ev) {
  var button = $(ev.relatedTarget),
      id = button.data("id"),
      modal = $("#simpleDeleteModal");
  modal.find(".modal-footer form").attr("action", "/admin/delete-product/".concat(id));
});