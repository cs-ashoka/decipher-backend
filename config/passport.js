import passport from "passport";
import { Strategy } from "passport-local";

import { User } from "../models/User.js";

passport.use(new Strategy(async (username, password, done) => {
    const user = await User.findOne({username: username})

    if (!user) {
        return done(null, false, {message: "User not found"})
    }

    // only use non-hashed in case passwds are manually given to users else compare hashed passwds with bcrypt
    if (password === user.password) {
        return done(null, user)
    }
    
    return done(null, false, {message: "Incorrect password"})
}));

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id)
        done(null, user)
    } catch (err) {
        done(err, null)
    }
}); 
