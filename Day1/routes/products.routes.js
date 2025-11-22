import {Router} from 'express';
import { addProduct, deleteProduct, getAllProducts, updateProduct } from '../controllers/product.controller.js';
import { tokenDecoder } from '../middlewares/tokenMiddleware.js';
import { aggregationPipeline, aggregationPipeline1, operatorsAssignment } from '../controllers/operators.js';
import { aggregationPipelineTest, getCustomerSummary, getgroupNdSort, getMostSoldProduct, getMumbaiRevenue, getOrderGroup, getOrderProject, getOrdersMatch, getOrderUnwind } from '../controllers/aggregationPipeline.js';

const productRouter=Router();


productRouter.get('/products',getAllProducts)

productRouter.post('/add-product',tokenDecoder,addProduct)

productRouter.put("/:id", tokenDecoder, updateProduct);
productRouter.delete("/:id", tokenDecoder, deleteProduct);


// assignment
productRouter.get("/operator",operatorsAssignment)
productRouter.get("/aggregation",aggregationPipeline)
productRouter.get("/aggregation1",aggregationPipeline1)
productRouter.post("/aggregation-test",aggregationPipelineTest)
productRouter.get("/aggregation-match",getOrdersMatch)
productRouter.get("/aggregation-unwind",getOrderUnwind)
productRouter.get("/aggregation-group",getOrderGroup)
productRouter.get("/aggregation-project",getOrderProject)
productRouter.get("/aggregation-topcus",getgroupNdSort)
productRouter.get("/aggregation-freq",getMostSoldProduct)
productRouter.get("/aggregation-reven",getMumbaiRevenue)
productRouter.get("/aggregation-all",getCustomerSummary)







export default productRouter;