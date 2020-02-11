const cred = require("./cred");
const express = require('express');
const crypto = require("crypto");
const fs = require("fs");
const MongoClient = require("mongodb").MongoClient;
const path = require('path');
var busboy = require("connect-busboy");
var bodyParser = require('body-parser');


const app = express();
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(busboy());
let vk_whitelist = ["491569002", "208378160"];
function checkCreds(obj){
    return crypto.createHash("md5").update("7303225"+obj.user_id+cred.app_key ).digest("hex") === obj.hash
}

function isAdmin(obj){
    return checkCreds(obj) && vk_whitelist.includes(obj.user_id);
}

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
    });
    app.post("/updatePerson", (req, res)=>{
        console.log(req.body);
        if(isAdmin(req.query)){
            db.collection("teachers").updateOne(
                {uid:Number(req.query.uid)},
                {$set: {text: req.body.text}}
            );
            res.send("true");
        }else{
            res.send("not admin");
        }
    });
    app.get("/getPending", (req, res)=>{
        if( isAdmin(req.query) )
            db.collection("pending").find({}).toArray( (err,result)=>{
                res.send(JSON.stringify(result))
            } );
        else
            res.send("not admin");
    });
    app.get("/approveReview", (req, res)=>{
        if( isAdmin(req.query) ){
            db.collection("pending").findOne({_id:req.query.id}, (err, res)=>{
                if(err){
                    res.send("not found");
                    return;
                }
                db.collection("pending").removeOne({_id:req.query.id});
                if(req.query.approve === "true")
                    db.collection("teachers").insertOne(res);
            })
        } else
            res.send("not admin");
    });
    app.post("/newReview",(req, res)=>{
        if(req.busboy) {
            var form = {};
            req.busboy.on("file", function(fieldName, fileStream, fileName, encoding, mimeType) {
                fileStream.pipe(fs.createWriteStream(path.join(__dirname, "../data", fileName)));
                form.avatar = fileName;
            });
            req.busboy.on("field", function (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
                form[fieldname] = val;
            });
            req.busboy.on("finish", ()=>{
                db.collection("pending").insertOne({
                    _id:form.name+ Math.round(Math.random() * 1024),
                    persName:form.name,
                    persStatus:form.status,
                    persAvatar:"/data/"+form.avatar,
                    text:form.text,
                    uid: Math.round(Math.random() * 1024)
                });
            });
            return req.pipe(req.busboy)
        }
    });
    app.get("/newComment", (req, res)=>{
        let objInsert = {
            text: req.query.text
        };
        if(req.query.img)
            objInsert.img = req.query.img;
        if(req.query.name)
            objInsert.name = req.query.name;
        db.collection("teachers").updateOne(
            {uid:Number(req.query.uid)},
            {$push:{comments:objInsert}}
        );

        console.log(objInsert);
        res.send("ok")
    });
} );





app.use(express.static(path.join(__dirname, '../build')));
app.use("/data", express.static(path.join(__dirname, "../data")));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.get('/admin', (req, res)=>{
   res.sendFile(path.join(__dirname, "../data/adminpage.html"))
});





app.get("/checkHash", (req, res)=>{
    res.send(checkCreds(req.query));
});

app.get("/isAdmin", (req, res)=>{
   res.send(
        isAdmin(req.query)
   );
});





app.listen(800);
