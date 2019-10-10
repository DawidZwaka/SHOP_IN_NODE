/*
██╗███╗   ███╗██████╗  ██████╗ ███████╗████████╗███████╗
██║████╗ ████║██╔══██╗██╔═══██╗██╔════╝╚══██╔══╝██╔════╝
██║██╔████╔██║██████╔╝██║   ██║███████╗   ██║   ███████╗
██║██║╚██╔╝██║██╔═══╝ ██║   ██║╚════██║   ██║   ╚════██║
██║██║ ╚═╝ ██║██║     ╚██████╔╝███████║   ██║   ███████║
╚═╝╚═╝     ╚═╝╚═╝      ╚═════╝ ╚══════╝   ╚═╝   ╚══════╝
*/

const express = require('express'),
    i18n = require('i18n'),
    path = require('path'),
    bodyParser = require('body-parser'),
    //general = require('./controllers/general'),
    adminRoutes = require('./routes/admin'),
    shopRoutes = require('./routes/shop'),
    authRoutes = require('./routes/auth'),
    { get404, get500 } = require('./controllers/errors'),
    mongoose = require('mongoose'),
    session = require('express-session'),
    mongodbStore = require('connect-mongodb-session')(session),
    User = require('./models/user'),
    isAuth = require('./middleware/is_auth'),
    flash = require('connect-flash'),
    multer = require('multer'),
    csrf = require('csurf');

/*
 ██████╗ ██████╗ ███╗   ██╗███████╗████████╗ █████╗ ███╗   ██╗███████╗
██╔════╝██╔═══██╗████╗  ██║██╔════╝╚══██╔══╝██╔══██╗████╗  ██║██╔════╝
██║     ██║   ██║██╔██╗ ██║███████╗   ██║   ███████║██╔██╗ ██║███████╗
██║     ██║   ██║██║╚██╗██║╚════██║   ██║   ██╔══██║██║╚██╗██║╚════██║
╚██████╗╚██████╔╝██║ ╚████║███████║   ██║   ██║  ██║██║ ╚████║███████║
 ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝
*/                                                                      

const MONGODB_URI = 'mongodb+srv://shop_user:9LRAM5TqLQJd5C4@shopinnode-vh0qx.mongodb.net/shop';
const app = express();
const store = new mongodbStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});
const csrfProt = csrf();
const fileStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads/images');
    },
    filename: (req, file, callback) => {
        callback(null, `${new Date().toISOString()}-${file.originalname}`)
    }
});


/*
██╗  ██╗███████╗██╗     ██████╗ ███████╗██████╗ ███████╗
██║  ██║██╔════╝██║     ██╔══██╗██╔════╝██╔══██╗██╔════╝
███████║█████╗  ██║     ██████╔╝█████╗  ██████╔╝███████╗
██╔══██║██╔══╝  ██║     ██╔═══╝ ██╔══╝  ██╔══██╗╚════██║
██║  ██║███████╗███████╗██║     ███████╗██║  ██║███████║
╚═╝  ╚═╝╚══════╝╚══════╝╚═╝     ╚══════╝╚═╝  ╚═╝╚══════╝
*/                                                        

global.get_currency = () => 'zł';

const fileFilter = (req, file, callback) => {
    if(
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        callback(null, true);
    } else {
        callback(null, false);
    }
}

/*
 █████╗ ██████╗ ██████╗     ███████╗███████╗████████╗████████╗██╗███╗   ██╗ ██████╗ 
██╔══██╗██╔══██╗██╔══██╗    ██╔════╝██╔════╝╚══██╔══╝╚══██╔══╝██║████╗  ██║██╔════╝ 
███████║██████╔╝██████╔╝    ███████╗█████╗     ██║      ██║   ██║██╔██╗ ██║██║  ███╗
██╔══██║██╔═══╝ ██╔═══╝     ╚════██║██╔══╝     ██║      ██║   ██║██║╚██╗██║██║   ██║
██║  ██║██║     ██║         ███████║███████╗   ██║      ██║   ██║██║ ╚████║╚██████╔╝
╚═╝  ╚═╝╚═╝     ╚═╝         ╚══════╝╚══════╝   ╚═╝      ╚═╝   ╚═╝╚═╝  ╚═══╝ ╚═════╝ 
*/                                                                                    

//internationalization setting 
app.use(i18n.init);
i18n.configure({
    locales:['en', 'pl'],
    directory: path.join(__dirname, 'i18n'),
    defaultLocale: 'en',
    register: global,
    cookie: 'site_lang',
});

//view engine
app.set('view engine', 'pug');

//parsers 
app.use(bodyParser.urlencoded({extended: false}));

app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'));

//static folders
app.use('/uploads/images', express.static(path.join(__dirname, 'uploads/images')));
app.use(express.static(path.join(__dirname, 'public')));

//session manager
app.use(
    session({
        secret: 'my secret', 
        resave: false, 
        saveUninitialized: false, 
        store: store
    })
);

//csrf attacks protection
app.use(csrfProt);

//validator
app.use(flash());

//adding user class to request
app.use((req, res, next) => {
    if(!req.session.user){
        return next();
    }

    User.findById(req.session.user._id)
        .then( user => {
            if(user) {
            req.user = user;
            }

            next();
        })
        .catch( err => {throw Error(err)} );
})

//global view variables
app.use( (req, res, next) => {
    res.locals.isAuth = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    res.locals.user = req.session.user;

    next();
});

//routes
app.use( (req, res, next) => {
    const date = new Date(),
        year = date.getFullYear();

    res.locals.page = {
        socials: {
            fb: {
                icon: 'fab fa-facebook-f'
            }
        },
        footer: {
            widgets: null,
            copyright: `Copyright SHOP.JS ${year}`
        }
    }

    next();
});
app.use('/admin', isAuth, adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use('/500', get500);
app.use(get404);

//database connection with listen loop
mongoose.connect( MONGODB_URI ,
    {useUnifiedTopology: true,
    useNewUrlParser: true,})
    .then( client => {
        app.listen(3000);
    })
    .catch( err => console.log(err));