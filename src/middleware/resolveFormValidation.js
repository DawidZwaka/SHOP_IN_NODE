const { validationResult } = require("express-validator");
const Fieldset = require("../util/fieldset");
const { addProductFields } = require("../util/constants/product");
const { saveImage, removeImage } = require("../util/imageStorage");

exports.resolveProductValidation = (req, res, next) => {
  const error = validationResult(req),
    errorArr = error.array(),
    { name, price, desc, oldPicture, uploaded } = req.body;
  let picture = "";

  const fields = new Fieldset(addProductFields);

  if (req.file) {
    try {
      const { mimetype, buffer, originalname } = req.file;

      if (uploaded === "true") removeImage(oldPicture);

      picture = saveImage(mimetype, originalname, buffer);

      fields.setFieldProps("picture", { uploaded: "true" });
    } catch (err) {
      next(err);
    }
  } else {
    picture = oldPicture;
    fields.setFieldProps("picture", { uploaded: uploaded });
  }

  fields.setValues({ name, price, desc, picture });

  if (errorArr.length) {
    res.status(422).render("admin/addProduct", {
      errors: errorArr,
      inputs: fields.getFields(),
      pageTitle: "title",
    });
  }

  req.body.picture = picture;

  next();
};
