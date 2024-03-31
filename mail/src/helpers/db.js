const mongo = require('mongoose');
const { db } = require("../configuration");

module.exports.connectDb = () => {
    mongo.connect(db, { useNewUrlParser: true });

    return mongo.connection;
}