const express = require('express');
const { connectDb } = require('./helpers/db');
const app = express();
const axios = require('axios');

const { host, port, db, apiUrl, mailUrl } = require("./configuration");
//const { mailUrl } = require('../../mail/src/configuration/index');

const startServer = () => {
    app.listen(port, () => {
        console.log(`Started auth service on port ${port}`);
        console.log(`On host ${host}`);
        console.log(`our database ${db}`);
    });
}

app.get('/test', (req,res)=>{
 res.send("Our auth server is working correctly");
});

app.get("/api/testwithapidata", (req, res) => {
    axios.get(apiUrl + '/testapidata').then(response => {
        res.json({
            testapidata: response.data.testwithapi
        });
    });
});

app.get("/api/currentUser", (req, res) => {
    axios.get(mailUrl + '/testmail').then(response => {
        res.json({
            id: "1234",
            email: "foo@gmail.com",
            authmailsent: response.data
        });
    });
    
});

connectDb()
    .on("error", console.log)
    .on("disconnect", connectDb)
    .once("open", startServer);