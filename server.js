const express=require('express');
const app=express();
const cors=require('cors');
const bodyparser=require('body-parser');
const mysql=require('mysql');
const port=3000;

app.use(cors());
app.use(bodyparser.json())

const connection=mysql.createConnection({
    host:"127.0.0.1",
    user:"root",
    password:"root",
    database:"rith1"
})

connection.connect((err)=>{
    if(err){
        console.log("Error",err)
    }else{
        console.log("Connected")
    }
    
})
//fetch table data from database to postman 
app.get("/data",(req,res)=>{
    const query = "SELECT * FROM employee";
    connection.query(query,(err,result)=>{
        if(err){
            console.error("Error fetching data:",err);
            res.status(500).json({error:"Internal server error"});

        }else{
            res.json(result);

        }
    });
});
//READ
app.get("/dataone",(req,res)=>{
    const query="SELECT * FROM student";
    connection.query(query,(err,result)=>{
        if(err){
            console.error("Error fetching data:",err);
            res.status(500).json({error:"Internal server error"});

        }
        else{
            res.json(result);
        }
    });
});
//UPDATE
app.post("/dataaa",(req,res)=>{
    const{empid,empname,empemail,empcontact}=req.body;
    const query='INSERT into employee(empid,empname,empemail,empcontact)VALUES(?,?,?,?)';
    connection.query(query,[empid,empname,empemail,empcontact],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.status(200).send('Data Inserted')
        }
    })
})
//CREATE
app.get('/create',(req,res)=>{
    const query='create table if not exists hello(id int primary key auto_increment,name varchar(255) not null,address varchar(255) not null)'
    connection.query(query,(err)=>{
        if(err){
            console.log(err)
        }else{
            res.json({message:'Table created successfully'})
        }
    })
})

//DELETE
app.delete('/delete',(req,res)=>{
    const query='drop table hello'
    connection.query(query,(err)=>{
        if(err){
            console.log(err)
        }else{
            res.json({message:'Table deleted'})
        }
    })
})



app.listen(port,()=>{
    console.log("Server listening on port 3000")
})