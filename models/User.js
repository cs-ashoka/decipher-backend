import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    }, 
    password: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    college: {
        type: String
    },
    currentChallenge: {
        type: Number,
    },
    challengesSolved: {
        type: Number,
        default: 0
    },
    lastChallengeSolveTime: {
        type: Date
    }
})

const User = mongoose.model('User', UserSchema);
export { User }