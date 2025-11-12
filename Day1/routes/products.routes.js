import {Router} from 'express';
import { addProduct, deleteProduct, getAllProducts, updateProduct } from '../controllers/product.controller.js';
import { tokenDecoder } from '../middlewares/tokenMiddleware.js';

const productRouter=Router();


productRouter.get('/products',getAllProducts)

productRouter.post('/add-product',addProduct)

productRouter.put("/:id", tokenDecoder, updateProduct);
productRouter.delete("/:id", tokenDecoder, deleteProduct);
export default productRouter;