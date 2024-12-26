import mongoose from 'mongoose'
const { Schema } = mongoose

const genderSchema = new Schema({
	name: {
		type: String,
		enum: ['women', 'men'],
		required: [true, 'Gender is required'],
		trim: true,
		set: (v) => v.toLowerCase(),
	},
})

const Gender = mongoose.model('Gender', genderSchema)
export default Gender
