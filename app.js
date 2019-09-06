const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const general = require('./controllers/general');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const { get404 } = require('./controllers/404');


app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

//app.use(general);
app.use('/admin', adminRoutes);
app.use('/shop', shopRoutes);

app.use(get404);

app.listen(4000);
