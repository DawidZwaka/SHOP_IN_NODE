/*
██╗███╗   ███╗██████╗  ██████╗ ██████╗ ████████╗███████╗
██║████╗ ████║██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝
██║██╔████╔██║██████╔╝██║   ██║██████╔╝   ██║   ███████╗
██║██║╚██╔╝██║██╔═══╝ ██║   ██║██╔══██╗   ██║   ╚════██║
██║██║ ╚═╝ ██║██║     ╚██████╔╝██║  ██║   ██║   ███████║
╚═╝╚═╝     ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝
*/

const User = require("../models/user");
const Order = require("../models/order");
const saltRounds = 10;
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const nodemailerTransport = require("nodemailer-sendgrid-transport");
const crypto = require("crypto");
const { validationResult } = require("express-validator");

/*
 ██████╗ ██████╗ ███╗   ██╗███████╗████████╗ █████╗ ███╗   ██╗███████╗
██╔════╝██╔═══██╗████╗  ██║██╔════╝╚══██╔══╝██╔══██╗████╗  ██║██╔════╝
██║     ██║   ██║██╔██╗ ██║███████╗   ██║   ███████║██╔██╗ ██║███████╗
██║     ██║   ██║██║╚██╗██║╚════██║   ██║   ██╔══██║██║╚██╗██║╚════██║
╚██████╗╚██████╔╝██║ ╚████║███████║   ██║   ██║  ██║██║ ╚████║███████║
 ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝
*/

const transporter = nodemailer.createTransport(
  nodemailerTransport({
    auth: {
      api_key: process.env.SENDGRID_KEY,
    },
  })
);

/*
 ██████╗ ██████╗ ███╗   ██╗████████╗██████╗  ██████╗ ██╗     ██╗     ███████╗██████╗ ███████╗
██╔════╝██╔═══██╗████╗  ██║╚══██╔══╝██╔══██╗██╔═══██╗██║     ██║     ██╔════╝██╔══██╗██╔════╝
██║     ██║   ██║██╔██╗ ██║   ██║   ██████╔╝██║   ██║██║     ██║     █████╗  ██████╔╝███████╗
██║     ██║   ██║██║╚██╗██║   ██║   ██╔══██╗██║   ██║██║     ██║     ██╔══╝  ██╔══██╗╚════██║
╚██████╗╚██████╔╝██║ ╚████║   ██║   ██║  ██║╚██████╔╝███████╗███████╗███████╗██║  ██║███████║
 ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝╚══════╝
*/

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    errors: req.flash("error"),
    oldInputs: {
      email: "",
      password: "",
    },
  });
};

exports.postLogin = (req, res, next) => {
  const data = {
    email: req.body.email,
    password: req.body.password,
  };
  const errors = validationResult(req);
  const errorsArr = errors.array();

  if (!errors.isEmpty()) {
    res.status(422).render("auth/login", {
      oldInputs: data,
      errors: errorsArr.map((err) => err.msg),
    });
  }

  User.findOne({ email: data.email })
    .then((user) => {
      if (user) {
        return bcrypt.compare(data.password, user.password).then((result) => {
          if (result) {
            req.session.isLoggedIn = true;
            req.session.user = user;

            req.session.save((err) => {
              res.redirect("/");
            });
          } else {
            req.flash("error", "Password incorrect.");
            return res.redirect("/login");
          }
        });
      } else {
        req.flash("error", "Email not found.");
        return res.redirect("/login");
      }
    })
    .catch((err) => res.redirect("/500"));
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    oldInputs: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    errors: [],
  });
};

exports.postSignup = (req, res, next) => {
  const data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  };
  const errors = validationResult(req);
  const errorsArr = errors.array();

  if (!errors.isEmpty()) {
    return res.status(422).render("auth/signup", {
      errors: errorsArr,
      oldInputs: data,
    });
  }

  bcrypt
    .hash(data.password, saltRounds)
    .then((hash) => {
      newUser = new User({
        name: data.name,
        email: data.email,
        password: hash,
        accountType: "user",
        cart: { products: [] },
      });

      return newUser.save();
    })
    .then((result) => {
      return transporter.sendMail({
        to: data.email,
        from: "shopjs@shop",
        subject: "Singup succeeded!",
        html: "<h1>You successfully singed up!</h1>",
      });
    })
    .then((result) => {
      res.redirect("/login");
    })
    .catch((err) => res.redirect("/500"));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    res.locals.isAuth = false;
    res.redirect("/");
  });
};

exports.getResetPassword = (req, res, next) => {
  res.render("auth/resetPassword", {
    error: req.flash("error"),
  });
};

exports.postResetPassword = (req, res, next) => {
  const email = req.body.email;

  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        crypto.randomBytes(32, (err, buffer) => {
          if (err) {
            console.log(err);
            return res.redirect("/reset");
          } else {
            const token = buffer.toString("hex");

            user.passwdResToken = token;
            user.passwdResTokenExp = Date.now() + 3600000;

            user
              .save()
              .then((result) => {
                return transporter.sendMail({
                  to: email,
                  from: "shopjs@shop",
                  subject: "Password reset",
                  html: `
                                        <h2>You requested a password reset. if you didn't, remove this message </h2>
                                        <a href="http://localhost:3000/reset-password/${token}">
                                            Reset password
                                        </a>
                                        <p>You got 1 hour before this password resseting expires.</p> 
                                        `,
                });
              })
              .then((result) => res.redirect("/login"))
              .catch((err) => console.log(err));
          }
        });
      } else {
        req.flash("error", "User with that email address doesnt exist.");
        return res.redirect("/reset-password");
      }
    })
    .catch((err) => res.redirect("/500"));
};

exports.getNewPassword = (req, res, next) => {
  const token = req.params.token;

  User.findOne({
    passwdResToken: token,
    passwdResTokenExp: { $gt: Date.now() },
  })
    .then((user) => {
      if (user) {
        res.render("auth/newPassword", {
          token: token,
          userID: user._id,
          error: req.flash("error"),
        });
      } else {
        res.redirect("/");
      }
    })
    .catch((err) => res.redirect("/500"));
};

exports.postNewPassword = (req, res, next) => {
  const data = {
    token: req.body.token,
    password: req.body.password,
    userID: req.body.userID,
    confirmPassword: req.body.confirmPassword,
  };

  if (data.password !== data.confirmPassword) {
    req.flash("error", "Password has different values.");
    res.redirect(`/reset-password/${data.token}`);
  }

  User.findOne({
    passwdResToken: data.token,
    passwdResTokenExp: { $gt: Date.now() },
    _id: data.userID,
  })
    .then((user) => {
      if (user) {
        bcrypt
          .hash(data.password, saltRounds)
          .then((hash) => {
            user.password = hash;

            return user.save();
          })
          .then((result) => res.redirect("/login"))
          .catch((err) => console.log(err));
      } else {
        res.redirect("/");
      }
    })
    .catch((err) => res.redirect("/500"));
};

exports.getAccountPage = (req, res, next) => {
  const User = req.user;

  res.render("auth/account", {
    user: User,
  });
};

exports.getOrders = (req, res, next) => {
  const User = req.user;

  Order.find({ "user._id": User._id })
    .then((orders) => {
      res.render("auth/orders", {
        orders: orders,
      });
    })
    .catch((err) => res.redirect("/500"));
};
