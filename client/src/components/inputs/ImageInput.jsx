import { useState, useEffect } from 'react'

import { IoIosCloseCircle } from 'react-icons/io'
import constants from '../../utils/constants'

import styles from './imageInput.module.scss'

const ImageInput = ({ index, onChange, resetValues, initialImage }) => {
	useEffect(() => {
		if (resetValues) {
			onChange(initialImage || null, index)
		}
	}, [resetValues, initialImage, index, onChange])

	const handleImageChange = (e) => {
		const file = e.target.files[0]
		onChange(file || null, index)
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
				{initialImage ? (
					<div className={styles.previewWrapper}>
						<img
							src={
								typeof initialImage === 'string'
									? `${constants.API_BASE}${initialImage}`
									: URL.createObjectURL(initialImage)
							}
							alt={`Preview ${index + 1}`}
							className={styles.previewImage}
						/>
						<button type="button" className={styles.removeButton} onClick={() => onChange(null, index)}>
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
