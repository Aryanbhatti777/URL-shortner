import mongoose from "mongoose"

const linkSchema = new mongoose.Schema({
    originalURL: {
        type: String,
        required: true
    },
    shortCode: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        default: 0
    }
})

const linkModel = mongoose.model("Links", linkSchema);

export default linkModel;