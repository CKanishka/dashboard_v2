const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mysql=require('mysql');

const app= express();

app.use(cors());

const db = mysql.createConnection({
    host : 'localhost',
    user : 'rootkc',
    password : '12345678',
    database : 'mydb'
});

db.connect(err=>{
    if(err){
        console.log("Error Connecting");
        return err;
    }
});

app.get('/',(req,res)=>{res.send("The app is connected")})

app.get('/data',(req,res)=>{
    var sql = 'SELECT * FROM data';
    db.query(sql, (err, result)=>{
    if(err){ 
        return res.send(err);
    }  
    else {  
    console.log(result);
    return res.json({
        data:result
    })
    }
});
});

app.get('/data_pie',(req,res)=>{
    var sql = 'SELECT * FROM data_pie';
    db.query(sql, (err, result)=>{
    if(err){ 
        return res.send(err);
    }  
    else {  
    console.log(result);
    return res.json({
        data:result
    })
    }
});
});

app.listen(process.env.PORT || 3000,()=>{
    console.log(`server is running on port ${process.env.PORT}`);
})