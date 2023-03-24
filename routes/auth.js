import passport from "passport";
import express from "express";

const router = express.Router();

router.post('/', passport.authenticate('local', {
    successRedirect: '/play/1/1', 
    failureRedirect: '/', 
}))

export { router }