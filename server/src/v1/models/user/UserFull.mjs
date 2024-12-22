import mongoose from 'mongoose'
const { Schema } = mongoose
import bcrypt from 'bcryptjs'

// Створення схеми користувача
const userFullSchema = new Schema({
	firstName: {
		type: String,
		required: [true, 'First name is required'],
		minlength: [3, 'First name must be at least 3 characters long'],
		maxlength: [50, 'First name must be at most 50 characters long'],
		trim: true,
	},
	lastName: {
		type: String,
		required: [true, 'Last name is required'],
		minlength: [3, 'Last name must be at least 3 characters long'],
		maxlength: [50, 'Last name must be at most 50 characters long'],
		trim: true,
	},

	type: {
		type: Schema.Types.ObjectId,
		ref: 'Type',
	},
})

// Хешування паролю перед збереженням
userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		return next()
	}
	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
	next()
})

//---------------- Функція для перевірки правильності пароля ------------
userSchema.methods.validPassword = async function (password) {
	const isMatch = await bcrypt.compare(password, this.password)

	return isMatch
}

const User = mongoose.model('User', userSchema)
export default User
