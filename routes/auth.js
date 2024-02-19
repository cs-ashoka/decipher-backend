import passport from "passport";
import express from "express";
import isAuthenticated from "../config/middleware.js";

import { User } from "../models/User.js";

const router = express.Router();

router.post("/", passport.authenticate("local"), async (req, res) => {
  const user = await User.findOne({ username: req.user.username });

  user.user_id = req.session.passport.user;
  await user.save();

  res.json({ success: true, id: req.session.passport.user });
});

router.get("/", isAuthenticated, async (req, res) => {
  res.json({ success: true, id: req.user.user_id });
});

// router.post('/logout', isAuthenticated, async (req, res) => {})

router.post("/logout", isAuthenticated, function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).send({ success: true, msg: "Logged out" });
  });
});

export { router };
