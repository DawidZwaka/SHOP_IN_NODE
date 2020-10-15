const { getImageUrl } = require("../paths");

exports.addProductFields = {
  name: {
    label: "Name",
    type: "text",
  },
  picture: {
    type: "imagePicker",
    shape: "square",
    size: "lg",
    value: getImageUrl("product.png", "placeholders"),
  },
  price: {
    label: "Price",
    type: "number",
  },
  desc: {
    label: "Description",
    type: "textarea",
  },
};
