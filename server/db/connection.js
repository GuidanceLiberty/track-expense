const mongoose = require('mongoose');
require('dotenv').config();

const conn = mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(db => {
    console.log("✅ MongoDB Connected");
    return db;
})
.catch(err => {
    console.error("❌ MongoDB Connection Error:", err.message);
});

module.exports = conn;