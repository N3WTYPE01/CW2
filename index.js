//dependencies
var express = require("express");
var bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
const path = require('path');


const db = require("./db")

const collection = "courses";
//html file for user
app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
});



// get all courses
app.get('/getCourses',(req,res)=>{
    db.getDB().collection(collection).find({}).toArray((err,documents)=>{
        if(err)
        console.log(err);
        else{
            console.log(documents);
            res.json(documents);
        }
    })
})

//edit a course using ID
app.put('/:id', (req,res)=>{
    const courseID = req.params.id;
    const userInput  = req.body;

    db.getDB().collection(collection).findOneAndUpdate({_id : db.getPrimaryKey(courseID)}, {$set: {course : userInput.course}}, {returnOriginal: false}, (err, result)=>{
        if(err)
        console.log(err);
        else{
            res.json(result);
        }
    });
});

// add new course
app.post('/',(req,res)=>{
    const userInput = req.body;
    db.getDB().collection(collection).insertOne(userInput,(err,result)=>{
        if(err)
        console.log(err);
        else{
            res.json({result : result, document: result.ops[0]});
        }
    })
})

// delete course
app.delete('/:id',(req, res)=>{
const courseID = req.params.id;
db.getDB().collection(collection).findOneAndDelete({_id : db.getPrimaryKey(courseID)},(err,result)=>{
  if (err)
  console.log(err)
  else{
      res.json(result);
  }  
})
})



db.connect((err)=>{
    if(err){
        console.log("unable to access database");
        process.exit(1);
    }
    else{
        app.listen(3000,()=>{
            console.log("connected to database listening on port 3000...")
        });
    }
})