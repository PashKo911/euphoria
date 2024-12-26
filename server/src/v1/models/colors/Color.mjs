import mongoose from 'mongoose'
const { Schema } = mongoose

const colorSchema = new Schema({
	value: {
		type: String,
		required: [true, 'Color value is required'],
		unique: true,
		trim: true,
		set: (v) => v.toLowerCase(),
	},
})

const Color = mongoose.model('Color', colorSchema)
export default Color
