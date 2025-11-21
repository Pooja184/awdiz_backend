import {Router} from 'express';
import { addProduct, deleteProduct, getAllProducts, updateProduct } from '../controllers/product.controller.js';
import { tokenDecoder } from '../middlewares/tokenMiddleware.js';
import { aggregationPipeline, aggregationPipeline1, operatorsAssignment } from '../controllers/operators.js';

const productRouter=Router();


productRouter.get('/products',getAllProducts)

productRouter.post('/add-product',tokenDecoder,addProduct)

productRouter.put("/:id", tokenDecoder, updateProduct);
productRouter.delete("/:id", tokenDecoder, deleteProduct);


// assignment
productRouter.get("/operator",operatorsAssignment)
productRouter.get("/aggregation",aggregationPipeline)
productRouter.get("/aggregation1",aggregationPipeline1)


export default productRouter;