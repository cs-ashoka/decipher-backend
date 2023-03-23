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
    challengeNumber: {
        type: Number,
    }
})

const Challenge = mongoose.model('Challenge', ChallengeSchema);
export { Challenge }