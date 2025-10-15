import express from 'express';
import 'dotenv/config';             

const app=express();

app.get('/',(req,res)=>{
    // console.log(req);
    res.send(`Hello ${process.env.NAME}! Welcome to the express server`)
    // console.log(res)
    // console.log(`Hello,${process.env.NAME}`);
})

app.get('/name',(req,res)=>{
    res.send("Pooja");
})

app.listen(8000,()=>{
    console.log(`app is listening on port ${8000}`);
})