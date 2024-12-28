import { v4 as uuidv4 } from 'uuid'
import { useState, useEffect } from 'react'

import ImageInput from './ImageInput'

import styles from './imageInputWrapper.module.scss'

const ImageInputWrapper = ({ onImageChange, resetValues, initialImages }) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.label}>Choose Images</div>
			<div className={styles.items}>
				{[...Array(4)].map((_, index) => (
					<ImageInput
						key={uuidv4()}
						index={index}
						onChange={onImageChange}
						resetValues={resetValues}
						initialImage={initialImages ? initialImages[index] : null}
					/>
				))}
			</div>
		</div>
	)
}

export default ImageInputWrapper
