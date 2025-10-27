const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { savedRedirectUrl } = require("../midlewares");
const { getSignup, signUp, getLogin, loginUser, logOut } = require("../controllers/userController");


router.get("/signup",getSignup);

router.post("/signup",wrapAsync( signUp));

router.get("/login",getLogin);

router.post("/login",
    savedRedirectUrl,
    passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }),
    loginUser
);

router.get("/logout", logOut);


module.exports = router;