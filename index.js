const express = require('express')
const app = express()
const port = 8000
require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());


const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pgiio.mongodb.net/employee?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const collection = client.db("employee").collection("employeeDetails");

    // -------sending the employee data to database-------

    app.post('/employeeDetails', (req, res) => {
        const newEmployeeDetails = req.body;
        collection.insertOne(newEmployeeDetails)
            .then(result => { res.send(result.insertedCount > 0) })
        console.log(req.body)
        console.log(err);
    })

    // --------getting all the data from the database--------

    app.get('/allEmployee', (req, res) => {
        collection.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    })

    console.log("success")
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(process.env.PORT || port)