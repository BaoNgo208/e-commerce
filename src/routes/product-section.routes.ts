import { Router } from 'express';
import productSectionController from '~/controllers/product-section.controller';

const productSectionRouter = Router();

productSectionRouter.get('/get-all', productSectionController.getAllProductSections);
productSectionRouter.get('/public/get-all-active', productSectionController.getAllActiveProductSection);
productSectionRouter.post('/reorder-sections', productSectionController.getReOrderedProductSection);
productSectionRouter.get('/:id', productSectionController.getProductSectionById);

export default productSectionRouter;
