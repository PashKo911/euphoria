import { useState, useEffect } from 'react'

import { IoIosCloseCircle } from 'react-icons/io'

import styles from './imageInput.module.scss'

const ImageInput = ({ index, onChange, resetValues }) => {
	const [image, setImage] = useState(null)

	useEffect(() => {
		if (resetValues) {
			setImage(null)
		}
	}, [resetValues])

	const handleImageChange = (e) => {
		const file = e.target.files[0]
		if (file) {
			setImage(URL.createObjectURL(file))
			onChange(file, index)
		}
	}

	const handleRemoveImage = () => {
		setImage(null)
		onChange(null, index)
	}

	return (
		<div className={styles.inputWrapper}>
			<input
				type="file"
				accept="image/*"
				onChange={handleImageChange}
				className={styles.fileInput}
				id={`image-input-${index}`}
			/>
			<label htmlFor={`image-input-${index}`} className={styles.label}>
				{image ? (
					<div className={styles.previewWrapper}>
						<img src={image} alt={`Preview ${index + 1}`} className={styles.previewImage} />
						<button type="button" className={styles.removeButton} onClick={handleRemoveImage}>
							<IoIosCloseCircle size={25} />
						</button>
					</div>
				) : (
					<div className={styles.placeholder}>+</div>
				)}
			</label>
		</div>
	)
}

export default ImageInput
