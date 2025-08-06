import { Router } from 'express';
import productSectionController from '~/controllers/product-section.controller';

const productSectionRouter = Router();

productSectionRouter.get('/get-all', productSectionController.getAllProductSections);
productSectionRouter.get('/get-all-active', productSectionController.getAllActiveProductSection);
productSectionRouter.get('/reorder-sections', productSectionController.getReOrderedProductSection);
productSectionRouter.get('/:id', productSectionController.getProductSectionById);

export default productSectionRouter;
