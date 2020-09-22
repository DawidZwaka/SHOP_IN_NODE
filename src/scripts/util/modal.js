//simple delete modal script
$("#simpleDeleteModal").on("show.bs.modal", (ev) => {
  const button = $(ev.relatedTarget),
    id = button.data("id"),
    modal = $("#simpleDeleteModal");

  modal
    .find(".modal-footer form")
    .attr("action", `/admin/delete-product/${id}`);
});
