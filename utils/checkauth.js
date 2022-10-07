const checkLogin = (req, res, next) => {
    // If the user is not logged in, then the user will be redirect login page
    if (!req.session.logged_in) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  module.exports = checkLogin;