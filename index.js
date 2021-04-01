require('dotenv').config();
const express = require("express");
const mongodb = require("mongodb");

const mongoClient = mongodb.MongoClient;

const objectId = mongodb.ObjectID;
const app = express();
app.use(express.json());


const dbUrl = "mongodb://127.0.0.1:27017"||process.env.DB_URL ;
// password    SmujZ3xb2VJDGpnZ



app.get("/", async (req, res) => {
    try {
        let userInfo = await mongoClient.connect(dbUrl);
        let db = await userInfo.db("demo");
        let data = await db.collection("user").find().toArray();
        res.status(200).json(data);
        userInfo.close();
    } catch (error) {
        console.log(error);
    }
});

app.post('/create-user', async (req,res)=>{
    try {
        let client = await mongoClient.connect(dbUrl);
        let db = client.db("demo");
        await db.collection("user").insertOne(req.body);
        res.status(200).json({message:"created"})
        client.close();
    } catch (error) {
        console.log(error)
    }
});
app.put("/update-user/:id",async(req, res)=>{
    try {
        let client = await mongoClient.connect(dbUrl);
        let db = client.db("demo");
        await db.collection("user").findOneAndUpdate({_id:objectId(req.params.id)},{$set:req.body});
        res.status(200).json({message:"updated successfully"})
        client.close();
    } catch (error) {
        console.log(error)
    }
})

app.delete("/delete-user/:id",async(req, res)=>{
    try {
        let client = await mongoClient.connect(dbUrl);
        let db = client.db("demo");
        await db.collection("user").deleteOne({_id:objectId(req.params.id)});
        res.status(200).json({message:"deleted successfully"})
        client.close();
    } catch (error) {
        console.log(error)
    }
})
app.listen(2000, () => 
    console.log("database added successfully")
);