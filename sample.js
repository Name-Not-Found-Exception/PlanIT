const { json } = require("body-parser");
const {MongoClient} = require("mongodb");

let mongo;
let db;
async function run(){
mongo = await MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true }); 
db = mongo.db("test");
let res = await db.collection('users').find({}).toArray();
console.log(res);
mongo.close();

}
run();