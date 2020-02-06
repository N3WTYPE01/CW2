const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
const dbname = "appDB";
const url = "mongodb://localhost:27017";
const mongoOptions = {useNewUrlParser : true,  useUnifiedTopology: true };

const state = {
    db: null

};
//create database
const connect = (cb) => {
    if (state.db)
    cb();
    else{
        MongoClient.connect(url,mongoOptions,(err,client)=>{
            if (err)
            cb(err);
            else {

                state.db = client.db(dbname);
                cb();
            }
        });
    }
}

const getPrimaryKey = (_id) =>{
    return ObjectID(_id);
}

const getDB = ()=>{
    return state.db;
}

//create users collection
MongoClient.connect(url,mongoOptions, function(err, db) {
  if (err) throw err;
  var dbo = db.db("appDB");
  dbo.createCollection("appUsers", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();

    //insert courses
    MongoClient.connect(url, mongoOptions,function(err, db) {
        if (err) throw err;
        var dbo = db.db("appDB");
        var myobj = [
          { ObjectID, course: 'Math', description: 'Maths is Fun!'},
          { ObjectID, course: 'English'},
          { ObjectID, course: 'PE'},
          { ObjectID, course: 'Drama'},
          { ObjectID, course: 'Science'},
          { ObjectID, course: 'Art'},
          { ObjectID, course: 'Food Tech'},
          { ObjectID, course: 'ICT'},
          { ObjectID, course: 'Media'},
          { ObjectID, course: 'French'},
         
        ];
        dbo.collection("courses").insertMany(myobj, function(err, res) {
          if (err) throw err;
          console.log("Number of documents inserted: " + res.insertedCount);
          db.close();
        });
      });



  });
});
module.exports = {getDB,connect,getPrimaryKey};
