module.exports = (req, res, next ) => {

    if(!req.session.isLoggedIn || req.user.accountType !== 'admin') {
        return res.redirect('/');
    }

    next();
}