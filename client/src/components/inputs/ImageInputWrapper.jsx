import { useState } from 'react'

import ImageInput from './ImageInput'

import styles from './imageInputWrapper.module.scss'

const ImageInputWrapper = ({ onImageChange }) => {
	const [images, setImages] = useState([null, null, null, null])

	const handleImageChange = (image, index) => {
		onImageChange(image, index)
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.label}>Choose Images</div>
			<div className={styles.items}>
				{images.map((image, index) => (
					<ImageInput key={index} index={index} onChange={handleImageChange} />
				))}
			</div>
		</div>
	)
}

export default ImageInputWrapper
