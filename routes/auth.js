import passport from "passport";
import express from "express";

import { User } from '../models/User.js';

const router = express.Router();

router.post('/', passport.authenticate('local'), async (req, res) => {
    const user = await User.findOne({username: req.user.username})

    user.user_id = req.session.passport.user
    await user.save()

    res.json({success: true, id: req.session.passport.user})
})

export { router }