import {Router} from 'express';

const productRouter=Router();


productRouter.get('/products',(req,res)=>{
    res.send("Hello! This is get Product API");
})

export default productRouter;