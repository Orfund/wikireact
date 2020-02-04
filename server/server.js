const express = require('express');
const MongoClient = require("mongodb").MongoClient;
const path = require('path');
const app = express();

let mongoClient = new MongoClient("mongodb://localhost:27017/", {useNewUrlParser: true});
mongoClient.connect( (err, client)=>{
    if( err ) {
        console.log(`error connecting to mongo: ${err}`);
        client.close();
    }
    let db = client.db("db");
    let teachers = db.collection("teachers");
    app.get('/allPersons', (req, res)=>{
        teachers.find({}, {text: 0}).toArray( (err, result)=>{
            if (err)
                throw err;
            res.send(JSON.stringify(result))
        } )
    });
    app.get('/person', (req, res)=>{
        teachers.findOne({uid: Number(req.query.uid)}, (err, result)=>{
            if(err)
                throw err;
            res.send(JSON.stringify(result))
        } )
    })
} );





app.use(express.static(path.join(__dirname, '../build')));
app.use("/data", express.static(path.join(__dirname, "../data")));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.get('/admin', (req, res)=>{
   res.sendFile(path.join(__dirname, "../data/adminpage.html"))
});

app.listen(80);
