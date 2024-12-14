import express from 'express'
import { checkSchema } from 'express-validator'

import UserValidator from '../../../validators/userValidator.mjs'
import AuthController from '../controllers/authController.mjs'

const router = express.Router()

router.post('/signup', checkSchema(UserValidator.userSchema), AuthController.signup)
router.post('/login', checkSchema(UserValidator.authSchema), AuthController.login)

export default router
