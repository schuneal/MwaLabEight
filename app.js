const express = require('express');
const MyMongoClient = require('mongodb');
const connection = require('./mydatabaseconfig')
const router = express.Router();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('x-powered-by', false);


MyMongoClient.connect(connection.loc, function (err, client) {
    const db = client.db(connection.name);


router.get("/location",function(req,res){
    db.collection(connection.tableName).find().toArray(function(err,result){
        if(err)throw err;
        res.json(result)
    })
})



router.post("/location",(request, response) => {
        if(err) throw err
        db.collection(connection.tableName).save(request.body,function(err,abc) {
        if (err) throw err;
        response.json("succesfully saved");
        
        client.close();
    })
    })


    router.get("/location/:name",function(req,res){
        const query={"name":req.params.name};
        db.collection(connection.tableName).findOne(query,function(err,doc){
            if(err)throw err;
            res.status(200).json(doc)
        })
    })

    router.put("/location/:name", function(req, res){
        var query = {"name" : req.params.name};
        var operator = {'$set' : {"category" : req.body.category, "location.latitude": req.body.location.latitude, "location.longitude": req.body.location.longitude}};
        db.collection(connection.tableName).update(query, operator, function(err, data){
            if(err) throw err;
            res.json("Updated Successfully")
        })

    })

    router.delete("/location/:name",function(req,res){
        const query={"name":req.params.name};
        db.collection(connection.tableName).findOneAndDelete(query,function(err,doc){
            if(err)throw err;
            res.status(200).json(doc)   
        })
    })
})

app.use('/api', router);
app.listen(5000, console.log("Listening to port 5000"));