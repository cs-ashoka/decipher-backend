import { User } from "../models/User.js";

export default async (req, res, next) => {
    const nChallenges = 20 // update to the number of challenges
    const user = await User.findOne({ user_id: req.user.user_id });
    if (req.user && user.__v >= nChallenges + 1) { // +1 since __v starts from 1
        return res.status(403).send({ msg: "You have already finished the game" });
    }
    return next();
}