import mongoose from "mongoose"

const ChallengeSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    }, 
    answer: {
        type: String,
        required: true
    },
    nSolvers: {
        type: Number
    },
    roomNumber: {
        type: Number,
        required: true
    },
    challengeNumber: {
        type: Number,
        required: true
    }
})

const Challenge = mongoose.model('Challenge', ChallengeSchema);
export { Challenge }