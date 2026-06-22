const user = require("../models/user");

module.exports.getSignup =  (req, res) => {
    res.render("signup.ejs");
};

module.exports.signUp = async (req, res, next) => {
    let {username, email, password} = req.body;
    let newUser = {
        email, username
    }
    let registeredUser = await user.register(newUser, password);
    req.login(registeredUser,(err)=>{
        if(err){
            return next(err);
        }
    req.flash("success", "Welcome to Homify!");
    res.redirect("/");

    });
   
};

module.exports.getLogin =  (req, res) => {
    res.render("login.ejs");
};

module.exports.loginUser = (req, res) => {
        req.flash("success", "Welcome back!");
        let redirectUrl = res.locals.redirectUrl || "/";
        res.redirect(redirectUrl);
    };

module.exports.logOut = (req, res, next) => {
    req.logout(err => {
        if (err) return next(err);
        req.flash("success", "You have logged out successfully!");
        res.redirect("/");
    });
};
