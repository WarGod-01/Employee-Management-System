const express =require("express")
const mongoose =require("mongoose")
const cors =require("cors")
const EmployeeModel =require('./model/Employee');
const DashBoardModel =require('./model/Dashboard');
const DashBoard = require("./model/Dashboard");


const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/Employee")

app.post('/login',(req,res)=> {
    const {email, password}=req.body;
    EmployeeModel.findOne({ email: email})
    .then(user =>{
        if(user){
        if(user.password === password){
            res.json("Success")
        }else{
            res.json("Password is incorect")
        }
    }else {
        res.json("No Record existed")
    }
    })
})
app.post('/add',(req,res) =>{
    DashBoardModel.create(req.body)
    .then(DashBoard => res.json(DashBoard))
    .catch(err => res.json(err))
})

app.get('/dashboard',async (req,res) =>{
        try{
            const dashboard = Dashboard.find()
            return res.json(dashboard)
        }catch(err){
            return res.json(err)

        }
})

app.post('/register',(req,res) =>{
        EmployeeModel.create(req.body)
        .then(Employee => res.json(Employee))
        .catch(err => res.json(err))
})
app.listen(3001, ()=>{
    console.log("sever is running")
})