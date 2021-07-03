const converter = require('json-2-csv');
fs = require('fs');
const dbConnector = require("./utils/dbConnector");

const parseToFile = async(req, res) => {
    console.log([req.body]);
    await dbConnector("users").insert([req.body]);
    // console.log(await dbConnector("users").select());
    res.sendStatus(200);
}

module.exports = parseToFile;