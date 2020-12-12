const express = require('express'),
    app = express(),
    mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/personalDB', {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log("DataBase Connected");
}).catch(err=>{
    console.log("Error : "+ err);
})

app.use(express.static(__dirname))
app.use(express.urlencoded({extended: true}))

var stuSchema = new mongoose.Schema({
    name: String,
    dob: String,
    age: Number,
    gender: String,
    graduation: String,
    email: String,
    dept: String,
    year: Number,
    phone: String
   })

var Student = mongoose.model("Student", stuSchema);

app.get("/", (req, res)=>{
    res.sendFile(__dirname+"/index.html")
})

app.post("/", (req, res)=>{
    var data = {
        name: req.body.name,
        dob: req.body.dob,
        age: Number(req.body.age),
        gender: req.body.gender,
        email: req.body.email,
        graduation: req.body.gra,
        dept: req.body.dept,
        year: Number(req.body.year),
        phone: req.body.phone,
        
    }
    var stu = new Student(data);
    stu.save();
    res.redirect("/")
})

app.post("/display", async(req, res)=>{
    const s = await Student.findOne({email:req.body.email})
    res.send(JSON.stringify(s))
})
app.get("/displayall", async(req, res)=>{
    const s = await Student.find({})
    res.send(JSON.stringify(s))
})

app.listen(7000, ()=>{
    console.log("Server listening to port 7000");
})