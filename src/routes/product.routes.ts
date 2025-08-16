import { Router } from 'express';
import productController from '~/controllers/product.controller';

const productRouter = Router();

productRouter.get('/public/products', productController.getAllProducts);
productRouter.post('/create', productController.createProduct);
productRouter.post('/add-to-section', productController.addProductsToSection);
productRouter.delete('/remove-from-section', productController.removeProductsFromSection);
productRouter.get('/not-in-section/:sectionId', productController.getAllProductNotInSection);
productRouter.get('/:id', productController.getProductById);

export default productRouter;
