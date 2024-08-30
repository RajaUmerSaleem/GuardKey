const { parse } = require('dotenv');
const express = require('express')
var cors = require('cors')
const { MongoClient } = require('mongodb');
require('dotenv').config()
const bodyparser = require('body-parser')
console.log(process.env)
const app = express()
app.use(bodyparser.json())
app.use(cors())
const port = 3000
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const client = new MongoClient(url);

async function startServer() {
    await client.connect();
    const dbName = 'Guardkey';
    //adding 
    app.post('/', async (req, res) => {
        const password = req.body;
        const db = client.db(dbName);
        const collection = db.collection('passwords');
        const findResult = await collection.insertOne(password)
        res.send({ "success": true, "Result": findResult })
    })
    //deleting the password
    app.delete('/', async (req, res) => {
        const password = req.body;
        const db = client.db(dbName);
        const collection = db.collection('passwords');
        const findResult = await collection.deleteOne(password)
        res.send({ "success": true, "Result": findResult })
    })
    app.put('/', async (req, res) => {  
            const { filter, newPassword } = req.body; // Assuming filter and newPassword are sent in the request body  
            const db = client.db(dbName);  
            const collection = db.collection('passwords');  
            const findResult = await collection.replaceOne(filter, newPassword);  
            res.send({ "success": true, "result": findResult});  
    });
    //saving the password
    app.get('/', async (req, res) => {
        const db = client.db(dbName);
        const collection = db.collection('passwords');
        const findResult = await collection.find({}).toArray();
        res.send(findResult)
    })

    app.listen(port, () => {
        console.log(`Example app listening on port http://127.0.0.1:${port}`)
    })
}
startServer();