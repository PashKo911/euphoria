import ImageInput from './ImageInput'

import styles from './imageInputWrapper.module.scss'

const ImageInputWrapper = ({ onImageChange, resetValues }) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.label}>Choose Images</div>
			<div className={styles.items}>
				{[...Array(4)].map((_, index) => (
					<ImageInput key={index} index={index} onChange={onImageChange} resetValues={resetValues} />
				))}
			</div>
		</div>
	)
}

export default ImageInputWrapper
