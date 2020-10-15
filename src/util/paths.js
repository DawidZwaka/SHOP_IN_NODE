const path = require("path");

exports.getImageUrl = (filename, subDirectory) =>
  path.join("/uploads/images", subDirectory, filename);

exports.getImagePath = (filename, subDirectory) =>
  path.join(__dirname, "..", "/uploads/images", subDirectory, filename);
