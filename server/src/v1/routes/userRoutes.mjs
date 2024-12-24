import express from 'express'
import UserController from '../controllers/userController.mjs'
import UserValidator from '../../../validators/userValidator.mjs'

import { checkSchema } from 'express-validator'

const router = express.Router()

router.get('/', UserController.usersList)

router.get('/edit/:id', UserController.getUser)

router.post('/add/:id?', checkSchema(UserValidator.userSchema), UserController.registerUser)

router.put('/update/:id', UserController.updateUser)

router.delete('/delete', UserController.deleteUser)

export default router
