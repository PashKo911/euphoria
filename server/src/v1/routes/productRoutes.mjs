import express from 'express'
import { checkSchema } from 'express-validator'

import ProductValidator from '../../../validators/productValidator.mjs'
import ProductController from '../controllers/productController.mjs'
import RequestNormalizer from '../../../utils/RequestNormalizer.mjs'

import upload from '../../../middleware/UploadManager.mjs'

const router = express.Router()

router.get('/', ProductController.getAllProducts)

router.get('/edit/:id', ProductController.getProduct)

router.post(
	'/add',
	upload.array('images', 4),
	RequestNormalizer.middleware,
	checkSchema(ProductValidator.productSchema),
	ProductController.registerProduct
)

router.delete('/delete', ProductController.deleteProduct)

router.get('/options', ProductController.getOptions)

export default router
