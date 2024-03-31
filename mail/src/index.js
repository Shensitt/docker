const express = require('express');
const app = express();
const axios = require('axios');
const { connectDb } = require('./helpers/db');


const { host, port, db} = require("./configuration");

startServer = () => {
    app.listen(port, () => {
        console.log(`Started auth service on port ${port}`);
        console.log(`On host ${host}`);
        console.log(`our database ${db}`);
    });
}

//app.get('/test', (req,res)=>{
// res.send("Our auth server is working correctly");
//});

//app.get("/api/testwithapidata", (req, res) => {
//    axios.get(apiUrl + '/testapidata').then(response => {
//        res.json({
//            testapidata: response.data.testwithapi
//        });
//    });
//});

app.get("/api/testmail", (req, res) => {
    //startServer;
    //app.listen(port, () => {
    //    console.log(`Started mail service on port ${port}`);
    //    console.log(`On host ${host}`);
    ////   # console.log(`our database ${db}`);
    //});
    res.json({
        testmailsent: true
    });
    
});

//app.get("/api/currentUser", (req, res) => {
//    res.json({
//        id: "1234",
//        email: "foo@gmail.com"
//    });
//});

connectDb()
    .on("error", console.log)
    .on("disconnect", connectDb)
    .once("open", startServer);