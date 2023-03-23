import mongoose from "mongoose"

const LogSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    }, 
    answer: {
        type: String,
        required: true,
    }, 
    challengeNumber: {
        type: Number,
        required: true
    },
    time: {
        type: Date,
        required: true
    }
})

const Log = mongoose.model('Log', LogSchema);
export { Log }