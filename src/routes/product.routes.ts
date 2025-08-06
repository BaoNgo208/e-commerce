import { Router } from 'express';
import productController from '~/controllers/product.controller';

const productRouter = Router();

productRouter.get('/products', productController.getAllProducts);
productRouter.get('/:id', productController.getProductById);
productRouter.post('/create', productController.createProduct);
productRouter.get('/not-in-section/:sectionId', productController.getAllProductNotInSection);
productRouter.post('/add-to-section', productController.addProductsToSection);
productRouter.delete('/remove-from-section', productController.removeProductsFromSection);

export default productRouter;
