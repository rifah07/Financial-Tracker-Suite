const mongoose = require("mongoose");

const refreshTokenSchema = new mongoose.Schema(
    {
        token: { type: String, required: true },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("refresh_tokens", refreshTokenSchema);