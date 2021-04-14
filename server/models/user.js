const mongoose = require('mongoose');

mongoose.connect(`${process.env.DB_Uri}/${process.env.DB}`, { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    name: { type: String },
    avatar: { type: String }
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;