import { useState } from 'react'
import useHttp from '../../hooks/useHttp'

import InfoInput from '../../components/inputs/InfoInput'
import ButtonPurple from '../../components/buttons/ButtonPurple'
import MultiplySelect from '../../components/slelects/MultiplySelect'
import Textarea from '../../components/textareas/Textarea'
import ImageInputWrapper from '../../components/inputs/ImageInputWrapper'

import styles from './productForm.module.scss'

const ProductForm = () => {
	const { post, process } = useHttp()
	const [formData, setFormData] = useState({
		title: '',
		rating: 5,
		price: '',
		description: '',
		colors: [],
		sizes: [],
		images: [],
	})

	const handleInputChange = (e) => {
		const { name, value, type, checked } = e.target
		setFormData((prevData) => ({
			...prevData,
			[name]: type === 'checkbox' ? checked : value,
		}))
	}

	const handleColorChange = (colors) => {
		setFormData((prevData) => ({
			...prevData,
			colors,
		}))
	}

	const handleSizeChange = (sizes) => {
		setFormData((prevData) => ({
			...prevData,
			sizes,
		}))
	}

	const handleImageChange = (imageURL, index) => {
		setFormData((prevData) => {
			const updatedImages = [...prevData.images]
			updatedImages[index] = imageURL
			return { ...prevData, images: updatedImages }
		})
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		const formDataToSend = new FormData()

		Object.keys(formData).forEach((key) => {
			if (Array.isArray(formData[key])) {
				formData[key].forEach((value) => formDataToSend.append(key, value))
			} else {
				formDataToSend.append(key, formData[key])
			}
		})

		formData.images.forEach((imageFile, index) => {
			formDataToSend.append('images', imageFile)
		})

		await post('/products/add', formDataToSend, true)
	}

	const fields = [
		{ id: 'title', label: 'Title*', type: 'text', placeholder: 'Title' },
		{ id: 'rating', label: 'Rating', type: 'number', placeholder: 'Rating', step: '0.5', min: '2', max: '5' },
		{ id: 'price', label: 'Price', type: 'number', placeholder: 'Price', min: '0', step: '0.1' },
	]

	const colorOptions = [
		{ value: 'red', label: 'Red' },
		{ value: 'green', label: 'Green' },
		{ value: 'blue', label: 'Blue' },
		{ value: 'yellow', label: 'Yellow' },
		{ value: 'black', label: 'Black' },
		{ value: 'white', label: 'White' },
	]

	const sizeOptions = [
		{ value: 'xs', label: 'XS' },
		{ value: 's', label: 'S' },
		{ value: 'm', label: 'M' },
		{ value: 'l', label: 'L' },
		{ value: 'xl', label: 'XL' },
		{ value: 'xxl', label: 'XXL' },
	]

	return (
		<form onSubmit={handleSubmit} className={styles.form}>
			{fields.map((field) => (
				<InfoInput
					key={field.id}
					{...field}
					name={field.id}
					value={formData[field.id]}
					onChange={handleInputChange}
				/>
			))}
			<ImageInputWrapper onImageChange={handleImageChange} />
			<MultiplySelect
				options={colorOptions}
				placeholder="Select product colors"
				onChange={handleColorChange}
				multiple={true}
				colors={true}
			/>
			<MultiplySelect
				options={sizeOptions}
				placeholder="Select product sizes"
				onChange={handleSizeChange}
				multiple={true}
			/>
			<Textarea
				id="description"
				label="Product Description"
				value={formData.description}
				onChange={handleInputChange}
				placeholder="Enter product description"
				required
			/>
			<ButtonPurple
				title={'Add New Product'}
				style={{ gridColumn: 'span 2', width: 'max-content', justifySelf: 'center' }}
			/>
		</form>
	)
}

export default ProductForm
