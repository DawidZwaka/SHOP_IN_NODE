const displayImage = (ev) => {
  const image = $(".imageUploader__dist");

  image.attr("src", URL.createObjectURL(ev.target.files[0]));
};

$(".imageUploader__src").on("change", displayImage);
