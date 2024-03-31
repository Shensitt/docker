const express = require('express');
const { connectDb } = require('./helpers/db');
const app = express();
const axios = require('axios');
const { host, port, db, authApiUrl, mailUrl } = require("./configuration");

const startServer = () => {
    app.listen(port, () => {
        console.log(`Started api service on port ${port}`);
        console.log(`On host ${host}`);
        console.log(`our database ${db}`);
    });
}

app.get('/test', (req,res)=>{
 res.send("Our api server is working correctly");
});

app.get("/api/testapidata", (req, res) => {
    res.json({
        testwithapi: true
    });
});

app.get("/testwithcurrentuser", (req, res) => {
    //console.log('auth api url', authApiUrl);
    axios.get(authApiUrl + '/currentUser').then(response => {
        res.json({
            testwithcurrentuser: true,
            currentUserFromAuth: response.data
        });
    });

});

//app.get("/testwithcurrentuser", (req, res) => {
//    //console.log('auth api url', authApiUrl);
//    axios.get(mailUrl + '/testmail').then(response => {
//        res.json({
//            testwithcurrentuser: true,
//            testmailsent: response.data
//        });
//    });

//});

connectDb()
    .on("error", console.log)
    .on("disconnect", connectDb)
    .once("open", startServer);