/*
██╗███╗   ███╗██████╗  ██████╗ ███████╗████████╗███████╗
██║████╗ ████║██╔══██╗██╔═══██╗██╔════╝╚══██╔══╝██╔════╝
██║██╔████╔██║██████╔╝██║   ██║███████╗   ██║   ███████╗
██║██║╚██╔╝██║██╔═══╝ ██║   ██║╚════██║   ██║   ╚════██║
██║██║ ╚═╝ ██║██║     ╚██████╔╝███████║   ██║   ███████║
╚═╝╚═╝     ╚═╝╚═╝      ╚═════╝ ╚══════╝   ╚═╝   ╚══════╝
*/

//const { resolve } = require("path");

const express = require("express"),
  i18n = require("i18n"),
  path = require("path"),
  bodyParser = require("body-parser"),
  //general = require('./controllers/general';
  adminRoutes = require("./routes/admin"),
  shopRoutes = require("./routes/shop"),
  authRoutes = require("./routes/auth"),
  { get404, get500 } = require("./controllers/errors"),
  mongoose = require("mongoose"),
  session = require("express-session"),
  mongodbStore = require("connect-mongodb-session")(session),
  User = require("./models/user"),
  isAuth = require("./middleware/is_auth"),
  flash = require("connect-flash"),
  multer = require("multer"),
  csrf = require("csurf"),
  //{ resolveError } = require("./util/errors"),
  Settings = require("./util/settings");

/*
 ██████╗ ██████╗ ███╗   ██╗███████╗████████╗ █████╗ ███╗   ██╗███████╗
██╔════╝██╔═══██╗████╗  ██║██╔════╝╚══██╔══╝██╔══██╗████╗  ██║██╔════╝
██║     ██║   ██║██╔██╗ ██║███████╗   ██║   ███████║██╔██╗ ██║███████╗
██║     ██║   ██║██║╚██╗██║╚════██║   ██║   ██╔══██║██║╚██╗██║╚════██║
╚██████╗╚██████╔╝██║ ╚████║███████║   ██║   ██║  ██║██║ ╚████║███████║
 ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝
*/

const app = express();

const store = new mongodbStore({
  uri: process.env.MONGODB_URI,
  collection: "sessions",
});
const csrfProt = csrf();
const bufferStorage = multer.memoryStorage();

/*
██╗  ██╗███████╗██╗     ██████╗ ███████╗██████╗ ███████╗
██║  ██║██╔════╝██║     ██╔══██╗██╔════╝██╔══██╗██╔════╝
███████║█████╗  ██║     ██████╔╝█████╗  ██████╔╝███████╗
██╔══██║██╔══╝  ██║     ██╔═══╝ ██╔══╝  ██╔══██╗╚════██║
██║  ██║███████╗███████╗██║     ███████╗██║  ██║███████║
╚═╝  ╚═╝╚══════╝╚══════╝╚═╝     ╚══════╝╚═╝  ╚═╝╚══════╝
*/

const fileFilter = (req, file, callback) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

/*
 █████╗ ██████╗ ██████╗     ███████╗███████╗████████╗████████╗██╗███╗   ██╗ ██████╗ 
██╔══██╗██╔══██╗██╔══██╗    ██╔════╝██╔════╝╚══██╔══╝╚══██╔══╝██║████╗  ██║██╔════╝ 
███████║██████╔╝██████╔╝    ███████╗█████╗     ██║      ██║   ██║██╔██╗ ██║██║  ███╗
██╔══██║██╔═══╝ ██╔═══╝     ╚════██║██╔══╝     ██║      ██║   ██║██║╚██╗██║██║   ██║
██║  ██║██║     ██║         ███████║███████╗   ██║      ██║   ██║██║ ╚████║╚██████╔╝
╚═╝  ╚═╝╚═╝     ╚═╝         ╚══════╝╚══════╝   ╚═╝      ╚═╝   ╚═╝╚═╝  ╚═══╝ ╚═════╝ 
*/
//init settings
Settings.importSettings();

//internationalization setting
i18n.configure({
  locales: Settings.getSetting("lang").options,
  directory: path.join(__dirname, "i18n"),
  register: global,
  cookie: "site_lang",
});
app.use(i18n.init);
//setting default language based on app settings
app.use((req, res, next) => {
  const locale = Settings.getSettingVal("lang");

  req.setLocale(locale);
  next();
});

//view engine
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "pug");

//parsers
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  multer({
    storage: bufferStorage,
    fileFilter: fileFilter,
  }).single("picture")
);

//static folders
app.use(
  "/uploads/images",
  express.static(path.join(__dirname, "./uploads/images"))
);
app.use(express.static(path.join(__dirname, "./public")));

//session manager
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

//csrf attacks protection
app.use(csrfProt);

//validator
app.use(flash());

//adding user class to request
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }

  User.findById(req.session.user._id)
    .then((user) => {
      if (user) {
        req.user = user;
      }

      next();
    })
    .catch((err) => {
      throw Error(err);
    });
});

//global view variables
app.use((req, res, next) => {
  res.locals.isAuth = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  res.locals.user = req.session.user;
  res.locals.Settings = Settings;

  next();
});

//routes
app.use((req, res, next) => {
  const date = new Date(),
    year = date.getFullYear(),
    { inputs } = Settings.getSetting("socials");

  const socials = Object.values(inputs)
    .map(({ label: title, value: href, icon: styling, checked }) =>
      checked ? { title, href, styling } : null
    )
    .filter((elem) => elem);

  res.locals.page = {
    footer: {
      widgets: [
        {
          type: "map",
          map: {
            src:
              "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d163403.68858786282!2d18.866767325278037!3d50.21380749002324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4716ce2336a1ccd1%3A0xb9af2a350559fabb!2sKatowice!5e0!3m2!1spl!2spl!4v1599822661156!5m2!1spl!2spl",
          },
        },
        {
          header: "Contact",
          type: "list",
          content: [
            { header: "Email", content: "shopjs@shop.com" },
            { header: "Address", content: "Miasto 99-999, ul. ulica 9" },
            { header: "Phone", content: "999 999 999" },
          ],
        },
        {
          header: "Menu",
          type: "list",
          content: [
            { link: { title: "Shop", href: "/shop" } },
            { link: { title: "Contact", href: "/contact" } },
            { link: { title: "Home", href: "/" } },
          ],
        },
        {
          header: "Socials",
          type: "icons",
          content: socials,
        },
      ],
      copyright: `${Settings.getSettingVal("siteTitle")} copyright ${year}`,
    },
  };

  next();
});
app.use(authRoutes);
app.use("/admin", isAuth, adminRoutes);
app.use(shopRoutes);
/*app.use((err, req, res, next) => {
  resolveError(err, res);
});*/

//error views
app.use("/500", get500);
app.use(get404);

//database connection with listen loop
mongoose
  .connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((client) => {
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => console.log(err));
