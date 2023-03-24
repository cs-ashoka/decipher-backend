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
    user_id: {
        type: String,
    },
    currentRoom: {
        type: Number,
    },
    currentChallenge: {
        type: Number,
    },
    challengesSolved: {
        type: Array,
        default: 0
    },
    lastChallengeSolveTime: {
        type: Date
    }
})

const User = mongoose.model('User', UserSchema);
export { User }