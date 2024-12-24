import mongoose from 'mongoose'
const { Schema } = mongoose
import bcrypt from 'bcryptjs'

const userSchema = new Schema({
	email: {
		type: String,
		required: [true, 'Email is required'],
		minlength: [3, 'Email must be at least 3 characters long'],
		trim: true,
	},
	password: {
		type: String,
		required: function () {
			return this.status !== 'guest'
		},
		// minlength: [6, 'Password must be at least 6 characters long'],
		// maxlength: [8, 'Password must be at most 8 characters long'],
		// validate: {
		//   validator: function (v) {
		//     return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
		//       v
		//     )
		//   },
		//   message: (props) =>
		//     'Password must contain at least one letter, one number, and one special character',
		// },
	},
	status: {
		type: String,
		enum: ['guest', 'registered'],
		default: 'guest',
	},
	type: {
		type: Schema.Types.ObjectId,
		ref: 'Type',
		default: new mongoose.Types.ObjectId('67434ecae0c00366f89f7189'),
	},
	name: {
		type: String,
		default: 'Guest',
	},
	cart: [
		{
			productId: {
				type: Schema.Types.ObjectId,
				ref: 'Product',
			},
			quantity: {
				type: Number,
				default: 1,
			},
		},
	],
})

userSchema.index(
	{ email: 1 },
	{
		unique: true,
		partialFilterExpression: { status: { $ne: 'guest' } },
	}
)

//---------------- Функція для перевірки правильності пароля ------------
userSchema.methods.validPassword = async function (password) {
	const isMatch = await bcrypt.compare(password, this.password)

	return isMatch
}

const User = mongoose.model('User', userSchema)
export default User
