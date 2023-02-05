const {MongoClient} = require("mongodb");

let mongo;
let db;


async function insertUserDetails(details){
    mongo = await MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true }); 
    db = mongo.db("test");
    await db.collection('users').insertOne(details);
    mongo.close();
    return "ok";

}
const express = require('express');
const app = express();

app.use(express.static('public'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

app.get('/api/send-register', (req, res) => {
 // console.log("helloworld");
  const inputValue = req.query.value;
  console.log(JSON.parse(inputValue)['name']);
  const message = insertUserDetails(JSON.parse(inputValue));
  res.send({ message });
});