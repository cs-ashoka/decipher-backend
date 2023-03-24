import passport from "passport";
import express from "express";

const router = express.Router();

router.post('/', passport.authenticate('local'), (req, res) => {
    res.json({success: true, id: req.session.passport.user})
})

export { router }