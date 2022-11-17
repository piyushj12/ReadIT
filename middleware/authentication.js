exports.isAuthenticated = (req, res, next) => {

    if (req.session.user) {
        return next();
    }

    else {
       req.flash('error', 'You are not logged in, please login.');
        return res.redirect('/users/login');
    }

}