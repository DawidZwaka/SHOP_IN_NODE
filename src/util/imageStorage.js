const fs = require("fs-extra");
const mime = require("mime-types");
const path = require("path");
const { getImagePath, getImageUrl } = require("./paths");

const getImageName = (mimetype, originalName) => {
  const prefix = Math.floor(Math.random() * 1000),
    date = Date.now();

  return `${prefix}_${date}_${originalName}`;
};

const getCurrSubDirectory = () => {
  const date = new Date(),
    day = date.getDate().toString().padStart(2, 0),
    month = (date.getMonth() + 1).toString().padStart(2, 0),
    year = date.getFullYear();

  return `${year}_${month}_${day}`;
};

exports.saveImage = (mimetype, originalName, buffer) => {
  const imageName = getImageName(mimetype, originalName),
    subDirectory = getCurrSubDirectory(),
    filePath = getImagePath(imageName, subDirectory);

  fs.outputFileSync(filePath, buffer);

  return getImageUrl(imageName, subDirectory);
};

exports.removeImage = (fileUrl) => {
  return fs.removeSync(path.join(__dirname, "..", fileUrl));
};
