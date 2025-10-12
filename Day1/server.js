import express from 'express';

const app=express();

app.get('/',(req,res)=>{
    res.json("Hello");
    // console.log(req);
    console.log(res)
})

app.get('/name',(req,res)=>{
    res.json("Pooja");
})

app.listen(8000,()=>{
    console.log(`app is listening on port ${8000}`);
})