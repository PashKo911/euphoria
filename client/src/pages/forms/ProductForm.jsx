import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useHttp from '../../hooks/useHttp'
import { useErrorMessage } from '../../hooks/useErrorMessage'
import ErrorMessage from '../../components/ErrorMessage'

import InfoInput from '../../components/inputs/InfoInput'
import ButtonPurple from '../../components/buttons/ButtonPurple'
import MultiplySelect from '../../components/slelects/MultiplySelect'
import Textarea from '../../components/textareas/Textarea'
import ImageInputWrapper from '../../components/inputs/ImageInputWrapper'
import Select from '../../components/slelects/Select'

import { transformOptions, searchSelectedOptions } from '../../utils/transformDataForSelect'

import styles from './productForm.module.scss'

const ProductForm = () => {
	const { id } = useParams()
	const { post, get, put, processes } = useHttp()
	const { errorMessage, addError, clearError } = useErrorMessage()
	const [resetValues, setResetValues] = useState(false)
	const navigate = useNavigate()
	const [formData, setFormData] = useState({
		gender: '',
		title: '',
		rating: 5,
		price: '',
		description: '',
		colors: [],
		sizes: [],
		images: [],
		styles: '',
		pathsToDelete: [],
	})
	const [options, setOptions] = useState({
		colors: [],
		sizes: [],
		genders: [],
		styles: [],
	})

	const fetchOptions = async () => {
		try {
			const response = await get('/dashboard/products/options')
			const transformedOptions = {}

			Object.keys(response).forEach((key) => {
				if (key !== 'priceRange') {
					transformedOptions[key] = transformOptions(response[key])
				}
			})

			setOptions(transformedOptions)
		} catch (error) {
			console.error('Error fetching options:', error)
		}
	}

	const getProductById = async () => {
		const productData = await get(`/dashboard/products/detail/${id}`)
		setFormData({
			gender: productData.gender._id,
			title: productData.title,
			rating: productData.rating,
			price: productData.price,
			description: productData.description,
			colors: productData.colors.map((color) => color._id),
			sizes: productData.sizes.map((size) => size._id),
			count: productData.count,
			images: productData.paths,
			styles: productData.styles._id,
			pathsToDelete: [],
		})
	}

	useEffect(() => {
		fetchOptions()

		if (id) {
			getProductById()
		}
	}, [])

	const handleInputChange = (e) => {
		const { name, value, type } = e.target

		let processedValue
		if (type === 'number') {
			processedValue = value.includes('.') ? parseFloat(value) : parseInt(value, 10)
		} else {
			processedValue = value
		}

		setFormData((prevData) => ({
			...prevData,
			[name]: processedValue,
		}))
	}

	const handleSelectChange = (key, value) => {
		setFormData((prevData) => ({
			...prevData,
			[key]: value,
		}))
	}
	const handleImageChange = (imageFile, index) => {
		setFormData((prevData) => {
			const updatedImages = [...prevData.images]
			const pathsToDelete = [...prevData.pathsToDelete]
			const oldImagePath = updatedImages[index]

			if (oldImagePath) {
				pathsToDelete.push(oldImagePath)
			}

			updatedImages[index] = imageFile
			return { ...prevData, images: updatedImages, pathsToDelete }
		})
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		clearError()

		try {
			const formDataToSend = new FormData()

			Object.keys(formData).forEach((key) => {
				const value = formData[key]

				if (!Array.isArray(value)) {
					formDataToSend.append(key, value)
				} else if (key === 'images') {
					value.forEach((imageFile) => {
						formDataToSend.append('images', imageFile)
					})
				} else {
					formDataToSend.append(key, JSON.stringify(value))
				}
			})
			if (id) {
				await put(`/dashboard/products/edit/${id}`, formDataToSend, true)
				navigate('/home/dashboard/products')
			} else {
				await post('/dashboard/products/add', formDataToSend, true)
			}
			setFormData({
				gender: '',
				title: '',
				rating: 5,
				price: '',
				description: '',
				colors: [],
				sizes: [],
				images: [],
				styles: '',
				count: '',
				pathsToDelete: [],
			})
			setResetValues(true)
			setTimeout(() => setResetValues(false), 0)
		} catch (error) {
			addError(error)
		}
	}

	const fields = [
		{ id: 'title', label: 'Title*', type: 'text', placeholder: 'Title', required: true },
		{
			id: 'rating',
			label: 'Rating',
			type: 'number',
			placeholder: 'Rating',
			required: true,
			step: '0.1',
			min: '2',
			max: '5',
		},
		{
			id: 'price',
			label: 'Price',
			type: 'number',
			placeholder: 'Price',
			required: true,
			min: '0',
			step: '0.1',
		},
		{
			id: 'count',
			label: 'Count',
			type: 'number',
			placeholder: 'Count',
			required: true,
			min: '1',
		},
	]

	return (
		<>
			<form onSubmit={handleSubmit} className={styles.form}>
				<ErrorMessage errors={errorMessage} />
				<div className={styles.infoInputs}>
					{fields.map((field) => (
						<InfoInput
							key={field.id}
							{...field}
							name={field.id}
							value={formData[field.id]}
							onChange={handleInputChange}
						/>
					))}
				</div>
				<ImageInputWrapper
					onImageChange={(imageFile, index) => handleImageChange(imageFile, index)}
					resetValues={resetValues}
					initialImages={formData.images}
				/>
				<div className={styles.selects}>
					<MultiplySelect
						options={options.colors}
						placeholder="Select product colors"
						onChange={(value) => handleSelectChange('colors', value)}
						colors={true}
						isLoading={processes['/dashboard/products/options']}
						resetValues={resetValues}
						value={searchSelectedOptions(formData.colors, options.colors)}
					/>
					<MultiplySelect
						options={options.sizes}
						placeholder="Select product sizes"
						onChange={(value) => handleSelectChange('sizes', value)}
						isLoading={processes['/dashboard/products/options']}
						resetValues={resetValues}
						value={searchSelectedOptions(formData.sizes, options.sizes)}
					/>
					<Select
						options={options.genders}
						placeholder="Select product gender"
						onChange={(value) => handleSelectChange('gender', value.value)}
						isLoading={processes['/dashboard/products/options']}
						resetValues={resetValues}
						value={options.genders.find((el) => el.value === formData.gender)}
					/>
					<Select
						options={options.styles}
						placeholder="Select product style"
						onChange={(value) => handleSelectChange('styles', value.value)}
						isLoading={processes['/dashboard/products/options']}
						resetValues={resetValues}
						value={options.styles.find((el) => el.value === formData.styles)}
					/>
				</div>
				<Textarea
					id="description"
					label="Product Description"
					value={formData.description}
					onChange={handleInputChange}
					placeholder="Enter product description"
					required
				/>
				<ButtonPurple
					title={id ? 'Update Product' : 'Add New Product'}
					style={{
						gridColumn: 'span 2',
						width: 'max-content',
						alignSelf: 'center',
						minWidth: '175px',
						minHeight: '42px',
					}}
					isLoading={processes['/dashboard/products/add']}
				/>
			</form>
		</>
	)
}

export default ProductForm
