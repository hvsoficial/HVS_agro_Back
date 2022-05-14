const mongoose = require("mongoose");

const TractorSchema = new mongoose.Schema({
    title: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model("tractor", TractorSchema);